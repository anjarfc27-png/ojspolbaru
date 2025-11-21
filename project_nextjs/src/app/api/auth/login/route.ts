import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// Create a Supabase client with service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Get user from user_accounts table (primary for login)
async function getUserFromAccounts(email: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_accounts')
      .select('id, username, email, password, first_name, last_name')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Error fetching user from user_accounts:', error)
      return null
    }

    console.log('User data from user_accounts:', data)

    return data ? {
      user_id: data.id,
      username: data.username,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password
    } : null
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error('Exception in getUserFromAccounts:', message);
    return null
  }
}

// Get roles from user_account_roles table
async function getRolesFromAccountRoles(userId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_account_roles')
      .select('role_name')
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching roles from user_account_roles:', error)
      return []
    }

    console.log('Roles from user_account_roles:', data)

    // Map to our expected format
    return data.map(role => ({
      user_group_id: role.role_name,
      user_group_name: role.role_name,
      context_id: null,
      journal_name: 'Site',
      role_path: getRolePath(role.role_name)
    }))
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error('Exception in getRolesFromAccountRoles:', message);
    return []
  }
}

function getRolePath(userGroupName: string): string {
  const rolePaths: Record<string, string> = {
    'Site admin': 'admin',
    'Manager': 'manager',
    'Editor': 'editor',
    'Section editor': 'editor', // Map Section editor ke editor path untuk OJS compatibility
    'Copyeditor': 'copyeditor',
    'Proofreader': 'proofreader',
    'Layout Editor': 'layout-editor',
    'Author': 'author',
    'Reviewer': 'reviewer',
    'Reader': 'reader',
    'Subscription manager': 'subscription-manager'
  }
  return rolePaths[userGroupName] || 'reader'
}

export async function POST(request: NextRequest, { params }: { params: Promise<{}> }) {
  try {
    let email, password
    
    try {
      const body = await request.json()
      email = body.email
      password = body.password
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError)
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    console.log('Login attempt for email:', email)

    // Get user from user_accounts table (primary source)
    const userData = await getUserFromAccounts(email)

    console.log('User data retrieved:', userData)

    if (!userData) {
      console.error('User not found for email:', email)
      return NextResponse.json(
        { error: 'Invalid credentials - user not found' },
        { status: 401 }
      )
    }

    // Secure password check with bcrypt
    // Handle both hashed and plain text passwords for backward compatibility
    let isPasswordValid = false
    
    // Check if password is hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
    if (userData.password.startsWith('$2a$') || userData.password.startsWith('$2b$') || userData.password.startsWith('$2y$')) {
      // Password is hashed, use bcrypt.compare
      isPasswordValid = await bcrypt.compare(password, userData.password)
    } else {
      // Password is plain text, do direct comparison
      // This is for backward compatibility with existing data
      isPasswordValid = password === userData.password
      
      // If password is valid and still plain text, hash it for future use
      if (isPasswordValid) {
        try {
          const hashedPassword = await bcrypt.hash(password, 10)
          await supabaseAdmin
            .from('user_accounts')
            .update({ password: hashedPassword })
            .eq('id', userData.user_id)
          console.log('Password hashed and updated for user:', userData.email)
        } catch (hashError) {
          console.error('Error hashing password:', hashError)
          // Continue even if hashing fails
        }
      }
    }
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create Supabase session
    try {
      const supabase = await createSupabaseServerClient()
      
      // Try to sign in with Supabase Auth first
      let authData = null
      let authError = null
      
      try {
        const signInResult = await supabase.auth.signInWithPassword({
          email: userData.email,
          password: password
        })
        authData = signInResult.data
        authError = signInResult.error
      } catch (signInErr) {
        console.log('Sign in attempt failed, will try to create user:', signInErr)
      }

      // If Supabase auth fails, user might not exist in Supabase Auth yet
      // Create user in Supabase Auth using admin client
      if (authError || !authData) {
        console.log('User not found in Supabase Auth, creating user...')
        
        try {
          // Create user in Supabase Auth using admin client
          const { data: newAuthUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email: userData.email,
            password: password,
            email_confirm: true, // Auto-confirm email
            user_metadata: {
              username: userData.username,
              first_name: userData.first_name,
              last_name: userData.last_name,
              user_id: userData.user_id
            }
          })

          if (createError) {
            console.error('Error creating user in Supabase Auth:', createError)
            // If user already exists, try to sign in again
            if (createError.message?.includes('already registered')) {
              // User exists but password might be different, try sign in again
              const retryResult = await supabase.auth.signInWithPassword({
                email: userData.email,
                password: password
              })
              authData = retryResult.data
              authError = retryResult.error
            } else {
              // For other errors, we'll continue with custom session
              console.log('Will use custom session instead')
            }
          } else if (newAuthUser?.user) {
            // User created successfully, now sign in
            const signInResult = await supabase.auth.signInWithPassword({
              email: userData.email,
              password: password
            })
            authData = signInResult.data
            authError = signInResult.error
          }
        } catch (createErr) {
          console.error('Error in user creation process:', createErr)
          // Continue with custom session if Supabase Auth fails
        }
      }

      // Get user roles from user_account_roles table
      const roles = await getRolesFromAccountRoles(userData.user_id)
      const uniqueRoles = Array.from(
        new Map(
          roles.map(r => [
            `${r.user_group_id}|${r.journal_name || ''}|${r.context_id || ''}`,
            r
          ])
        ).values()
      )

      const user = {
        id: userData.user_id,
        username: userData.username,
        email: userData.email,
        full_name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || undefined,
        roles: uniqueRoles
      }

      // If we have a Supabase session, use it
      if (authData?.session) {
        const response = NextResponse.json({ user })
        // The Supabase session is automatically set in cookies by signInWithPassword
        return response
      }

      // Fallback: return user data even if Supabase session creation failed
      // The client can still use the user data for authentication
      // This allows login to work even if Supabase Auth is not fully configured
      console.log('Returning user data without Supabase session (fallback mode)')
      const response = NextResponse.json({ user })
      
      // Set a custom session cookie as fallback
      response.cookies.set('custom-session', JSON.stringify({ userId: userData.user_id, email: userData.email }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      
      return response

    } catch (error) {
      console.error('Error creating Supabase session:', error)
      
      // Even if session creation fails, return user data if password was valid
      // This allows the app to work with custom authentication
      const roles = await getRolesFromAccountRoles(userData.user_id)
      const uniqueRoles = Array.from(
        new Map(
          roles.map(r => [
            `${r.user_group_id}|${r.journal_name || ''}|${r.context_id || ''}`,
            r
          ])
        ).values()
      )

      const user = {
        id: userData.user_id,
        username: userData.username,
        email: userData.email,
        full_name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || undefined,
        roles: uniqueRoles
      }

      const response = NextResponse.json({ user })
      
      // Set a custom session cookie as fallback
      response.cookies.set('custom-session', JSON.stringify({ userId: userData.user_id, email: userData.email }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      
      return response
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        ok: false,
        error: message
      },
      { status: 500 }
    );
  }
}

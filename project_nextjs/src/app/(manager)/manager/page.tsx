'use client'

import { withAuth } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

function ManagerHomePage() {
  redirect('/editor')
}

export default withAuth(ManagerHomePage, ['manager'])
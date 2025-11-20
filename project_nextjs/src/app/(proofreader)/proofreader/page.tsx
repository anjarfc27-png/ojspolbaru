'use client'

import { withAuth } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

function ProofreaderHomePage() {
  redirect('/editor/submissions?filter=production')
}

export default withAuth(ProofreaderHomePage, ['proofreader'])
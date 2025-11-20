'use client'

import { withAuth } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

function CopyeditorHomePage() {
  redirect('/editor/submissions?filter=copyediting')
}

export default withAuth(CopyeditorHomePage, ['copyeditor'])
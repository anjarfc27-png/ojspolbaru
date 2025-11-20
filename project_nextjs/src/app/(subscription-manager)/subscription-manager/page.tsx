'use client'

import { withAuth } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

function SubscriptionManagerHomePage() {
  redirect('/dashboard')
}

export default withAuth(SubscriptionManagerHomePage, ['subscription-manager'])
import type { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import {
  TERMS_LAST_UPDATED,
  termsIntro,
  termsSections,
} from '@/lib/legal/terms-and-conditions'
import { LEGAL_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Terms and Conditions for ${LEGAL_NAME} (BitBLabs). Rules for using our website and services.`,
}

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated={TERMS_LAST_UPDATED}
      intro={termsIntro}
      sections={termsSections}
      relatedPage="terms"
    />
  )
}

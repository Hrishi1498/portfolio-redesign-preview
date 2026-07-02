import type { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import {
  PRIVACY_LAST_UPDATED,
  privacyIntro,
  privacySections,
} from '@/lib/legal/privacy-policy'
import { LEGAL_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${LEGAL_NAME} (BitBLabs). Learn how we collect, use, and protect your information.`,
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated={PRIVACY_LAST_UPDATED}
      intro={privacyIntro}
      sections={privacySections}
      relatedPage="privacy"
    />
  )
}

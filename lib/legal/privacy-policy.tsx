import Link from 'next/link'
import {
  BOOKING_URL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  LEGAL_ADDRESS_LINES,
  LEGAL_NAME,
  TERMS_PATH,
} from '@/lib/site'
import type { LegalSection } from '@/lib/legal/types'

export const PRIVACY_LAST_UPDATED = 'July 2, 2026'

export const privacyIntro = (
  <>
    {LEGAL_NAME} (&ldquo;BitBLabs&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
    operates the BitBLabs website and related online presence. This Privacy Policy describes how we
    collect, use, store, and protect personal information when you visit our website, contact us,
    or book a consultation. By using our website, you agree to the practices described in this
    policy. Please also review our{' '}
    <Link href={TERMS_PATH} className="text-zinc-300 transition-opacity hover:opacity-60">
      Terms &amp; Conditions
    </Link>
    .
  </>
)

export const privacySections: LegalSection[] = [
  {
    title: '1. Information we collect',
    body: (
      <>
        <p>We may collect the following categories of information:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-zinc-300">Information you provide:</strong> name,
            email address, phone number, company name, project details, and any other information
            you submit when booking a consultation through TidyCal or contacting us.
          </li>
          <li>
            <strong className="font-medium text-zinc-300">Technical information:</strong> browser
            type, device type, operating system, IP address, referring URLs, pages viewed, and
            approximate location derived from IP address.
          </li>
          <li>
            <strong className="font-medium text-zinc-300">Communications:</strong> records of
            correspondence if you reach out to us by phone, email, or through third-party booking
            tools.
          </li>
        </ul>
        <p>
          We do not intentionally collect sensitive personal data such as financial account
          credentials, government ID numbers, or health information through this website.
        </p>
      </>
    ),
  },
  {
    title: '2. How we use your information',
    body: (
      <>
        <p>We use personal information for legitimate business purposes, including to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to inquiries and schedule project discussions</li>
          <li>Provide, operate, and improve our website and services</li>
          <li>Communicate with prospective and existing clients</li>
          <li>Maintain security, prevent fraud, and troubleshoot technical issues</li>
          <li>Comply with applicable laws, regulations, and legal requests</li>
        </ul>
        <p>
          We do not sell your personal information. We do not use your information for automated
          decision-making that produces legal or similarly significant effects.
        </p>
      </>
    ),
  },
  {
    title: '3. Legal basis for processing',
    body: (
      <p>
        Where applicable, we process personal information based on your consent, our legitimate
        interests in operating and promoting our business, performance of a contract or steps prior
        to entering a contract, and compliance with legal obligations under applicable Indian law,
        including the Information Technology Act, 2000 and rules made thereunder, and the Digital
        Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;), as applicable.
      </p>
    ),
  },
  {
    title: '4. Cookies and similar technologies',
    body: (
      <>
        <p>
          Our website may use essential cookies and similar technologies required for basic site
          functionality, security, and performance. We do not currently use third-party advertising
          or behavioral tracking cookies on this website.
        </p>
        <p>
          You can control cookies through your browser settings. Disabling certain cookies may
          affect how parts of the website function.
        </p>
      </>
    ),
  },
  {
    title: '5. Third-party services',
    body: (
      <>
        <p>
          We use trusted third-party services to operate our website and business. These providers
          may process personal information on our behalf, including:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-zinc-300">TidyCal</strong> — appointment scheduling
            when you book a project discussion (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 transition-opacity hover:opacity-60"
            >
              tidycal.com/bitblabs
            </a>
            )
          </li>
          <li>
            <strong className="font-medium text-zinc-300">Hosting and infrastructure providers</strong>{' '}
            — to deliver and secure the website
          </li>
        </ul>
        <p>
          Third-party services are governed by their own privacy policies. We encourage you to
          review those policies when you interact with external platforms linked from our site.
        </p>
      </>
    ),
  },
  {
    title: '6. Data retention',
    body: (
      <p>
        We retain personal information only for as long as necessary to fulfill the purposes described
        in this policy, including to meet legal, accounting, or reporting requirements. When
        information is no longer required, we delete or anonymize it in accordance with our internal
        retention practices.
      </p>
    ),
  },
  {
    title: '7. Data security',
    body: (
      <p>
        We implement reasonable administrative, technical, and organizational safeguards designed to
        protect personal information against unauthorized access, alteration, disclosure, or
        destruction. However, no method of transmission over the internet or electronic storage is
        completely secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    title: '8. Your rights',
    body: (
      <>
        <p>
          Subject to applicable law, including the DPDP Act where it applies, you may have the right
          to:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Request erasure of your personal information, subject to legal exceptions</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Lodge a complaint with the relevant data protection authority in India</li>
        </ul>
        <p>
          To exercise these rights, contact us using the details in the Contact section below. We
          may need to verify your identity before responding to your request.
        </p>
      </>
    ),
  },
  {
    title: '9. Children’s privacy',
    body: (
      <p>
        Our website is not directed to individuals under 18 years of age. We do not knowingly
        collect personal information from children. If you believe we have collected information
        from a child, please contact us so we can take appropriate action.
      </p>
    ),
  },
  {
    title: '10. International visitors',
    body: (
      <p>
        If you access our website from outside India, your information may be transferred to,
        stored in, or processed in India or other jurisdictions where our service providers
        operate. By using the website, you consent to such transfers subject to applicable law.
      </p>
    ),
  },
  {
    title: '11. Changes to this policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at
        the top of this page indicates when the policy was last revised. Material changes will be
        posted on this page. Your continued use of the website after changes become effective
        constitutes acceptance of the updated policy.
      </p>
    ),
  },
  {
    title: '12. Contact us',
    body: (
      <>
        <p>
          For privacy-related questions, requests, or complaints, contact {LEGAL_NAME}:
        </p>
        <address className="not-italic space-y-1 text-zinc-400">
          <p>{LEGAL_NAME}</p>
          {LEGAL_ADDRESS_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            Phone:{' '}
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="text-zinc-300 transition-opacity hover:opacity-60"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </p>
        </address>
      </>
    ),
  },
]

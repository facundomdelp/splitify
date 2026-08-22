import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'

import { Locale } from '@/types/common-types'

const baseUrl = 'https://splitify.me'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'FaqPage' })

  const canonicalUrl = locale === routing.defaultLocale ? `${baseUrl}/faq` : `${baseUrl}/${locale}/faq`

  const languages: Record<string, string> = {}
  routing.locales.forEach((loc) => {
    languages[loc] = loc === routing.defaultLocale ? `${baseUrl}/faq` : `${baseUrl}/${loc}/faq`
  })
  languages['x-default'] = `${baseUrl}/faq`

  return {
    title: t('Frequently Asked Questions'),
    description: t('Splitify is a simple tool to divide expenses and bills equally among friends and group members'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: `${t('Frequently Asked Questions')} | Splitify`,
      description: t('Splitify is a simple tool to divide expenses and bills equally among friends and group members'),
      url: canonicalUrl,
      siteName: 'Splitify',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/Splitify-banner.jpg`,
          width: 1200,
          height: 630,
          alt: 'Splitify - Simplify your group expenses',
        },
      ],
    },
  }
}

export default async function FaqLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'FaqPage' })

  const faqs = [
    {
      question: t('What is Splitify?'),
      answer: t('Splitify is a simple tool to divide expenses and bills equally among friends and group members'),
    },
    {
      question: t('How does it work?'),
      answer: t(
        'You input the participants and their payments, and Splitify will calculate and suggest the best way to split the expenses',
      ),
    },
    {
      question: t('Do I need to create an account?'),
      answer: t('No, Splitify works without the need to create an account or sign in'),
    },
    {
      question: t('Is it free to use?'),
      answer: t('Yes, Splitify is completely free to use'),
    },
    {
      question: t('Does Splitify optimize the number of necessary transfers?'),
      answer: t(
        'Yes, Splitify uses an algorithm to minimize the number of transfers needed, making the payment process faster and more efficient',
      ),
    },
    {
      question: t('Can I create a collaborative group with my friends?'),
      answer: t('Yes, you can easily create a group, add your friends, and start splitting expenses together'),
    },
    {
      question: t('Can I add details to each expense?'),
      answer: t(
        'Yes, you can add more details such as the expense date, description, and even categorize the expense for better tracking',
      ),
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  )
}

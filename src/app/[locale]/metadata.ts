import { Locale } from '@/types/Common'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: 'Splitify',
    description: t('🤑 Simplify your group expenses with Splitify'),
    keywords: t('keywords'),
  }
}

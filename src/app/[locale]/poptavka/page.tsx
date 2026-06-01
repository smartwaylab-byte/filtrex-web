import { useTranslations } from 'next-intl'
import InquiryForm from '@/components/forms/InquiryForm'

export default function PoptavkaPage() {
  const t = useTranslations('inquiry')
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-600 mb-10">{t('subtitle')}</p>
      <div className="bg-gray-50 rounded-2xl p-8">
        <InquiryForm />
      </div>
    </div>
  )
}

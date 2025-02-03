import { useTranslations } from 'next-intl'

const FaqPage = () => {
  const t = useTranslations('FaqPage')

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

  return (
    <div className='w-full bg-green-50'>
      <section className='mx-auto w-full max-w-[600px] px-4 py-8'>
        <h1 className='mb-6 text-center text-3xl font-bold text-green-700'>{t('Frequently Asked Questions')}</h1>

        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='rounded-lg bg-white p-4 shadow-md'>
              <h2 className='my-1 text-xl font-semibold text-green-600'>{faq.question}</h2>
              <p className='text-sm text-gray-700'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FaqPage

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useTranslations } from '@/lib/LanguageContext';

export default function PricingPage() {
  const t = useTranslations('pricing');

  const pricingPlans = [
    {
      name: t('basic.name'),
      badge: t('basic.badge'),
      price: t('basic.price'),
      currency: t('basic.currency'),
      period: t('basic.period'),
      features: [
        t('basic.features.0'),
        t('basic.features.1'),
        t('basic.features.2'),
        t('basic.features.3'),
        t('basic.features.4'),
        t('basic.features.5'),
        t('basic.features.6'),
        t('basic.features.7'),
        t('basic.features.8'),
        t('basic.features.9'),
        t('basic.features.10'),
        t('basic.features.11'),
        t('basic.features.12'),
        t('basic.features.13'),
      ],
      popular: false,
    },
    {
      name: t('pro.name'),
      badge: t('pro.badge'),
      price: t('pro.price'),
      currency: t('pro.currency'),
      period: t('pro.period'),
      features: [
        t('pro.features.0'),
        t('pro.features.1'),
        t('pro.features.2'),
        t('pro.features.3'),
        t('pro.features.4'),
        t('pro.features.5'),
        t('pro.features.6'),
        t('pro.features.7'),
        t('pro.features.8'),
        t('pro.features.9'),
        t('pro.features.10'),
        t('pro.features.11'),
        t('pro.features.12'),
        t('pro.features.13'),
        t('pro.features.14'),
        t('pro.features.15'),
      ],
      popular: true,
    },
    {
      name: t('premium.name'),
      badge: t('premium.badge'),
      price: t('premium.price'),
      currency: t('premium.currency'),
      period: t('premium.period'),
      features: [
        t('premium.features.0'),
        t('premium.features.1'),
        t('premium.features.2'),
        t('premium.features.3'),
        t('premium.features.4'),
        t('premium.features.5'),
        t('premium.features.6'),
        t('premium.features.7'),
        t('premium.features.8'),
        t('premium.features.9'),
        t('premium.features.10'),
        t('premium.features.11'),
        t('premium.features.12'),
        t('premium.features.13'),
        t('premium.features.14'),
        t('premium.features.15'),
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      q: t('faq.changePlan.question'),
      a: t('faq.changePlan.answer'),
    },
    {
      q: t('faq.paymentMethods.question'),
      a: t('faq.paymentMethods.answer'),
    },
    {
      q: t('faq.freeTrial.question'),
      a: t('faq.freeTrial.answer'),
    },
    {
      q: t('faq.cancel.question'),
      a: t('faq.cancel.answer'),
    },
  ];

  return (
    <div className="relative min-h-screen pt-20">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-20 -z-10"></div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-block px-4 py-2 rounded-full glass mb-6">
              <span className="text-cyber-blue font-semibold">{t('title')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              {t('subtitle')}
            </p>
            <p className="text-cyber-blue text-base font-semibold">
              {t('intro')}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {t('paymentNote')}
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.badge}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative glass p-8 rounded-2xl ${
                  plan.popular
                    ? 'ring-2 ring-cyber-pink bg-white/5'
                    : 'hover:bg-white/5'
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyber-blue to-cyber-pink px-4 py-1 rounded-full text-sm font-semibold">
                      {t('popularPlan')}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="inline-block bg-cyber-blue/20 text-cyber-blue px-3 py-1 rounded-full text-sm mb-4">
                    {plan.badge}
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-gradient">
                      {plan.price}
                    </span>
                    <span className="text-2xl text-gray-400">
                      {plan.currency}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    / {plan.period}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        size={20}
                        className="text-cyber-blue flex-shrink-0 mt-0.5"
                      />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyber-blue to-cyber-pink'
                        : 'glass hover:bg-white/10'
                    }`}
                  >
                    {t('choosePlan')} {t('customize')}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 bg-black/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('faqTitle')} <span className="text-gradient">{t('faqTitleHighlight')}</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-dark p-12 rounded-2xl cyber-border"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('ctaTitle')} <span className="text-gradient">{t('ctaTitleHighlight')}</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {t('ctaDescription')}
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold text-lg"
              >
                {t('ctaButton')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

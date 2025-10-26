'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Cpu, Sparkles, Check } from 'lucide-react';
import HeroScene from '@/components/3d/HeroScene';
import { TypeAnimation } from 'react-type-animation';
import { MacbookScroll } from '@/components/ui/MacbookScroll';
import { useTranslations } from '@/lib/LanguageContext';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience unparalleled performance with our cutting-edge technology stack.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security ensuring your data is always protected.',
  },
  {
    icon: Cpu,
    title: 'AI-Powered',
    description: 'Leverage artificial intelligence to automate and optimize your workflows.',
  },
  {
    icon: Sparkles,
    title: 'Innovative Solutions',
    description: 'Stay ahead with our constantly evolving suite of innovative tools.',
  },
];

export default function HomePage() {
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

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <HeroScene />

        {/* Grid Background */}
        <div className="absolute inset-0 grid-background opacity-20 -z-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 backdrop-blur-md bg-black/30 p-8 md:p-12 rounded-3xl border border-white/10"
          >
            {/* Typing Animation */}
            <div className="text-cyber-blue text-sm md:text-base font-semibold mb-4">
              <TypeAnimation
                sequence={[
                  'WELCOME TO THE FUTURE',
                  2000,
                  'INNOVATION STARTS HERE',
                  2000,
                  'BUILD SOMETHING AMAZING',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              <span className="text-gradient">Cubiclabs</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto">
              Building tomorrow&apos;s technology,{' '}
              <span className="text-cyber-pink font-semibold">today</span>
            </p>

            {/* Description */}
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We craft cutting-edge digital experiences that push the boundaries
              of what&apos;s possible. Join us on a journey into the future of
              technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold text-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyber-pink to-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="button-bg"
                  />
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-cyber-blue flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-cyber-blue rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MacBook Scroll Section */}
      <section className="relative overflow-hidden bg-black">
        <MacbookScroll
          title={
            <span>
              Experience our platform <br />
              in <span className="text-gradient">stunning detail</span>
            </span>
          }
          src="/images/website.png"
          showGradient={false}
        />
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">Cubiclabs</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We combine innovation with reliability to deliver exceptional
              results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative glass p-6 rounded-xl hover:bg-white/10 transition-all"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-pink flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/0 to-cyber-pink/0 group-hover:from-cyber-blue/10 group-hover:to-cyber-pink/10 rounded-xl transition-all -z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Clients Section */}
      <section className="relative py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Partnering with innovative companies to deliver excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.a
              href="https://www.armadadelivery.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-12 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all group aspect-square relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/95 group-hover:bg-white transition-colors"></div>
              <img
                src="/images/armada.svg"
                alt="Armada Delivery"
                className="w-full h-auto max-h-20 object-contain relative z-10"
              />
            </motion.a>

            <motion.a
              href="https://upayments.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-12 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all group aspect-square relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/95 group-hover:bg-white transition-colors"></div>
              <img
                src="/images/upayments.svg"
                alt="Upayments"
                className="w-full h-auto max-h-20 object-contain relative z-10"
              />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-12 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all aspect-square relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/95 hover:bg-white transition-colors"></div>
              <img
                src="/images/miro.png"
                alt="Miro"
                className="w-full h-auto max-h-20 object-contain relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-2">
              {t('subtitle')}
            </p>
            <p className="text-cyber-blue text-base font-semibold">
              {t('intro')}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {t('paymentNote')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.badge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
              Ready to <span className="text-gradient">Transform</span> Your
              Business?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let&apos;s build something extraordinary together.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold text-lg"
              >
                Start Your Project
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

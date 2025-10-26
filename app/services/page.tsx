'use client';

import { motion } from 'framer-motion';
import { Code, ShoppingCart, Zap, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/lib/LanguageContext';

export default function ServicesPage() {
  const t = useTranslations('services');
  
  const services = [
    {
      icon: Code,
      title: t('items.websites.title'),
      description: t('items.websites.description'),
    },
    {
      icon: ShoppingCart,
      title: t('items.ecommerce.title'),
      description: t('items.ecommerce.description'),
    },
    {
      icon: Zap,
      title: t('items.optimization.title'),
      description: t('items.optimization.description'),
    },
    {
      icon: Wrench,
      title: t('items.maintenance.title'),
      description: t('items.maintenance.description'),
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
              <span className="text-cyber-blue font-semibold">{t('badge')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {t('title')} <span className="text-gradient">{t('titleHighlight')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group glass p-8 rounded-2xl hover:bg-white/10 transition-all"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-blue to-cyber-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={32} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-black/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-dark p-12 rounded-2xl cyber-border"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('cta.title')} <span className="text-gradient">{t('cta.titleHighlight')}</span> {t('cta.subtitle')}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {t('cta.description')}
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold text-lg"
              >
                {t('cta.button')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

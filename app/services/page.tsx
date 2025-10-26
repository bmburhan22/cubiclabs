'use client';

import { motion } from 'framer-motion';
import { Code, ShoppingCart, Zap, Wrench } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Code,
    title: 'Custom Websites',
    description:
      'We build websites from the ground up, designed to match your brand identity and business goals. Our team ensures every element — from layouts to typography — reflects your unique vision. Whether you need a corporate website, a startup landing page, or a complex web application, we deliver scalable and future-proof solutions using modern frameworks and clean code.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description:
      'We create fully functional, secure, and easy-to-manage e-commerce platforms that help you grow your business online. Our solutions include product catalog integration, secure payment gateways, inventory management, and a smooth checkout experience. Whether it\'s Shopify or a custom-built platform, we ensure your store is built for conversions and customer satisfaction.',
  },
  {
    icon: Zap,
    title: 'Website Performance Optimization',
    description:
      'Accelerate your operations with our cutting-edge performance enhancement solutions. We analyze your website\'s speed, identify bottlenecks, and implement optimizations to improve load times, user experience, and search engine rankings. From code minification to caching strategies, we ensure your site runs at peak performance.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description:
      'Launching a website is just the beginning. We offer ongoing maintenance and support to keep your site secure, updated, and running smoothly. Our team handles software updates, security patches, performance monitoring, and technical support, so you can focus on growing your business while we take care of the technical details.',
  },
];

export default function ServicesPage() {
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
              <span className="text-cyber-blue font-semibold">Our Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              What We <span className="text-gradient">Offer</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Comprehensive web solutions tailored to your business needs
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
              Ready to Get <span className="text-gradient">Started</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let's discuss how we can help bring your vision to life
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold text-lg"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

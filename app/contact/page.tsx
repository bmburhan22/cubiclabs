'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import PhoneNumberInput from '@/components/ui/PhoneNumberInput';
import { useTranslations } from '@/lib/LanguageContext';
// Email sending via API route

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  countryCode: z.string(),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
}).refine((data) => {
  // If phone is provided, country code must be valid
  if (data.phone && !data.countryCode) {
    return false;
  }
  // If country code is provided, phone must also be provided
  if (data.countryCode && data.countryCode !== '' && !data.phone) {
    return false;
  }
  return true;
}, {
  message: "Please provide both country code and phone number",
  path: ["phone"],
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    content: 'Kuwait City, Qibla, Salhiya Street, Luhaib (3), Office No: 213',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+965 41147331',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@cubiclabs.net',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('contact');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      countryCode: '+965',
      phone: '',
    },
  });

  const countryCode = watch('countryCode');
  const phone = watch('phone');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Combine country code and phone if both are provided
      const { countryCode, phone, ...restData } = data;
      const phoneData = phone ? 
        { ...restData, phone: `${countryCode}${phone}` } : 
        restData;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(phoneData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        reset();
      } else {
        toast.error('Failed to send message. Please try again or contact us directly.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again or contact us directly.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen pt-20">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>

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
              <span className="text-gradient">{t('title')}</span>
            </h1>
            <p className="text-xl text-gray-300">
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('name')} <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder={t('namePlaceholder')}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('email')} <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder={t('emailPlaceholder')}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('phoneOptional')}
                  </label>
                  <PhoneNumberInput
                    countryCodeValue={countryCode}
                    phoneValue={phone}
                    onCountryCodeChange={(value) => setValue('countryCode', value)}
                    onPhoneChange={(value) => setValue('phone', value)}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t('subject')} <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder={t('subjectPlaceholder')}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('message')} <span className="text-cyber-pink">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors resize-none"
                    placeholder={t('messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      {t('send')}
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  Reach out to us through any of the following channels. We&apos;re
                  here to help!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="glass p-6 rounded-xl hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-pink flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <info.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-gray-400">{info.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="glass-dark p-6 rounded-xl cyber-border"
              >
                <h3 className="text-xl font-semibold mb-3">Business Hours</h3>
                <div className="space-y-2 text-gray-400">
                  <p>Saturday - Thursday: 9:00 AM - 6:00 PM</p>
                  <p>Friday: Closed</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or Additional CTA Section */}
      <section className="relative py-20 bg-black/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-dark p-12 rounded-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prefer to chat in real-time?
            </h2>
            <p className="text-gray-300 mb-6">
              Click the WhatsApp button in the bottom right corner to start a
              conversation with our team!
            </p>
            <div className="inline-flex items-center gap-2 text-cyber-blue">
              <div className="w-3 h-3 bg-cyber-blue rounded-full animate-pulse"></div>
              <span className="font-semibold">We&apos;re online and ready to help</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

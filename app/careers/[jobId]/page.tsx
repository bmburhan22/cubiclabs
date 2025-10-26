'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowLeft,
  Upload,
  Send,
  CheckCircle,
} from 'lucide-react';
import PhoneNumberInput from '@/components/ui/PhoneNumberInput';
import { useTranslations, useLanguage } from '@/lib/LanguageContext';
import jobsData from '@/data/jobs.json';
// Email sending via API route

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isActive: boolean;
  postedDate: string;
}

const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  countryCode: z.string().min(1, 'Please select a country code'),
  phone: z.string().min(4, 'Phone number must be at least 4 digits').regex(/^[0-9]+$/, 'Phone number must contain only digits'),
  message: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function JobApplicationPage({
  params,
}: {
  params: { jobId: string };
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('careers');
  const tCommon = useTranslations('common');
  
  // Get messages to access raw job data
  const { messages } = useLanguage();

  const jobs = jobsData as Job[];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      countryCode: '+965',
      phone: '',
    },
  });

  const countryCode = watch('countryCode');
  const phone = watch('phone');

  // Function to get translated job data
  const getTranslatedJobData = (jobId: string) => {
    try {
      // Access nested job data from messages object
      const jobsData = (messages as any).careers?.jobs;
      if (jobsData?.[jobId]) {
        return jobsData[jobId];
      }
    } catch (e) {
      // Translation key doesn't exist, fall back to original
    }
    return null;
  };

  // Function to get translated job title
  const getJobTitle = (title: string, jobId: string) => {
    const translatedData = getTranslatedJobData(jobId);
    if (translatedData && translatedData.title) {
      return translatedData.title;
    }
    return title;
  };

  useEffect(() => {
    // Simulate a small delay to show loading state
    const timer = setTimeout(() => {
      const foundJob = jobs.find((j) => j.id === params.jobId);
      setJob(foundJob || null);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [params.jobId, jobs]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      setCvFile(file);
      toast.success('CV uploaded successfully!');
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!job) return;

    if (!cvFile) {
      toast.error('Please upload your CV/Resume');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', `${data.countryCode}${data.phone}`);
      formData.append('message', data.message || '');
      formData.append('jobId', job.id);
      formData.append('jobTitle', job.title);
      formData.append('cv', cvFile);

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(
          'Application submitted successfully! We\'ll review your application and get back to you soon.'
        );
        reset();
        setCvFile(null);
      } else {
        toast.error(
          'Failed to submit application. Please try again or email us directly.'
        );
      }
    } catch (error) {
      toast.error(
        'Failed to submit application. Please try again or email us directly.'
      );
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">{t('loadingJobDetails')}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('jobNotFound')}</h1>
          <p className="text-gray-400 mb-8">
            {t('jobNotFoundDesc')}
          </p>
          <Link href="/careers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold"
            >
              {t('viewAllPositions')}
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-20">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/careers">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-cyber-blue hover:text-cyber-pink transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            {t('backToCareers')}
          </motion.button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-pink text-sm font-semibold">
                  {job.department}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <Clock size={14} />
                  {job.type}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <Briefcase size={14} />
                  {job.experience}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{getJobTitle(job.title, job.id)}</h1>
              <p className="text-gray-300 text-lg mb-6">
                {(() => {
                  const translatedData = getTranslatedJobData(job.id);
                  return translatedData?.description || job.description;
                })()}
              </p>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">{t('responsibilities')}</h2>
                  <ul className="space-y-2">
                    {(() => {
                      const translatedData = getTranslatedJobData(job.id);
                      const items = translatedData?.responsibilities || job.responsibilities;
                      return items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle
                            size={20}
                            className="text-cyber-blue mt-1 flex-shrink-0"
                          />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ));
                    })()}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">{t('requirements')}</h2>
                  <ul className="space-y-2">
                    {(() => {
                      const translatedData = getTranslatedJobData(job.id);
                      const items = translatedData?.requirements || job.requirements;
                      return items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle
                            size={20}
                            className="text-cyber-pink mt-1 flex-shrink-0"
                          />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ));
                    })()}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">{t('benefits')}</h2>
                  <ul className="space-y-2">
                    {(() => {
                      const translatedData = getTranslatedJobData(job.id);
                      const items = translatedData?.benefits || job.benefits;
                      return items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle
                            size={20}
                            className="text-purple-400 mt-1 flex-shrink-0"
                          />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ));
                    })()}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-6 rounded-2xl sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6">{t('applyNow')}</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Job Information - Auto-filled */}
                <div className="bg-gradient-to-r from-cyber-blue/10 to-cyber-pink/10 p-4 rounded-lg border border-cyber-blue/30 space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      {t('position')}
                    </label>
                    <p className="text-sm font-semibold text-white">{getJobTitle(job.title, job.id)}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      {t('jobId')}
                    </label>
                    <p className="text-sm font-mono text-cyber-blue">{job.id}</p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('fullName')} <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors text-sm"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors text-sm"
                    placeholder="john@example.com"
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div dir="ltr">
                  <label className="block text-sm font-medium mb-2">
                    {t('phone')} <span className="text-cyber-pink">*</span>
                  </label>
                  <PhoneNumberInput
                    countryCodeValue={countryCode}
                    phoneValue={phone}
                    onCountryCodeChange={(value) => setValue('countryCode', value)}
                    onPhoneChange={(value) => setValue('phone', value)}
                    placeholder="123456789"
                    className="text-sm"
                    required
                  />
                  {(errors.countryCode || errors.phone) && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.countryCode?.message || errors.phone?.message}
                    </p>
                  )}
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('cvResume')} <span className="text-cyber-pink">*</span>
                  </label>
                  <label
                    htmlFor="cv"
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg glass-dark border border-white/10 hover:border-cyber-blue cursor-pointer transition-colors"
                  >
                    <Upload size={18} className="mr-2" />
                    {cvFile ? cvFile.name : t('uploadCv')}
                  </label>
                  <input
                    type="file"
                    id="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('coverLetter')}
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors resize-none text-sm"
                    placeholder={t('coverLetterPlaceholder')}
                  />
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
                      {t('submitting')}
                    </>
                  ) : (
                    <>
                      {t('submitApplication')}
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

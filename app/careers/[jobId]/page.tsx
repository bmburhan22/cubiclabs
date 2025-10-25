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
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
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

  const jobs = jobsData as Job[];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  useEffect(() => {
    const foundJob = jobs.find((j) => j.id === params.jobId);
    setJob(foundJob || null);
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
      formData.append('phone', data.phone);
      formData.append('address', data.address || '');
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

  if (!job) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-gray-400 mb-8">
            The position you&apos;re looking for doesn&apos;t exist or has been filled.
          </p>
          <Link href="/careers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold"
            >
              View All Positions
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
            Back to Careers
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

              <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{job.description}</p>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-cyber-blue mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-cyber-pink mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Benefits</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-purple-400 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
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
              <h2 className="text-2xl font-bold mb-6">Apply for this Position</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Job Information - Auto-filled */}
                <div className="bg-gradient-to-r from-cyber-blue/10 to-cyber-pink/10 p-4 rounded-lg border border-cyber-blue/30 space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Position
                    </label>
                    <p className="text-sm font-semibold text-white">{job.title}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Job ID
                    </label>
                    <p className="text-sm font-mono text-cyber-blue">{job.id}</p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name <span className="text-cyber-pink">*</span>
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
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors text-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2">
                    Address <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    id="address"
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors text-sm"
                    placeholder="City, Country"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    CV/Resume <span className="text-cyber-pink">*</span>
                  </label>
                  <label
                    htmlFor="cv"
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg glass-dark border border-white/10 hover:border-cyber-blue cursor-pointer transition-colors"
                  >
                    <Upload size={18} className="mr-2" />
                    {cvFile ? cvFile.name : 'Upload PDF or Word (Max 5MB)'}
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
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors resize-none text-sm"
                    placeholder="Tell us why you're a great fit..."
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
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

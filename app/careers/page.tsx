'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Search,
  Upload,
  Send,
  X,
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
  isActive: boolean;
  postedDate: string;
}

const departments = ['All', 'Engineering', 'Design', 'Product'];

const generalApplicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  message: z.string().optional(),
});

type GeneralApplicationFormData = z.infer<typeof generalApplicationSchema>;

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showGeneralForm, setShowGeneralForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const jobs = jobsData as Job[];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralApplicationFormData>({
    resolver: zodResolver(generalApplicationSchema),
  });

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

  const onSubmit = async (data: GeneralApplicationFormData) => {
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
      formData.append('jobId', 'GENERAL');
      formData.append('jobTitle', 'General Application');
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
        setShowGeneralForm(false);
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

  const filteredJobs = jobs.filter((job) => {
    const matchesDepartment =
      selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return job.isActive && matchesDepartment && matchesSearch;
  });

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
              <span className="text-cyber-blue font-semibold">Careers</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Join Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-gray-300">
              Build the future with us. We&apos;re always looking for talented
              individuals who are passionate about technology and innovation.
            </p>
          </motion.div>

          {/* Why Join Us */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Users,
                title: 'Collaborative Culture',
                description:
                  'Work with talented individuals in a supportive environment',
              },
              {
                icon: Briefcase,
                title: 'Growth Opportunities',
                description: 'Develop your skills and advance your career with us',
              },
              {
                icon: Clock,
                title: 'Work-Life Balance',
                description: 'Flexible hours and remote work options available',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 rounded-xl text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyber-blue to-cyber-pink flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="relative py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Open <span className="text-gradient">Positions</span>
            </h2>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg glass-dark border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors"
                />
              </div>

              {/* Department Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedDepartment === dept
                        ? 'bg-gradient-to-r from-cyber-blue to-cyber-pink'
                        : 'glass hover:bg-white/10'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <p className="text-gray-400">
              {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''}{' '}
              available
            </p>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
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
                      </div>

                      <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient transition-all">
                        {job.title}
                      </h3>
                      <p className="text-gray-400 mb-3">{job.description}</p>
                      <p className="text-sm text-gray-500">
                        Experience: {job.experience}
                      </p>
                    </div>

                    <Link href={`/careers/${job.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap"
                      >
                        Apply Now
                        <ChevronRight size={18} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No positions found matching your criteria.
                </p>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filter.
                </p>
              </div>
            )}
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
              Don&apos;t See the Right Role?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              We&apos;re always looking for talented people. Send us your resume and
              we&apos;ll keep you in mind for future opportunities.
            </p>
            <motion.button
              onClick={() => setShowGeneralForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold text-lg"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* General Application Form Modal */}
      <AnimatePresence>
        {showGeneralForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGeneralForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto cyber-border"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">General Application</h2>
                  <p className="text-gray-400">
                    Don&apos;t see a specific role? Apply here and we&apos;ll consider you for future opportunities.
                  </p>
                </div>
                <button
                  onClick={() => setShowGeneralForm(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Auto-filled Job Info */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/30">
                  <p className="text-sm font-semibold text-purple-300">
                    Application Type: <span className="text-white">General / Future Opportunities</span>
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="gen-name" className="block text-sm font-medium mb-2">
                    Full Name <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="gen-name"
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="gen-email" className="block text-sm font-medium mb-2">
                    Email <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="gen-email"
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="gen-phone" className="block text-sm font-medium mb-2">
                    Phone <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="gen-phone"
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="gen-address" className="block text-sm font-medium mb-2">
                    Address <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    id="gen-address"
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors"
                    placeholder="City, Country"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    CV/Resume <span className="text-cyber-pink">*</span>
                  </label>
                  <label
                    htmlFor="gen-cv"
                    className="flex items-center justify-center w-full px-4 py-4 rounded-lg glass border border-white/10 hover:border-cyber-blue cursor-pointer transition-colors"
                  >
                    <Upload size={20} className="mr-2" />
                    {cvFile ? cvFile.name : 'Upload PDF or Word (Max 5MB)'}
                  </label>
                  <input
                    type="file"
                    id="gen-cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="gen-message" className="block text-sm font-medium mb-2">
                    Tell us about yourself (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    id="gen-message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors resize-none"
                    placeholder="What type of role are you interested in? What are your skills and experience?"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowGeneralForm(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 glass rounded-lg font-semibold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

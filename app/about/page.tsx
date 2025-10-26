'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, Rocket, Heart } from 'lucide-react';
import Image from 'next/image';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We are committed to delivering innovative solutions that transform businesses and empower people.',
  },
  {
    icon: Eye,
    title: 'Visionary',
    description: 'We see beyond the present, constantly innovating to shape the future of technology.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'We believe in the power of teamwork and building strong partnerships with our clients.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, never settling for anything less than the best.',
  },
];

const timeline = [
  {
    year: 'May 2025',
    title: 'The Beginning',
    description: 'Born from a vision to revolutionize digital experiences, Cubiclabs was founded by a passionate team of 6 innovators committed to delivering cutting-edge, scalable web solutions that push the boundaries of what\'s possible.'
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-2 rounded-full glass mb-6">
              <span className="text-cyber-blue font-semibold">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              We Are <span className="text-gradient">Cubiclabs</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              A team of passionate innovators dedicated to building the future of
              technology. We transform ideas into reality with cutting-edge
              solutions that make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-blue to-purple-600 flex items-center justify-center mb-6">
                <Rocket size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To empower businesses worldwide with innovative technology
                solutions that drive growth, efficiency, and success. We believe
                in making advanced technology accessible to everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-pink to-purple-600 flex items-center justify-center mb-6">
                <Heart size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                To be the global leader in technological innovation, creating
                solutions that shape the future and improve lives. We envision a
                world where technology seamlessly enhances human potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group glass p-6 rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-pink flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From a small startup to a global innovator
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-pink to-purple-600 hidden md:block"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass p-6 rounded-xl inline-block">
                      <div className="text-3xl font-bold text-gradient mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-pink hidden md:block"></div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: '3+', label: 'Trusted Partners' },
              { number: '5+', label: 'Dedicated Innovators' },
              { number: '3+', label: 'Solutions Delivered' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Partners</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Collaborating with industry leaders to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <motion.a
              href="https://www.armadadelivery.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-16 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all group aspect-square relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/95 group-hover:bg-white transition-colors"></div>
              <Image
                src="/images/armada.svg"
                alt="Armada Delivery"
                width={300}
                height={96}
                className="w-full h-auto max-h-24 object-contain relative z-10"
              />
            </motion.a>

            <motion.a
              href="https://upayments.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-16 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all group aspect-square relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/95 group-hover:bg-white transition-colors"></div>
              <Image
                src="/images/upayments.svg"
                alt="Upayments"
                width={300}
                height={96}
                className="w-full h-auto max-h-24 object-contain relative z-10"
              />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted <span className="text-gradient">Clients</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Proud to work with innovative companies worldwide
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-16 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all w-full max-w-md aspect-square relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/95 hover:bg-white transition-colors"></div>
              <Image
                src="/images/miro.png"
                alt="Miro"
                width={300}
                height={96}
                className="w-full h-auto max-h-24 object-contain relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

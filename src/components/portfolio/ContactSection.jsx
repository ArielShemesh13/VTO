import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import FingerprintAnimation from './FingerprintAnimation';

export default function ContactSection({ isDark }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showFingerprint, setShowFingerprint] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);

    try {
      await base44.entities.ContactMessage.create({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        status: 'new'
      });

      setShowFingerprint(true);
      setTimeout(() => {
        setShowFingerprint(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again or email directly to arielshemesh3333@gmail.com');
    } finally {
      setIsSending(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'arielshemesh1999@gmail.com', href: 'mailto:arielshemesh1999@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Israel' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/arielSHEMESH1999', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ariel-shemesh-7ba0322a5/', label: 'LinkedIn' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-purple-400' : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270] bg-clip-text text-transparent'}`}>
            Get In Touch
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Let's Connect
          </h2>
          <div className="flex items-center justify-center gap-6">
            <motion.a
              href="https://github.com/arielSHEMESH1999"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270] border border-[#244270]/20'
              }`}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/ariel-shemesh-7ba0322a5/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270] border border-[#244270]/20'
              }`}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="mailto:arielshemesh1999@gmail.com"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270] border border-[#244270]/20'
              }`}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-black/40 border border-white/10' : 'bg-white/60 border border-[#244270]/10'} backdrop-blur-xl`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                Send a Message
              </h3>

              {showFingerprint ? (
                <div className="py-12">
                  <FingerprintAnimation isDark={isDark} />
                </div>
              ) : submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12">
                  <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-[#141225]'}`}>Message sent successfully!</p>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 ${isDark ? 'bg-white/5 border border-purple-500/20 text-white placeholder-white/30 focus:border-purple-500/50 focus:bg-white/10' : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/30 focus:border-[#244270]/30 focus:bg-[#244270]/10'}`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 ${isDark ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cyan-500/50 focus:bg-white/10' : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/30 focus:border-[#244270]/30 focus:bg-[#244270]/10'}`}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl outline-none resize-none transition-all duration-300 ${isDark ? 'bg-white/5 border border-purple-500/20 text-white placeholder-white/30 focus:border-purple-500/50 focus:bg-white/10' : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/30 focus:border-[#244270]/30 focus:bg-[#244270]/10'}`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                      type="submit"
                      disabled={isSending}
                      className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${isDark ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 text-white hover:from-purple-400 hover:via-cyan-400 hover:to-blue-400' : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7] text-white hover:from-[#3da8b8] hover:via-[#4f46e5] hover:to-[#9333ea]'} shadow-lg ${isDark ? 'shadow-purple-500/30' : 'shadow-cyan-500/25'} transition-all duration-300 ${isSending ? 'opacity-90 cursor-not-allowed' : ''}`}
                      whileHover={!isSending ? { scale: 1.02 } : {}}
                      whileTap={!isSending ? { scale: 0.98 } : {}}
                      >
                      <motion.div
                        animate={isSending ? { rotate: 360 } : {}}
                        transition={{ duration: 1, repeat: isSending ? Infinity : 0, ease: "linear" }}
                      >
                        <Send size={18} />
                      </motion.div>
                      {isSending ? 'SENDING...' : 'Send Message'}
                      </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className={`text-center mt-20 pt-8 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}
        >
          <p className={`text-sm ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            © 2024 Ariel Shemesh. Built with React & Framer Motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
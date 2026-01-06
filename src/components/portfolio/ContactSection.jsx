import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ContactSection({ isDark }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send email notification
    await base44.integrations.Core.SendEmail({
      to: 'arielshemesh1999@gmail.com',
      subject: `New Contact Form Message from ${formData.name}`,
      body: `
You have received a new message through your portfolio contact form:

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

---
Sent from your portfolio website contact form
      `
    });
    
    // Save message to database
    await base44.entities.ContactMessage.create({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      status: 'new'
    });
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
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
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
            Get In Touch
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Let's Connect
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
            Looking for an entry-level data analyst? I'm actively seeking opportunities to bring fresh thinking, 
            motivation, and a strong work ethic to a data-driven environment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={`p-8 rounded-2xl h-full ${isDark ? 'bg-black/40 border border-white/10' : 'bg-white/60 border border-[#244270]/10'} backdrop-blur-xl`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                Contact Information
              </h3>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-[#244270]/10'}`}>
                      <item.icon className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className={`font-medium hover:underline ${isDark ? 'text-white hover:text-purple-400' : 'text-[#141225] hover:text-[#244270]'} transition-colors`}>
                          {item.value}
                        </a>
                      ) : (
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-[#141225]'}`}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={`border-t pt-6 ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}>
                <p className={`text-sm mb-4 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Follow me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/10 text-white hover:bg-purple-500/20 hover:text-purple-400 border border-purple-500/20 hover:border-purple-500/40' : 'bg-[#244270]/10 text-[#244270] hover:bg-[#244270]/20'} transition-all duration-300`}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className={`mt-8 p-4 rounded-xl ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-50" />
                  </div>
                  <p className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Available for new projects
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

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

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                    <CheckCircle className={`w-8 h-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
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
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${isDark ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 text-white hover:from-purple-400 hover:via-cyan-400 hover:to-blue-400' : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7] text-white hover:from-[#3da8b8] hover:via-[#4f46e5] hover:to-[#9333ea]'} shadow-lg ${isDark ? 'shadow-purple-500/30' : 'shadow-cyan-500/25'} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={18} />
                    Send Message
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
            © {new Date().getFullYear()} Ariel Shemesh. Built with React & Framer Motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
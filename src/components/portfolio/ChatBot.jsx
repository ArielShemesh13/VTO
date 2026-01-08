import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ChatBot({ isDark }) {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm here to help. What's your name?" }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [step, setStep] = useState('name');
  const [userData, setUserData] = useState({ name: '', email: '', message: '' });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!currentInput.trim() || isSending) return;

    const userMessage = { role: 'user', content: currentInput.trim() };
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsSending(true);

    setTimeout(async () => {
      if (step === 'name') {
        setUserData(prev => ({ ...prev, name: currentInput.trim() }));
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: `Nice to meet you, ${currentInput.trim()}! What's your email address?` 
        }]);
        setStep('email');
        setIsSending(false);
      } else if (step === 'email') {
        setUserData(prev => ({ ...prev, email: currentInput.trim() }));
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: "Great! Now, how can I help you today?" 
        }]);
        setStep('message');
        setIsSending(false);
      } else if (step === 'message') {
        const messageContent = currentInput.trim();
        setUserData(prev => ({ ...prev, message: messageContent }));

        try {
          await Promise.all([
            base44.integrations.Core.SendEmail({
              to: 'Arielshemesh1999@gmail.com',
              subject: `New Website Message from ${userData.name}`,
              body: `
You have received a new message through your portfolio website:

Name: ${userData.name}
Email: ${userData.email}

Message:
${messageContent}

---
Sent from portfolio chat
              `
            }),
            base44.entities.ContactMessage.create({
              name: userData.name,
              email: userData.email,
              message: messageContent,
              status: 'new'
            })
          ]);

          setMessages(prev => [...prev, { 
            role: 'bot', 
            content: "Your message has been sent.\nCan I help you with anything else?",
            showOptions: true
          }]);
          setStep('followup');
        } catch (error) {
          setMessages(prev => [...prev, { 
            role: 'bot', 
            content: "Sorry, there was an error sending your message. Please try again." 
          }]);
        }
        setIsSending(false);
      } else if (step === 'followup') {
        const response = currentInput.trim().toLowerCase();
        if (response === 'yes') {
          setMessages(prev => [...prev, { 
            role: 'bot', 
            content: "I'm currently an experimental bot and still in development.\nVery soon you'll be able to see my full capabilities!" 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            role: 'bot', 
            content: "Thank you for reaching out! Have a great day!" 
          }]);
        }
        setStep('done');
        setIsSending(false);
      }
    }, 800);
  };

  const handleOptionClick = (option) => {
    setCurrentInput(option);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden ${
      isDark 
        ? 'bg-black/40 border border-purple-500/20' 
        : 'bg-white border border-[#244270]/10 shadow-xl'
    } backdrop-blur-xl`}>
      <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-20 -z-10 ${
        isDark 
          ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' 
          : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7]'
      }`} />

      <div className={`p-6 border-b ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}>
        <div className="flex items-center gap-4">
          <motion.div 
            className="relative"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              isDark 
                ? 'bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-500' 
                : 'bg-gradient-to-br from-[#4dbdce] via-[#6366f1] to-[#a855f7]'
            } shadow-lg`}>
              <div className={`text-2xl`}>🤖</div>
            </div>
            <motion.div 
              className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              Chat Assistant
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className={`text-xs ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? isDark 
                    ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 text-white' 
                    : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7] text-white'
                  : isDark
                    ? 'bg-white/10 text-white'
                    : 'bg-[#244270]/5 text-[#141225]'
              }`}>
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
                
                {msg.showOptions && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleOptionClick('Yes')}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                        isDark
                          ? 'bg-white/20 hover:bg-white/30 text-white'
                          : 'bg-white hover:bg-[#244270]/10 text-[#244270]'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleOptionClick('No')}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                        isDark
                          ? 'bg-white/20 hover:bg-white/30 text-white'
                          : 'bg-white hover:bg-[#244270]/10 text-[#244270]'
                      }`}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isSending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className={`rounded-2xl px-4 py-3 ${
              isDark ? 'bg-white/10' : 'bg-[#244270]/5'
            }`}>
              <Loader2 className={`w-5 h-5 animate-spin ${isDark ? 'text-white' : 'text-[#244270]'}`} />
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {step !== 'done' && (
        <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}>
          <div className="flex gap-2">
            <input
              type={step === 'email' ? 'email' : 'text'}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                step === 'name' ? 'Type your name...' :
                step === 'email' ? 'Type your email...' :
                'Type your message...'
              }
              disabled={isSending}
              className={`flex-1 px-4 py-3 rounded-xl outline-none transition-all ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-purple-500/50 focus:bg-white/10' 
                  : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/40 focus:border-[#244270]/30 focus:bg-[#244270]/10'
              }`}
            />
            <motion.button
              onClick={handleSend}
              disabled={!currentInput.trim() || isSending}
              className={`p-3 rounded-xl ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 hover:from-purple-400 hover:via-cyan-400 hover:to-blue-400' 
                  : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7] hover:from-[#3da8b8] hover:via-[#4f46e5] hover:to-[#9333ea]'
              } disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
              whileHover={!isSending ? { scale: 1.05 } : {}}
              whileTap={!isSending ? { scale: 0.95 } : {}}
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
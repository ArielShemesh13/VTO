import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ChatBot({ isDark }) {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [emailError, setEmailError] = useState('');

  const messagesEndRef = useRef(null);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canSendMessage = () => {
    return userData.name.trim() && userData.email.trim() && isValidEmail(userData.email) && currentInput.trim();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userData.email) {
      if (!isValidEmail(userData.email)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
  }, [userData.email]);

  const handleSend = async () => {
    if (!canSendMessage() || isSending) return;

    const userMessage = { role: 'user', content: currentInput.trim(), name: userData.name };
    setMessages(prev => [...prev, userMessage]);
    const messageContent = currentInput.trim();
    setCurrentInput('');
    setIsSending(true);

    setTimeout(async () => {
      try {
        await base44.entities.ContactMessage.create({
          name: userData.name,
          email: userData.email,
          message: messageContent,
          status: 'new'
        });

        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: "Your message has been sent.\nCan I help you with anything else?",
          showOptions: true
        }]);
      } catch (error) {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: "Sorry, there was an error sending your message. Please try again." 
        }]);
      } finally {
        setIsSending(false);
      }
    }, 800);
  };

  const handleOptionClick = async (option) => {
    const userMessage = { role: 'user', content: option, name: userData.name };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      if (option.toLowerCase() === 'yes') {
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
    }, 800);
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
        <div className="flex items-center gap-4 mb-6">
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
              className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 shadow-lg"
              style={{ borderColor: isDark ? '#000' : '#fff' }}
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

        <div className="space-y-3">
          <div>
            <label className={`text-xs font-medium mb-1 block ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
              Name
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className={`w-full px-4 py-2.5 rounded-xl outline-none transition-all text-sm ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-purple-500/50 focus:bg-white/10' 
                  : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/40 focus:border-[#244270]/30 focus:bg-[#244270]/10'
              }`}
            />
          </div>

          <div>
            <label className={`text-xs font-medium mb-1 block ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
              Email
            </label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              className={`w-full px-4 py-2.5 rounded-xl outline-none transition-all text-sm ${
                emailError && userData.email
                  ? isDark 
                    ? 'bg-red-500/10 border border-red-500/50 text-white placeholder-white/40 focus:border-red-500' 
                    : 'bg-red-50 border border-red-300 text-[#141225] placeholder-[#141225]/40 focus:border-red-400'
                  : isDark 
                    ? 'bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-purple-500/50 focus:bg-white/10' 
                    : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/40 focus:border-[#244270]/30 focus:bg-[#244270]/10'
              }`}
            />
            {emailError && userData.email && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 mt-1.5"
              >
                <AlertCircle className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500">{emailError}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-6 space-y-4">{messages.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            <p className="text-sm">Fill in your details above to start chatting</p>
          </div>
        )}
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                msg.role === 'user'
                  ? isDark 
                    ? 'bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-500 text-white rounded-br-md' 
                    : 'bg-gradient-to-br from-[#4dbdce] via-[#6366f1] to-[#a855f7] text-white rounded-br-md'
                  : isDark
                    ? 'bg-white/10 backdrop-blur-xl text-white border border-white/10 rounded-bl-md'
                    : 'bg-white text-[#141225] border border-[#244270]/10 rounded-bl-md'
              }`}>
                {msg.role === 'user' && msg.name && (
                  <p className={`text-xs font-medium mb-1 ${isDark ? 'text-white/70' : 'text-white/90'}`}>
                    {msg.name}
                  </p>
                )}
                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                
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

      <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && canSendMessage() && handleSend()}
            placeholder={
              !userData.name.trim() ? 'Enter your name first...' :
              !userData.email.trim() || !isValidEmail(userData.email) ? 'Enter a valid email first...' :
              'Type your message...'
            }
            disabled={isSending || !userData.name.trim() || !isValidEmail(userData.email)}
            className={`flex-1 px-4 py-3 rounded-xl outline-none transition-all ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-purple-500/50 focus:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed' 
                : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/40 focus:border-[#244270]/30 focus:bg-[#244270]/10 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          />
          <motion.button
            onClick={handleSend}
            disabled={!canSendMessage() || isSending}
            className={`p-3 rounded-xl ${
              isDark 
                ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 hover:from-purple-400 hover:via-cyan-400 hover:to-blue-400' 
                : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7] hover:from-[#3da8b8] hover:via-[#4f46e5] hover:to-[#9333ea]'
            } disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg`}
            whileHover={canSendMessage() && !isSending ? { scale: 1.05 } : {}}
            whileTap={canSendMessage() && !isSending ? { scale: 0.95 } : {}}
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
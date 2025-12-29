import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: "Hi! 👋 I'm Ariel's AI assistant. Feel free to ask me about his skills, experience, or projects. How can I help you today?",
  },
];

const quickReplies = [
  "Tell me about Ariel's skills",
  "What projects has he worked on?",
  "How can I contact Ariel?",
  "What's his experience?",
];

export default function ChatWidget({ isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
      return "Ariel is skilled in Data Analysis (SQL, Python, Power BI, Excel), Business Intelligence, and Web Development (React, JavaScript). He specializes in turning raw data into actionable insights!";
    }
    if (lowerMessage.includes('project')) {
      return "Ariel has worked on several exciting projects including Excel & Azure Integration for data analysis, SQL Database Modeling with complex queries, and End-to-End Data Analysis projects using Python and Power BI dashboards.";
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      return "You can reach Ariel at arielshemesh1999@gmail.com or connect with him on LinkedIn. Feel free to scroll down to the Contact section for more options!";
    }
    if (lowerMessage.includes('web3') || lowerMessage.includes('blockchain') || lowerMessage.includes('crypto')) {
      return "Ariel's portfolio showcases his expertise in modern web technologies including Web3 and blockchain. The live cryptocurrency transactions you see are real-time data from various blockchains!";
    }
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
      return "Ariel has a B.A. in Business Administration with a specialization in Information Systems from Ono Academic College. His studies covered data analysis, financial modeling, and database design.";
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 Great to meet you! I'm here to answer any questions about Ariel's portfolio. What would you like to know?";
    }
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Ariel has hands-on experience in data analysis, working with SQL, Python (Pandas), Power BI, and advanced Excel. He's also developed web applications using React and JavaScript. Check out the Projects section for detailed examples!";
    }
    
    return "Thanks for your question! I'm a demo chatbot for Ariel's portfolio. In the future, this will be connected to a more advanced AI. For now, try asking about his skills, projects, education, or contact info!";
  };

  const handleSend = async (message = inputValue) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = generateResponse(message);
    
    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: response,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl ${
          isDark 
            ? 'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white hover:shadow-purple-500/50' 
            : 'bg-gradient-to-br from-[#244270] via-blue-500 to-[#4dbdce] text-white hover:shadow-cyan-500/50'
        } transition-all duration-300 border-2 ${
          isDark ? 'border-cyan-400/30' : 'border-cyan-300/50'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl ${
              isDark 
                ? 'bg-[#0a0a1a]/95 border-2 border-cyan-500/30' 
                : 'bg-white/95 border-2 border-cyan-400/30'
            }`}
            style={{
              boxShadow: isDark 
                ? '0 0 40px rgba(6, 182, 212, 0.3), 0 0 80px rgba(168, 85, 247, 0.2)' 
                : '0 0 40px rgba(6, 182, 212, 0.2)'
            }}
          >
            {/* Header */}
            <div className={`p-4 relative ${
              isDark 
                ? 'bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40 border-b border-cyan-500/20' 
                : 'bg-gradient-to-r from-[#244270]/10 via-blue-100/50 to-[#4dbdce]/10 border-b border-cyan-400/20'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`relative p-2 rounded-full ${
                    isDark 
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30' 
                      : 'bg-gradient-to-br from-cyan-50 to-purple-50 border border-cyan-300/50'
                  }`}>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.96-7-5.42-7-10V8.3l7-3.5 7 3.5V10c0 4.58-3.14 9.04-7 10z"/>
                        <circle cx="12" cy="12" r="2"/>
                        <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" opacity="0.3"/>
                      </svg>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                      isDark ? 'bg-green-400' : 'bg-green-500'
                    } border-2 ${isDark ? 'border-[#0a0a1a]' : 'border-white'}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300' : 'text-[#141225]'}`}>
                      Web3 Assistant
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-cyan-400/70' : 'text-cyan-600/70'}`}>
                      Powered by blockchain
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-lg transition-all ${
                    isDark 
                      ? 'hover:bg-red-500/20 text-white/70 hover:text-red-400 border border-white/10 hover:border-red-500/30' 
                      : 'hover:bg-red-50 text-[#141225]/70 hover:text-red-600 border border-[#244270]/10 hover:border-red-400/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className={`h-80 overflow-y-auto p-4 space-y-4 ${
              isDark 
                ? 'bg-gradient-to-b from-transparent to-purple-900/5' 
                : 'bg-gradient-to-b from-transparent to-cyan-50/30'
            }`}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    message.role === 'user'
                      ? isDark 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border border-cyan-400/30' 
                        : 'bg-gradient-to-br from-[#4dbdce] to-[#244270] border border-cyan-300/30'
                      : isDark 
                        ? 'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 border border-purple-400/30' 
                        : 'bg-gradient-to-br from-[#244270] via-blue-500 to-[#4dbdce] border border-purple-300/30'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                    )}
                  </div>
                  <div className={`max-w-[75%] ${
                    message.role === 'user'
                      ? 'rounded-[20px] rounded-tr-sm'
                      : 'rounded-[20px] rounded-tl-sm'
                  } ${
                    message.role === 'user'
                      ? isDark 
                        ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg border border-cyan-400/30' 
                        : 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-md border border-cyan-300/30'
                      : isDark 
                        ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 text-white shadow-lg backdrop-blur-xl border border-purple-500/20' 
                        : 'bg-white text-[#141225] shadow-md border border-cyan-200/50'
                  } px-4 py-3 relative`}>
                    <p className="text-sm leading-relaxed" style={{ 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                      fontWeight: 400,
                      letterSpacing: '-0.01em'
                    }}>
                      {message.content}
                    </p>
                    {/* iOS-style message tail */}
                    <div className={`absolute ${
                      message.role === 'user' ? 'right-0 top-0' : 'left-0 top-0'
                    }`} style={{
                      width: 0,
                      height: 0,
                      borderStyle: 'solid',
                      ...(message.role === 'user' ? {
                        borderWidth: '0 12px 12px 0',
                        borderColor: `transparent ${isDark ? '#0B84FE' : '#0B84FE'} transparent transparent`,
                        transform: 'translateX(100%) translateY(0)',
                      } : {
                        borderWidth: '0 0 12px 12px',
                        borderColor: `transparent transparent ${isDark ? '#2C2C2E' : '#ffffff'} transparent`,
                        transform: 'translateX(-100%) translateY(0)',
                      })
                    }} />
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="flex gap-3"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    isDark 
                      ? 'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 border border-purple-400/30' 
                      : 'bg-gradient-to-br from-[#244270] via-blue-500 to-[#4dbdce] border border-purple-300/30'
                  }`}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <div className={`rounded-[20px] rounded-tl-sm px-4 py-3 ${
                    isDark 
                      ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 shadow-lg border border-purple-500/20' 
                      : 'bg-white shadow-md border border-cyan-200/50'
                  }`}>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-500'}`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isDark 
                          ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400/50' 
                          : 'bg-gradient-to-r from-cyan-50 to-purple-50 text-cyan-700 border border-cyan-300/40 hover:bg-cyan-100/80 hover:border-cyan-400/60'
                      }`}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className={`p-4 border-t backdrop-blur-xl ${
              isDark 
                ? 'bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-cyan-500/20' 
                : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border-cyan-400/20'
            }`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Web3, blockchain, or portfolio..."
                  className={`flex-1 px-4 py-3 rounded-xl outline-none text-sm transition-all ${
                    isDark 
                      ? 'bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-300/30 focus:border-cyan-400/50 focus:bg-white/10' 
                      : 'bg-white/80 border border-cyan-300/40 text-[#141225] placeholder-cyan-600/30 focus:border-cyan-400/60'
                  }`}
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-3 rounded-xl ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white disabled:opacity-50 border border-cyan-400/30' 
                      : 'bg-gradient-to-r from-[#244270] via-blue-500 to-[#4dbdce] text-white disabled:opacity-50 border border-cyan-300/30'
                  } transition-all shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <p className={`text-xs mt-2 text-center ${isDark ? 'text-cyan-400/50' : 'text-cyan-600/50'}`}>
                ⛓️ Powered by Web3 Technology
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
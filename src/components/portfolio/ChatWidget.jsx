import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: "👋 Hi! I'm Ariel's Data Bot (Beta). This is an experimental assistant. For real-time chat, connect via Telegram! Ask me about Ariel's skills, experience, or projects.",
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
    if (lowerMessage.includes('telegram')) {
      return "🚀 Telegram integration coming soon! This will enable real-time AI chat powered by advanced language models. Stay tuned!";
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 Great to meet you! I'm here to answer any questions about Ariel's portfolio. What would you like to know?";
    }
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Ariel has hands-on experience in data analysis, working with SQL, Python (Pandas), Power BI, and advanced Excel. He's also developed web applications using React and JavaScript. Check out the Projects section for detailed examples!";
    }
    
    return "Thanks for your question! I'm an experimental chatbot. For full AI capabilities, connect via Telegram (coming soon). Try asking about Ariel's skills, projects, or contact info!";
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

    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));

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
      {/* Chat Toggle Button - Web3 Style */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
            : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={28} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-28 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] max-h-[600px] rounded-3xl shadow-2xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]' 
                : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'
            }`}
            style={{
              border: isDark 
                ? '2px solid rgba(102, 126, 234, 0.3)'
                : '2px solid rgba(79, 172, 254, 0.3)',
              boxShadow: isDark
                ? '0 20px 60px rgba(102, 126, 234, 0.4)'
                : '0 20px 60px rgba(79, 172, 254, 0.3)',
            }}
          >
            {/* Header - Web3 Style */}
            <div className={`p-4 backdrop-blur-xl ${
              isDark ? 'bg-black/20' : 'bg-white/40'
            }`} style={{
              borderBottom: isDark 
                ? '1px solid rgba(102, 126, 234, 0.2)'
                : '1px solid rgba(79, 172, 254, 0.2)',
            }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
                        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
                      </svg>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      Data Bot
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-purple-300' : 'text-blue-600'}`}>
                      🤖 Beta • Telegram Soon
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-xl transition-all ${
                    isDark 
                      ? 'hover:bg-white/10 text-purple-300 hover:text-white' 
                      : 'hover:bg-blue-100 text-blue-600 hover:text-blue-800'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className={`h-80 overflow-y-auto p-4 space-y-3`}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden" style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? isDark
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : isDark 
                        ? 'bg-white/10 backdrop-blur-xl text-white border border-white/20' 
                        : 'bg-white/80 backdrop-blur-xl text-gray-800 border border-blue-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }} />
                  <div className={`rounded-2xl px-4 py-3 ${
                    isDark ? 'bg-white/10 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'
                  }`}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: isDark 
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                              : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          }}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
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
              <div className={`px-4 pb-3 ${isDark ? 'bg-black/10' : 'bg-white/40'}`}>
                <div className="flex flex-wrap gap-2 pt-3">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isDark 
                          ? 'bg-purple-600/30 text-purple-200 hover:bg-purple-600/50 border border-purple-500/30' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300'
                      }`}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className={`p-4 backdrop-blur-xl ${
              isDark ? 'bg-black/20' : 'bg-white/40'
            }`} style={{
              borderTop: isDark 
                ? '1px solid rgba(102, 126, 234, 0.2)'
                : '1px solid rgba(79, 172, 254, 0.2)',
            }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-2.5 rounded-xl outline-none text-sm transition-all ${
                    isDark 
                      ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-purple-500' 
                      : 'bg-white border border-blue-200 text-gray-800 placeholder-gray-500 focus:border-blue-500'
                  }`}
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
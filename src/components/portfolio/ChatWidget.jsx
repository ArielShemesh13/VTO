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
  "What is compound interest?",
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
    if (lowerMessage.includes('compound interest') || lowerMessage.includes('calculator')) {
      return "Compound interest is when you earn interest on both your initial investment and previously earned interest. Use the calculator above to see how your investments can grow over time! The more frequently interest compounds, the more you earn.";
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
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg ${
          isDark 
            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-400 hover:to-cyan-400' 
            : 'bg-gradient-to-r from-[#244270] to-[#4dbdce] text-white'
        } transition-all duration-300`}
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
            className={`fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden ${
              isDark 
                ? 'bg-[#141225] border border-purple-500/30' 
                : 'bg-white border border-[#244270]/20'
            }`}
          >
            {/* Header */}
            <div className={`p-4 ${
              isDark 
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-b border-purple-500/20' 
                : 'bg-gradient-to-r from-[#244270]/10 to-[#4dbdce]/10 border-b border-[#244270]/10'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-[#244270]/10'}`}>
                  <Bot className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                    Portfolio Assistant
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
                    Ask me anything about Ariel
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                    message.role === 'user'
                      ? isDark ? 'bg-gradient-to-br from-cyan-500 to-blue-500' : 'bg-gradient-to-br from-[#4dbdce] to-[#244270]'
                      : isDark ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-[#244270] to-[#4dbdce]'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[75%] ${
                    message.role === 'user'
                      ? 'rounded-[20px] rounded-tr-sm'
                      : 'rounded-[20px] rounded-tl-sm'
                  } ${
                    message.role === 'user'
                      ? isDark 
                        ? 'bg-gradient-to-br from-[#0B84FE] to-[#0B7EFE] text-white shadow-lg' 
                        : 'bg-gradient-to-br from-[#0B84FE] to-[#0A76EF] text-white shadow-md'
                      : isDark 
                        ? 'bg-[#2C2C2E] text-white shadow-lg backdrop-blur-xl' 
                        : 'bg-white text-[#141225] shadow-md border border-gray-200'
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
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                    isDark ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-[#244270] to-[#4dbdce]'
                  }`}>
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className={`rounded-[20px] rounded-tl-sm px-4 py-3 ${
                    isDark ? 'bg-[#2C2C2E] shadow-lg' : 'bg-white shadow-md border border-gray-200'
                  }`}>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`}
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
                          ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20' 
                          : 'bg-[#244270]/10 text-[#244270] border border-[#244270]/20 hover:bg-[#244270]/20'
                      }`}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className={`p-4 border-t ${isDark ? 'border-purple-500/20' : 'border-[#244270]/10'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-2 rounded-xl outline-none text-sm ${
                    isDark 
                      ? 'bg-white/5 border border-purple-500/20 text-white placeholder-white/30 focus:border-purple-500/50' 
                      : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/30 focus:border-[#244270]/30'
                  }`}
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2 rounded-xl ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white disabled:opacity-50' 
                      : 'bg-gradient-to-r from-[#244270] to-[#4dbdce] text-white disabled:opacity-50'
                  } transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <p className={`text-xs mt-2 text-center ${isDark ? 'text-white/30' : 'text-[#141225]/30'}`}>
                🔗 Telegram bot integration coming soon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
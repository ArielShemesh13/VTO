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
      {/* Chat Toggle Button - Monday Style */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl ${
          isDark 
            ? 'bg-[#0073ea] hover:bg-[#0060c9]' 
            : 'bg-[#0073ea] hover:bg-[#0060c9]'
        } transition-all duration-200 flex items-center justify-center`}
        whileHover={{ scale: 1.05 }}
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
              <X size={26} className="text-white" />
            </motion.div>
            ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={26} className="text-white" />
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
                ? 'bg-[#1c1c1e] border border-[#2c2c2e]' 
                : 'bg-white border border-gray-200'
            }`}
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
            }}
          >
            {/* Header - Monday Style */}
            <div className={`p-4 border-b ${
              isDark 
                ? 'bg-[#1c1c1e] border-[#2c2c2e]' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-[#0073ea] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00ca72] border-2 border-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-base ${isDark ? 'text-white' : 'text-[#323338]'}`}>
                      AI Assistant
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Online
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark 
                      ? 'hover:bg-[#2c2c2e] text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className={`h-80 overflow-y-auto p-4 space-y-3 ${
              isDark 
                ? 'bg-[#1c1c1e]' 
                : 'bg-gray-50'
            }`}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-gray-300'
                      : 'bg-[#0073ea]'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-gray-600" />
                    ) : (
                      <MessageCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[75%] rounded-lg ${
                    message.role === 'user'
                      ? isDark 
                        ? 'bg-[#0073ea] text-white' 
                        : 'bg-[#0073ea] text-white'
                      : isDark 
                        ? 'bg-[#2c2c2e] text-white' 
                        : 'bg-white text-[#323338] border border-gray-200'
                  } px-4 py-2.5`}>
                    <p className="text-sm leading-relaxed" style={{ 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Figtree", "Segoe UI", sans-serif',
                      fontWeight: 400
                    }}>
                      {message.content}
                    </p>
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0073ea] flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className={`rounded-lg px-4 py-3 ${
                    isDark 
                      ? 'bg-[#2c2c2e]' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#0073ea]"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 0.8,
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
              <div className={`px-4 pb-3 border-t ${isDark ? 'border-[#2c2c2e]' : 'border-gray-200'}`}>
                <div className="flex flex-wrap gap-2 pt-3">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className={`px-3 py-2 rounded-lg text-xs transition-all ${
                        isDark 
                          ? 'bg-[#2c2c2e] text-gray-300 hover:bg-[#3c3c3e]' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className={`p-4 border-t ${
              isDark 
                ? 'bg-[#1c1c1e] border-[#2c2c2e]' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-2.5 rounded-lg outline-none text-sm transition-all ${
                    isDark 
                      ? 'bg-[#2c2c2e] border border-[#3c3c3e] text-white placeholder-gray-500 focus:border-[#0073ea]' 
                      : 'bg-gray-50 border border-gray-200 text-[#323338] placeholder-gray-400 focus:border-[#0073ea]'
                  }`}
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-lg bg-[#0073ea] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, Calendar, Flag, Edit2, X, Filter, Search, SortAsc, ChevronDown, Users, Tag } from 'lucide-react';
import { format } from 'date-fns';

export default function TaskBoard({ isDark }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, completed
  const [filterPriority, setFilterPriority] = useState('all'); // all, high, medium, low
  const [sortBy, setSortBy] = useState('created'); // created, priority, dueDate
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all'); // all, work, personal, finance

  // טען מ-localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // שמור ב-localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('portfolio-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: 'medium',
      category: 'personal',
      dueDate: null,
      assignee: null,
      tags: [],
      createdAt: new Date().toISOString(),
    };
    
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    
    updateTask(editingId, { text: editText });
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // פילטור ומיון
  const filteredTasks = tasks
    .filter(task => {
      // חיפוש
      if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // סטטוס
      if (filterStatus === 'active' && task.completed) return false;
      if (filterStatus === 'completed' && !task.completed) return false;
      
      // עדיפות
      if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
      
      // קטגוריה
      if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      // created (default)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const getPriorityColor = (priority) => {
    const colors = {
      high: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-600 border-red-200',
      medium: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-600 border-yellow-200',
      low: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-600 border-green-200',
    };
    return colors[priority] || colors.medium;
  };

  const getCategoryColor = (category) => {
    const colors = {
      work: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600',
      personal: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600',
      finance: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
    };
    return colors[category] || colors.personal;
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  const stats = [
    { label: 'סה"כ', value: tasks.length, color: isDark ? 'text-purple-400' : 'text-[#244270]' },
    { label: 'פעילות', value: tasks.filter(t => !t.completed).length, color: isDark ? 'text-cyan-400' : 'text-[#4dbdce]' },
    { label: 'הושלמו', value: completedTasks, color: isDark ? 'text-green-400' : 'text-green-600' },
    { label: 'עדיפות גבוהה', value: tasks.filter(t => t.priority === 'high' && !t.completed).length, color: isDark ? 'text-red-400' : 'text-red-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-black/40 border border-purple-500/20' 
          : 'bg-white/60 border border-[#244270]/10'
      } backdrop-blur-xl`}
    >
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              📋 לוח משימות
            </h3>
            <p className={`text-sm ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
              נהל משימות בסגנול Monday.com
            </p>
          </div>
          
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-xl ${
              isDark 
                ? 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400' 
                : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270]'
            } transition-all`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={18} />
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-xl ${
                isDark ? 'bg-white/5' : 'bg-[#244270]/5'
              }`}
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className={`text-xs ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        {tasks.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                התקדמות כללית
              </p>
              <p className={`text-xs font-bold ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
                {progress.toFixed(0)}%
              </p>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${
              isDark ? 'bg-white/10' : 'bg-[#244270]/10'
            }`}>
              <motion.div
                className={`h-full ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500' 
                    : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 space-y-3"
          >
            {/* Search */}
            <div className="relative">
              <Search className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-white/40' : 'text-[#141225]/40'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חיפוש משימות..."
                className={`w-full pr-10 pl-4 py-2 rounded-xl outline-none transition-all text-sm ${
                  isDark 
                    ? 'bg-white/5 border border-purple-500/20 text-white placeholder-white/30' 
                    : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/30'
                }`}
              />
            </div>

            {/* Filters Row */}
            <div className="flex gap-2 flex-wrap">
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium outline-none ${
                  isDark 
                    ? 'bg-white/5 border border-purple-500/20 text-white' 
                    : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225]'
                }`}
              >
                <option value="all">כל הסטטוסים</option>
                <option value="active">פעילות</option>
                <option value="completed">הושלמו</option>
              </select>

              {/* Priority Filter */}
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium outline-none ${
                  isDark 
                    ? 'bg-white/5 border border-purple-500/20 text-white' 
                    : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225]'
                }`}
              >
                <option value="all">כל העדיפויות</option>
                <option value="high">🔴 גבוהה</option>
                <option value="medium">🟡 בינונית</option>
                <option value="low">🟢 נמוכה</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium outline-none ${
                  isDark 
                    ? 'bg-white/5 border border-purple-500/20 text-white' 
                    : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225]'
                }`}
              >
                <option value="all">כל הקטגוריות</option>
                <option value="work">💼 עבודה</option>
                <option value="personal">👤 אישי</option>
                <option value="finance">💰 פיננסים</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium outline-none ${
                  isDark 
                    ? 'bg-white/5 border border-purple-500/20 text-white' 
                    : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225]'
                }`}
              >
                <option value="created">מיון: תאריך יצירה</option>
                <option value="priority">מיון: עדיפות</option>
                <option value="dueDate">מיון: תאריך יעד</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Task Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="+ הוסף משימה חדשה..."
          className={`flex-1 px-4 py-3 rounded-xl outline-none transition-all ${
            isDark 
              ? 'bg-white/5 border border-purple-500/20 text-white placeholder-white/30 focus:border-purple-500/50' 
              : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/30 focus:border-[#244270]/30'
          }`}
        />
        <motion.button
          onClick={addTask}
          className={`px-4 py-3 rounded-xl flex items-center gap-2 font-medium ${
            isDark 
              ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-400 hover:to-cyan-400' 
              : 'bg-gradient-to-r from-[#244270] to-[#4dbdce] text-white hover:from-[#1a3255] hover:to-[#3da8b8]'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
        </motion.button>
      </div>

      {/* Tasks List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.02 }}
              className={`p-4 rounded-xl border transition-all ${
                task.completed
                  ? isDark 
                    ? 'bg-white/5 border-white/10 opacity-60' 
                    : 'bg-[#244270]/5 border-[#244270]/10 opacity-60'
                  : isDark 
                    ? 'bg-white/5 border-purple-500/20 hover:border-purple-500/40 hover:bg-white/10' 
                    : 'bg-white/50 border-[#244270]/10 hover:border-[#244270]/30 hover:bg-white/80'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <motion.button
                  onClick={() => toggleComplete(task.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? isDark 
                        ? 'bg-green-500 border-green-500' 
                        : 'bg-green-600 border-green-600'
                      : isDark 
                        ? 'border-purple-500/50 hover:border-purple-500' 
                        : 'border-[#244270]/30 hover:border-[#244270]'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {task.completed && <Check size={12} className="text-white" />}
                </motion.button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  {editingId === task.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        className={`flex-1 px-3 py-1 rounded-lg outline-none ${
                          isDark 
                            ? 'bg-white/10 border border-purple-500/30 text-white' 
                            : 'bg-white border border-[#244270]/20 text-[#141225]'
                        }`}
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className={`p-1 rounded ${
                          isDark ? 'text-green-400 hover:bg-green-500/20' : 'text-green-600 hover:bg-green-100'
                        }`}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className={`p-1 rounded ${
                          isDark ? 'text-red-400 hover:bg-red-500/20' : 'text-red-600 hover:bg-red-100'
                        }`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className={`text-sm font-medium mb-2 ${
                        task.completed 
                          ? 'line-through' 
                          : isDark ? 'text-white' : 'text-[#141225]'
                      }`}>
                        {task.text}
                      </p>
                      
                      {/* Metadata Row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Priority */}
                        <select
                          value={task.priority}
                          onChange={(e) => updateTask(task.id, { priority: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          className={`px-2 py-0.5 rounded text-xs border transition-all ${
                            getPriorityColor(task.priority)
                          }`}
                        >
                          <option value="high">🔴 גבוהה</option>
                          <option value="medium">🟡 בינונית</option>
                          <option value="low">🟢 נמוכה</option>
                        </select>

                        {/* Category */}
                        <select
                          value={task.category}
                          onChange={(e) => updateTask(task.id, { category: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          className={`px-2 py-0.5 rounded text-xs ${
                            getCategoryColor(task.category)
                          }`}
                        >
                          <option value="work">💼 עבודה</option>
                          <option value="personal">👤 אישי</option>
                          <option value="finance">💰 פיננסים</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                {/* Actions */}
                {editingId !== task.id && (
                  <div className="flex gap-1">
                    <motion.button
                      onClick={() => startEdit(task)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark 
                          ? 'text-white/40 hover:text-cyan-400 hover:bg-cyan-500/10' 
                          : 'text-[#141225]/40 hover:text-[#4dbdce] hover:bg-[#4dbdce]/10'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit2 size={14} />
                    </motion.button>
                    <motion.button
                      onClick={() => deleteTask(task.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark 
                          ? 'text-white/40 hover:text-red-400 hover:bg-red-500/10' 
                          : 'text-[#141225]/40 hover:text-red-600 hover:bg-red-100'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            <p className="text-sm">
              {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || selectedCategory !== 'all'
                ? 'אין משימות התואמות את הסינון'
                : 'אין משימות עדיין'}
            </p>
            <p className="text-xs mt-1">
              {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || selectedCategory !== 'all'
                ? 'נסה לשנות את הפילטרים'
                : 'הוסף משימה חדשה כדי להתחיל'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
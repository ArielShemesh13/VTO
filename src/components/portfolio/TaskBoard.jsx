import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, Calendar, Flag, Edit2, X } from 'lucide-react';
import { format } from 'date-fns';

export default function TaskBoard({ isDark }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

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
      dueDate: null,
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

  const updatePriority = (id, priority) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, priority } : t
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
    
    setTasks(tasks.map(t => 
      t.id === editingId ? { ...t, text: editText } : t
    ));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-600 border-red-200',
      medium: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-600 border-yellow-200',
      low: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-600 border-green-200',
    };
    return colors[priority] || colors.medium;
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            לוח משימות
          </h3>
          <p className={`text-sm ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
            נהל את המטרות והיעדים שלך
          </p>
        </div>
        <div className="text-left">
          <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
            {completedTasks}/{tasks.length}
          </p>
          <p className={`text-xs ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            הושלמו
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div className="mb-6">
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
          <p className={`text-xs mt-1 text-center ${
            isDark ? 'text-white/40' : 'text-[#141225]/40'
          }`}>
            {progress.toFixed(0)}% הושלם
          </p>
        </div>
      )}

      {/* Add Task Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="הוסף משימה חדשה..."
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
          הוסף
        </motion.button>
      </div>

      {/* Tasks List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`p-4 rounded-xl border transition-all ${
                task.completed
                  ? isDark 
                    ? 'bg-white/5 border-white/10 opacity-60' 
                    : 'bg-[#244270]/5 border-[#244270]/10 opacity-60'
                  : isDark 
                    ? 'bg-white/5 border-purple-500/20 hover:border-purple-500/40' 
                    : 'bg-white/50 border-[#244270]/10 hover:border-[#244270]/30'
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
                      <p className={`text-sm font-medium ${
                        task.completed 
                          ? 'line-through' 
                          : isDark ? 'text-white' : 'text-[#141225]'
                      }`}>
                        {task.text}
                      </p>
                      
                      {/* Priority Badges */}
                      <div className="flex items-center gap-2 mt-2">
                        {['low', 'medium', 'high'].map((priority) => (
                          <button
                            key={priority}
                            onClick={() => updatePriority(task.id, priority)}
                            className={`px-2 py-0.5 rounded text-xs border transition-all ${
                              task.priority === priority
                                ? getPriorityColor(priority)
                                : isDark 
                                  ? 'bg-white/5 text-white/30 border-white/10 hover:border-white/20' 
                                  : 'bg-[#244270]/5 text-[#141225]/30 border-[#244270]/10 hover:border-[#244270]/20'
                            }`}
                          >
                            {priority === 'high' && '🔴 גבוהה'}
                            {priority === 'medium' && '🟡 בינונית'}
                            {priority === 'low' && '🟢 נמוכה'}
                          </button>
                        ))}
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

        {tasks.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            <p className="text-sm">אין משימות עדיין</p>
            <p className="text-xs mt-1">הוסף משימה חדשה כדי להתחיל</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
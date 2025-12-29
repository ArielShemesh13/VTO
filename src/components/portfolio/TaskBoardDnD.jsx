import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, Check, Edit2, X, Filter, Search, GripVertical } from 'lucide-react';

const CATEGORIES = [
  { id: 'work', label: '💼 עבודה', color: 'blue' },
  { id: 'personal', label: '👤 אישי', color: 'purple' },
  { id: 'finance', label: '💰 פיננסים', color: 'emerald' },
  { id: 'health', label: '🏃 בריאות', color: 'pink' },
];

const PRIORITIES = [
  { id: 'high', label: '🔴 גבוהה', color: 'red' },
  { id: 'medium', label: '🟡 בינונית', color: 'yellow' },
  { id: 'low', label: '🟢 נמוכה', color: 'green' },
];

export default function TaskBoardDnD({ isDark }) {
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-tasks-dnd');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      // Initialize with empty categories
      const initial = {};
      CATEGORIES.forEach(cat => {
        initial[cat.id] = [];
      });
      setTasks(initial);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(tasks).length > 0) {
      localStorage.setItem('portfolio-tasks-dnd', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (categoryId) => {
    if (!newTask.trim()) return;
    
    const task = {
      id: `task-${Date.now()}`,
      text: newTask,
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => ({
      ...prev,
      [categoryId]: [task, ...(prev[categoryId] || [])]
    }));
    setNewTask('');
  };

  const deleteTask = (categoryId, taskId) => {
    setTasks(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter(t => t.id !== taskId)
    }));
  };

  const toggleComplete = (categoryId, taskId) => {
    setTasks(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  const updateTask = (categoryId, taskId, updates) => {
    setTasks(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].map(t => 
        t.id === taskId ? { ...t, ...updates } : t
      )
    }));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (categoryId) => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    
    updateTask(categoryId, editingId, { text: editText });
    setEditingId(null);
    setEditText('');
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;
    
    const sourceTasks = Array.from(tasks[sourceCategory] || []);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCategory === destCategory) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks(prev => ({
        ...prev,
        [sourceCategory]: sourceTasks
      }));
    } else {
      const destTasks = Array.from(tasks[destCategory] || []);
      destTasks.splice(destination.index, 0, movedTask);
      
      setTasks(prev => ({
        ...prev,
        [sourceCategory]: sourceTasks,
        [destCategory]: destTasks
      }));
    }
  };

  const getTasksForCategory = (categoryId) => {
    const categoryTasks = tasks[categoryId] || [];
    return categoryTasks.filter(task => {
      if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filterPriority !== 'all' && task.priority !== filterPriority) {
        return false;
      }
      return true;
    });
  };

  const totalTasks = Object.values(tasks).reduce((sum, catTasks) => sum + catTasks.length, 0);
  const completedTasks = Object.values(tasks).reduce((sum, catTasks) => 
    sum + catTasks.filter(t => t.completed).length, 0
  );

  const getCategoryColor = (category) => {
    const colors = {
      work: isDark ? 'from-blue-500/20 to-blue-600/20 border-blue-500/30' : 'from-blue-100/50 to-blue-200/50 border-blue-200',
      personal: isDark ? 'from-purple-500/20 to-purple-600/20 border-purple-500/30' : 'from-purple-100/50 to-purple-200/50 border-purple-200',
      finance: isDark ? 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30' : 'from-emerald-100/50 to-emerald-200/50 border-emerald-200',
      health: isDark ? 'from-pink-500/20 to-pink-600/20 border-pink-500/30' : 'from-pink-100/50 to-pink-200/50 border-pink-200',
    };
    return colors[category] || colors.personal;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-600 border-red-200',
      medium: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-600 border-yellow-200',
      low: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-600 border-green-200',
    };
    return colors[priority] || colors.medium;
  };

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
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              📋 לוח משימות (גרור ושחרר)
            </h3>
            <p className={`text-sm ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
              גרור משימות בין קטגוריות
            </p>
          </div>
          
          <div className="flex gap-2">
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-[#244270]/5'}`}>
            <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
              {totalTasks}
            </p>
            <p className={`text-xs ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
              סה"כ משימות
            </p>
          </div>
          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-[#244270]/5'}`}>
            <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {completedTasks}
            </p>
            <p className={`text-xs ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
              הושלמו
            </p>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 mb-4"
            >
              <div className="relative">
                <Search className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-white/40' : 'text-[#141225]/40'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חיפוש..."
                  className={`w-full pr-10 pl-4 py-2 rounded-xl outline-none text-sm ${
                    isDark 
                      ? 'bg-white/5 border border-purple-500/20 text-white placeholder-white/30' 
                      : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/30'
                  }`}
                />
              </div>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-sm outline-none ${
                  isDark 
                    ? 'bg-white/5 border border-purple-500/20 text-white' 
                    : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225]'
                }`}
              >
                <option value="all">כל העדיפויות</option>
                {PRIORITIES.map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drag and Drop Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="space-y-3">
              {/* Category Header */}
              <div className={`p-3 rounded-xl bg-gradient-to-br ${getCategoryColor(category.id)} border backdrop-blur-sm`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                    {category.label}
                  </h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isDark ? 'bg-white/20 text-white' : 'bg-black/10 text-[#141225]'
                  }`}>
                    {getTasksForCategory(category.id).length}
                  </span>
                </div>
                
                {/* Quick Add */}
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask(category.id)}
                    placeholder="+ הוסף..."
                    className={`flex-1 px-2 py-1 rounded text-xs outline-none ${
                      isDark 
                        ? 'bg-white/10 border border-white/20 text-white placeholder-white/40' 
                        : 'bg-white/50 border border-black/10 text-[#141225] placeholder-[#141225]/40'
                    }`}
                  />
                  <button
                    onClick={() => addTask(category.id)}
                    className={`px-2 py-1 rounded ${
                      isDark 
                        ? 'bg-white/20 hover:bg-white/30 text-white' 
                        : 'bg-black/10 hover:bg-black/20 text-[#141225]'
                    }`}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Droppable Task List */}
              <Droppable droppableId={category.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] p-2 rounded-xl transition-colors ${
                      snapshot.isDraggingOver
                        ? isDark 
                          ? 'bg-purple-500/10 border-2 border-purple-500/30' 
                          : 'bg-[#244270]/10 border-2 border-[#244270]/30'
                        : 'border-2 border-transparent'
                    }`}
                  >
                    <AnimatePresence>
                      {getTasksForCategory(category.id).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className={`mb-2 p-3 rounded-lg border transition-all ${
                                snapshot.isDragging
                                  ? isDark 
                                    ? 'bg-purple-500/20 border-purple-500/50 shadow-xl' 
                                    : 'bg-[#244270]/20 border-[#244270]/50 shadow-xl'
                                  : task.completed
                                    ? isDark 
                                      ? 'bg-white/5 border-white/10 opacity-60' 
                                      : 'bg-[#244270]/5 border-[#244270]/10 opacity-60'
                                    : isDark 
                                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                                      : 'bg-white/50 border-[#244270]/10 hover:bg-white/80'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <div {...provided.dragHandleProps} className="mt-0.5">
                                  <GripVertical size={14} className={isDark ? 'text-white/40' : 'text-[#141225]/40'} />
                                </div>
                                
                                <button
                                  onClick={() => toggleComplete(category.id, task.id)}
                                  className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 ${
                                    task.completed
                                      ? isDark ? 'bg-green-500 border-green-500' : 'bg-green-600 border-green-600'
                                      : isDark ? 'border-white/30' : 'border-[#141225]/30'
                                  }`}
                                >
                                  {task.completed && <Check size={10} className="text-white" />}
                                </button>

                                <div className="flex-1 min-w-0">
                                  {editingId === task.id ? (
                                    <div className="flex gap-1">
                                      <input
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(category.id)}
                                        className={`flex-1 px-2 py-1 rounded text-xs outline-none ${
                                          isDark ? 'bg-white/10 text-white' : 'bg-white text-[#141225]'
                                        }`}
                                        autoFocus
                                      />
                                      <button onClick={() => saveEdit(category.id)}>
                                        <Check size={12} className="text-green-500" />
                                      </button>
                                      <button onClick={() => setEditingId(null)}>
                                        <X size={12} className="text-red-500" />
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <p className={`text-xs ${
                                        task.completed ? 'line-through' : ''
                                      } ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                                        {task.text}
                                      </p>
                                      
                                      <select
                                        value={task.priority}
                                        onChange={(e) => updateTask(category.id, task.id, { priority: e.target.value })}
                                        className={`mt-1 px-1.5 py-0.5 rounded text-[10px] border ${
                                          getPriorityColor(task.priority)
                                        }`}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {PRIORITIES.map(p => (
                                          <option key={p.id} value={p.id}>{p.label}</option>
                                        ))}
                                      </select>
                                    </>
                                  )}
                                </div>

                                {editingId !== task.id && (
                                  <div className="flex gap-0.5">
                                    <button
                                      onClick={() => startEdit(task)}
                                      className={`p-1 rounded ${
                                        isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                                      }`}
                                    >
                                      <Edit2 size={10} className={isDark ? 'text-white/40' : 'text-[#141225]/40'} />
                                    </button>
                                    <button
                                      onClick={() => deleteTask(category.id, task.id)}
                                      className={`p-1 rounded ${
                                        isDark ? 'hover:bg-red-500/10' : 'hover:bg-red-100'
                                      }`}
                                    >
                                      <Trash2 size={10} className="text-red-500" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                    
                    {getTasksForCategory(category.id).length === 0 && (
                      <div className={`text-center py-8 text-xs ${
                        isDark ? 'text-white/30' : 'text-[#141225]/30'
                      }`}>
                        אין משימות
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </motion.div>
  );
}
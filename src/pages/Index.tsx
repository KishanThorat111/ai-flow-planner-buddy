import React, { useState } from 'react';
import { Settings, LogOut, Calendar, CheckSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/components/TaskList';
import TaskModal from '@/components/TaskModal';
import AIPlanner from '@/components/AIPlanner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EnhancedCalendarView from '@/components/EnhancedCalendarView';
import EnhancedTaskList from '@/components/EnhancedTaskList';
import ThemeToggle from '@/components/ThemeToggle';
import ParallaxContainer from '@/components/ParallaxContainer';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposals',
      completed: false,
      priority: 'high',
      dueDate: '2025-05-27',
      createdAt: '2025-05-25'
    },
    {
      id: '2',
      title: 'Team standup meeting',
      completed: true,
      priority: 'medium',
      dueDate: '2025-05-25',
      createdAt: '2025-05-24'
    },
    {
      id: '3',
      title: 'Update documentation',
      completed: false,
      priority: 'low',
      createdAt: '2025-05-25'
    }
  ]);
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const handleAddTask = (newTask: {
    title: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
  }) => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [task, ...prev]);
  };
  
  const handleToggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  const completedTasks = tasks.filter(task => task.completed).length;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border-b border-white/20 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Calendar
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-blue-600 font-medium">
                <Calendar className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
              <Link 
                to="/settings" 
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </motion.div>
            
            <ThemeToggle />
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <EnhancedCalendarView onAddTask={() => setIsTaskModalOpen(true)} />
          </div>
          
          {/* Sidebar */}
          <ParallaxContainer className="space-y-6" offset={20}>
            {/* AI Planner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AIPlanner taskCount={tasks.length} completedTasks={completedTasks} />
            </motion.div>
            
            {/* Task List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <EnhancedTaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </motion.div>
          </ParallaxContainer>
        </div>
      </main>
      
      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleAddTask}
      />
    </motion.div>
  );
};

export default Index;


import React from 'react';
import { Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/components/TaskList';
import GlassCard from './GlassCard';
import AnimatedTaskCard from './AnimatedTaskCard';

interface EnhancedTaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const EnhancedTaskList = ({ tasks, onToggleTask, onDeleteTask }: EnhancedTaskListProps) => {
  return (
    <GlassCard className="overflow-hidden">
      <div className="p-6 border-b border-white/20">
        <motion.h2 
          className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Tasks
        </motion.h2>
        <p className="text-sm text-gray-500 mt-1">{tasks.length} total tasks</p>
      </div>
      
      <div className="p-6">
        {tasks.length === 0 ? (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Circle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No tasks yet. Add your first task to get started!</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {tasks.map((task, index) => (
              <AnimatedTaskCard
                key={task.id}
                task={task}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
                index={index}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </GlassCard>
  );
};

export default EnhancedTaskList;

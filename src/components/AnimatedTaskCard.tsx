
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Flag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/components/TaskList';
import GlassCard from './GlassCard';

interface AnimatedTaskCardProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  index: number;
}

const AnimatedTaskCard = ({ task, onToggleTask, onDeleteTask, index }: AnimatedTaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      layout
    >
      <GlassCard className="p-4 mb-3">
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleTask(task.id)}
            className="flex-shrink-0"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
            )}
          </motion.button>
          
          <div className="flex-1 min-w-0">
            <motion.p 
              className={`text-sm font-medium ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-gray-100'
              }`}
              animate={{ opacity: task.completed ? 0.6 : 1 }}
            >
              {task.title}
            </motion.p>
            
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center space-x-1">
                <Flag className={`w-3 h-3 ${getPriorityColor(task.priority)}`} />
                <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
              </div>
              
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{formatDate(task.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteTask(task.id)}
              className="flex-shrink-0 text-gray-400 hover:text-red-400 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default AnimatedTaskCard;

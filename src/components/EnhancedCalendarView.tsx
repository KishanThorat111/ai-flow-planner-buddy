import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import ParallaxContainer from './ParallaxContainer';

const EnhancedCalendarView = ({ onAddTask }: { onAddTask: () => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };
  
  const renderCalendarDays = () => {
    const calendarDays = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="h-24 border border-white/10"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === month && 
                     today.getFullYear() === year;
      
      calendarDays.push(
        <motion.div 
          key={day} 
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`h-24 border border-white/10 p-2 cursor-pointer transition-all duration-200 ${
            isToday ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/30' : ''
          }`}
        >
          <span className={`text-sm font-medium ${
            isToday ? 'text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300'
          }`}>
            {day}
          </span>
        </motion.div>
      );
    }
    
    return calendarDays;
  };
  
  return (
    <ParallaxContainer offset={30}>
      <GlassCard>
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <motion.h2 
            className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            key={`${month}-${year}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {monthNames[month]} {year}
          </motion.h2>
          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="p-2 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="p-2 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onAddTask}
                size="sm"
                className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-7 gap-0 mb-4">
            {days.map(day => (
              <div key={day} className="h-10 flex items-center justify-center border-b border-white/20">
                <span className="text-sm font-medium text-gray-500">{day}</span>
              </div>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${month}-${year}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-7 gap-0"
            >
              {renderCalendarDays()}
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassCard>
    </ParallaxContainer>
  );
};

export default EnhancedCalendarView;

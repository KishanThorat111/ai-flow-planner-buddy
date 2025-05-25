
import React, { useState } from 'react';
import { Settings, LogOut, Calendar, CheckSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalendarView from '@/components/CalendarView';
import TaskList, { Task } from '@/components/TaskList';
import TaskModal from '@/components/TaskModal';
import AIPlanner from '@/components/AIPlanner';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Calendar</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-blue-600 font-medium">
                <Calendar className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
              <Link 
                to="/settings" 
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsTaskModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Add Task
            </Button>
            
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <CalendarView onAddTask={() => setIsTaskModalOpen(true)} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Planner */}
            <AIPlanner taskCount={tasks.length} completedTasks={completedTasks} />
            
            {/* Task List */}
            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </main>
      
      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleAddTask}
      />
    </div>
  );
};

export default Index;

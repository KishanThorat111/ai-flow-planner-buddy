
import React, { useState } from 'react';
import { Sparkles, Brain, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AIPlannerProps {
  taskCount: number;
  completedTasks: number;
}

const AIPlanner = ({ taskCount, completedTasks }: AIPlannerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const completionRate = taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0;
  
  const generateSuggestions = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const sampleSuggestions = [
        "Focus on high-priority tasks first thing in the morning when your energy is highest",
        "Consider breaking down larger tasks into smaller, manageable chunks",
        "Schedule specific time blocks for deep work to maintain focus",
        "Review and update your task priorities weekly for better organization"
      ];
      
      setSuggestions(sampleSuggestions.slice(0, Math.floor(Math.random() * 3) + 2));
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI Productivity Insights</h3>
          <p className="text-sm text-gray-600">Smart suggestions based on your tasks</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-blue-600 mb-1">
            <Clock className="w-5 h-5" />
            <span>{taskCount}</span>
          </div>
          <p className="text-xs text-gray-600">Total Tasks</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-green-600 mb-1">
            <TrendingUp className="w-5 h-5" />
            <span>{completedTasks}</span>
          </div>
          <p className="text-xs text-gray-600">Completed</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-purple-600 mb-1">
            <Brain className="w-5 h-5" />
            <span>{completionRate}%</span>
          </div>
          <p className="text-xs text-gray-600">Success Rate</p>
        </div>
      </div>
      
      {suggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">AI Recommendations:</h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-purple-100">
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Button
        onClick={generateSuggestions}
        disabled={isGenerating}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        {isGenerating ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Analyzing your productivity...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Get AI Suggestions</span>
          </div>
        )}
      </Button>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        💡 Connect OpenAI API in settings for personalized insights
      </div>
    </Card>
  );
};

export default AIPlanner;


import React, { useState } from 'react';
import { ArrowLeft, Key, Calendar, Sparkles, Save, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    googleCalendar: ''
  });
  
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    dailySummary: false,
    aiSuggestions: true
  });
  
  const handleSaveSettings = () => {
    // In a real app, this would save to a backend or local storage
    console.log('Saving settings:', { apiKeys, notifications });
    alert('Settings saved successfully!');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          </div>
          
          <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* API Keys Section */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
                <p className="text-sm text-gray-600">Connect external services for enhanced functionality</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="openai-key" className="text-sm font-medium text-gray-700">
                  OpenAI API Key
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="openai-key"
                    type="password"
                    value={apiKeys.openai}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                    placeholder="sk-..."
                    className="pr-20"
                  />
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Button variant="ghost" size="sm" className="text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Get Key
                    </Button>
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Required for AI task suggestions and smart prioritization
                </p>
              </div>
              
              <div>
                <Label htmlFor="gcal-key" className="text-sm font-medium text-gray-700">
                  Google Calendar API Key
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="gcal-key"
                    type="password"
                    value={apiKeys.googleCalendar}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, googleCalendar: e.target.value }))}
                    placeholder="AIza..."
                    className="pr-20"
                  />
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Button variant="ghost" size="sm" className="text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Get Key
                    </Button>
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Sync your Google Calendar events and create new events from tasks
                </p>
              </div>
            </div>
          </Card>
          
          {/* Notifications Section */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Notifications & Preferences</h2>
                <p className="text-sm text-gray-600">Customize how you receive updates and suggestions</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Task Reminders</Label>
                  <p className="text-xs text-gray-500">Get notified about upcoming task deadlines</p>
                </div>
                <Switch
                  checked={notifications.taskReminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, taskReminders: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Daily Summary</Label>
                  <p className="text-xs text-gray-500">Receive a daily digest of your tasks and progress</p>
                </div>
                <Switch
                  checked={notifications.dailySummary}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, dailySummary: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700">AI Suggestions</Label>
                  <p className="text-xs text-gray-500">Allow AI to provide productivity insights and recommendations</p>
                </div>
                <Switch
                  checked={notifications.aiSuggestions}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, aiSuggestions: checked }))
                  }
                />
              </div>
            </div>
          </Card>
          
          {/* Integration Status */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Integration Status</h2>
                <p className="text-sm text-gray-600">Overview of connected services</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${apiKeys.openai ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm font-medium">OpenAI Integration</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  apiKeys.openai ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {apiKeys.openai ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${apiKeys.googleCalendar ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm font-medium">Google Calendar</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  apiKeys.googleCalendar ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {apiKeys.googleCalendar ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;

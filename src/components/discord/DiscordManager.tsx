import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Play,
  Pause,
  Settings,
  MessageSquare,
  Users,
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { DiscordIntegrationService, getDiscordPieceInfo } from '@/integrations/discord';

interface WorkflowStatus {
  id: string;
  type: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  startTime: string;
  lastActivity?: string;
  result?: any;
}

export function DiscordManager() {
  const [botToken, setBotToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [activeWorkflows, setActiveWorkflows] = useState<WorkflowStatus[]>([]);
  const [discordService, setDiscordService] = useState<DiscordIntegrationService | null>(null);
  const [pieceInfo, setPieceInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automation configurations
  const [automations, setAutomations] = useState([
    {
      id: 'welcome',
      name: 'Welcome New Members',
      enabled: true,
      config: {
        welcomeChannelId: '',
        welcomeMessage: '🎉 Welcome to the server, {username}! We\'re glad to have you here!',
        assignRoles: []
      }
    },
    {
      id: 'automod',
      name: 'Auto Moderation',
      enabled: false,
      config: {
        filters: ['spam', 'profanity'],
        action: 'warn'
      }
    },
    {
      id: 'engagement',
      name: 'Engagement Booster',
      enabled: false,
      config: {
        channelId: '',
        scheduledMessages: []
      }
    }
  ]);

  useEffect(() => {
    // Load Discord piece information
    try {
      const info = getDiscordPieceInfo();
      setPieceInfo(info);
    } catch (err) {
      console.error('Failed to load Discord piece info:', err);
    }
  }, []);

  const handleConnect = async () => {
    if (!botToken.trim()) {
      setError('Please enter a Discord bot token');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const service = new DiscordIntegrationService(botToken);
      setDiscordService(service);
      setIsConnected(true);

      // Test connection by trying to get bot info
      await testConnection(service);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (service: DiscordIntegrationService) => {
    try {
      // Try a simple action to test the connection
      const result = await service.executeAction('getBotInfo', {});
      console.log('Connection test result:', result);
    } catch (err) {
      console.warn('Connection test failed, but service created:', err);
    }
  };

  const handleDisconnect = () => {
    setDiscordService(null);
    setIsConnected(false);
    setBotToken('');
    setActiveWorkflows([]);
  };

  const sendTestMessage = async () => {
    if (!discordService) return;

    const channelId = prompt('Enter channel ID for test message:');
    if (!channelId) return;

    setLoading(true);
    try {
      const result = await discordService.sendMessage(
        channelId,
        '🤖 Test message from Vortex Discord Manager!'
      );
      console.log('Test message result:', result);

      // Add to active workflows
      setActiveWorkflows(prev => [...prev, {
        id: result.workflowId || `test-${Date.now()}`,
        type: 'Send Message',
        status: 'completed',
        startTime: new Date().toISOString(),
        result
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send test message');
    } finally {
      setLoading(false);
    }
  };

  const startPollingWorkflow = async () => {
    if (!discordService) return;

    const channelId = prompt('Enter channel ID to monitor:');
    if (!channelId) return;

    setLoading(true);
    try {
      const result = await discordService.watchNewMessages(channelId, 10);
      console.log('Polling workflow started:', result);

      setActiveWorkflows(prev => [...prev, {
        id: result.workflowId || `poll-${Date.now()}`,
        type: 'Message Polling',
        status: 'running',
        startTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start polling');
    } finally {
      setLoading(false);
    }
  };

  const toggleAutomation = (automationId: string) => {
    setAutomations(prev =>
      prev.map(auto =>
        auto.id === automationId
          ? { ...auto, enabled: !auto.enabled }
          : auto
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'paused':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Discord Integration Manager</h1>
          <p className="text-muted-foreground">
            Manage Discord bots, triggers, and automations with Temporal workflows
          </p>
        </div>
        <Badge variant={isConnected ? "default" : "secondary"}>
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="connection" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discord Bot Connection</CardTitle>
              <CardDescription>
                Connect your Discord bot to start using triggers and actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bot-token">Discord Bot Token</Label>
                    <Input
                      id="bot-token"
                      type="password"
                      placeholder="Enter your Discord bot token..."
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleConnect}
                    disabled={loading || !botToken.trim()}
                    className="w-full"
                  >
                    {loading ? "Connecting..." : "Connect Discord Bot"}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Discord bot connected successfully</span>
                    </div>
                    <Button variant="outline" onClick={handleDisconnect}>
                      Disconnect
                    </Button>
                  </div>

                  {pieceInfo && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Available Actions:</strong> {pieceInfo.actions?.length || 0}
                      </div>
                      <div>
                        <strong>Available Triggers:</strong> {pieceInfo.triggers?.length || 0}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Discord Actions
              </CardTitle>
              <CardDescription>
                Execute Discord actions through Temporal workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={sendTestMessage}
                  disabled={!isConnected || loading}
                  className="h-20 flex flex-col"
                >
                  <MessageSquare className="h-6 w-6 mb-2" />
                  Send Test Message
                </Button>

                <Button
                  variant="outline"
                  disabled={!isConnected}
                  className="h-20 flex flex-col"
                >
                  <Users className="h-6 w-6 mb-2" />
                  Manage Roles
                </Button>
              </div>

              {pieceInfo?.actions && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Available Actions:</h4>
                  <ScrollArea className="h-32">
                    <div className="space-y-1">
                      {pieceInfo.actions.map((action: any) => (
                        <div key={action.name} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{action.displayName}</span>
                          <Badge variant="outline">{action.name}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="triggers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Discord Triggers
              </CardTitle>
              <CardDescription>
                Set up triggers to respond to Discord events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={startPollingWorkflow}
                  disabled={!isConnected || loading}
                  className="h-20 flex flex-col"
                >
                  <MessageSquare className="h-6 w-6 mb-2" />
                  Monitor Messages
                </Button>

                <Button
                  variant="outline"
                  disabled={!isConnected}
                  className="h-20 flex flex-col"
                >
                  <Heart className="h-6 w-6 mb-2" />
                  Watch Reactions
                </Button>
              </div>

              {pieceInfo?.triggers && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Available Triggers:</h4>
                  <ScrollArea className="h-32">
                    <div className="space-y-1">
                      {pieceInfo.triggers.map((trigger: any) => (
                        <div key={trigger.name} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{trigger.displayName}</span>
                          <Badge variant="outline">{trigger.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Automation Rules
              </CardTitle>
              <CardDescription>
                Configure automated responses and workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {automations.map((automation) => (
                <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{automation.name}</h4>
                      <Badge variant={automation.enabled ? "default" : "secondary"}>
                        {automation.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {automation.id === 'welcome' && 'Automatically welcome new server members'}
                      {automation.id === 'automod' && 'Moderate messages and user behavior'}
                      {automation.id === 'engagement' && 'Boost server engagement with scheduled content'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                    <Switch
                      checked={automation.enabled}
                      onCheckedChange={() => toggleAutomation(automation.id)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Workflows</CardTitle>
              <CardDescription>
                Monitor running Temporal workflows for Discord operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeWorkflows.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No active workflows. Start a trigger or action to see workflows here.
                </div>
              ) : (
                <div className="space-y-3">
                  {activeWorkflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(workflow.status)}
                        <div>
                          <div className="font-medium">{workflow.type}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {workflow.id}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div>Started: {new Date(workflow.startTime).toLocaleTimeString()}</div>
                        {workflow.lastActivity && (
                          <div className="text-muted-foreground">
                            Last: {new Date(workflow.lastActivity).toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

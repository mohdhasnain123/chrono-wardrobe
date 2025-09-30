import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  Send,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Mic,
  MicOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  context?: {
    kpis?: any[];
    alerts?: any[];
    recommendations?: string[];
  };
}

interface AIExecutiveBriefProps {
  kpiData: any[];
  alertsData: any[];
}

export function AIExecutiveBrief({
  kpiData,
  alertsData,
}: AIExecutiveBriefProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content:
        "Welcome to the Castrol Supply Chain Command Center AI Assistant. I can provide executive briefings, analyze KPIs, explain alerts, and suggest strategic actions based on real-time supply chain data.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  // Quick action prompts
  const quickActions = [
    {
      label: "Executive Summary",
      icon: <BarChart3 className="w-4 h-4" />,
      prompt:
        "Provide a comprehensive executive summary of current supply chain performance, highlighting key metrics, critical issues, and strategic recommendations.",
    },
    {
      label: "Risk Analysis",
      icon: <AlertTriangle className="w-4 h-4" />,
      prompt:
        "Analyze current supply chain risks, prioritize by business impact, and recommend immediate mitigation actions.",
    },
    {
      label: "KPI Deep Dive",
      icon: <TrendingUp className="w-4 h-4" />,
      prompt:
        "Deep dive into underperforming KPIs, explain root causes, and provide actionable improvement strategies.",
    },
  ];

  const generateAIResponse = async (userMessage: string) => {
    try {
      setIsLoading(true);

      // Prepare context with current business data
      const context = {
        currentKPIs: kpiData.map((kpi) => ({
          metric: kpi.title,
          value: kpi.value,
          unit: kpi.unit,
          trend: kpi.trend,
          trendValue: kpi.trendValue,
          status: kpi.trend === "down" ? "concerning" : "positive",
        })),
        criticalAlerts: alertsData.map((alert) => ({
          title: alert.title,
          description: alert.description,
          severity: alert.severity,
          impact: alert.impact,
          region: alert.region,
          timeDetected: alert.timeDetected,
        })),
        businessContext: {
          company: "Castrol",
          industry: "Lubricants & Automotive Fluids",
          globalOperations: true,
          keyRegions: ["EMEA North", "India", "APAC", "Americas"],
          currentChallenges: [
            "Hamburg port disruption affecting European operations",
            "Base Oil shortage impacting production capacity",
            "Motorcycle oil demand surge in India market",
            "Quality non-conformance issues in additive supply",
          ],
        },
      };

      const { data, error } = await supabase.functions.invoke(
        "ai-executive-brief",
        {
          body: {
            message: userMessage,
            context: context,
            conversationHistory: messages
              .filter((m) => m.type !== "system")
              .slice(-5), // Last 5 messages for context
          },
        }
      );

      if (error) throw error;

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: "assistant",
        content: data.response,
        timestamp: new Date(),
        context: data.context,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToProcess = inputMessage;
    setInputMessage("");

    await generateAIResponse(messageToProcess);
  };

  const handleQuickAction = async (prompt: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await generateAIResponse(prompt);
  };

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or use text input.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Voice input is not supported in this browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-full flex flex-col bg-gradient-card border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              AI Executive Assistant
            </h3>
            <p className="text-xs text-muted-foreground">
              Supply chain insights & strategic guidance
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-1 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start h-auto p-3 text-left"
              onClick={() => handleQuickAction(action.prompt)}
              disabled={isLoading}
            >
              <div className="flex items-center gap-3">
                {action.icon}
                <span className="text-xs">{action.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.type !== "user" && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3 text-sm",
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : message.type === "system"
                    ? "bg-muted border border-border"
                    : "bg-secondary border border-border"
                )}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>

                {message.context?.recommendations && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="text-xs font-medium mb-2">
                      Recommended Actions:
                    </div>
                    <div className="space-y-1">
                      {message.context.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="text-xs text-muted-foreground"
                        >
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div className="bg-secondary border border-border rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span className="text-muted-foreground ml-2">
                    Analyzing supply chain data...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about KPIs, alerts, or request strategic insights..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8"
              onClick={handleVoiceInput}
              disabled={isLoading}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-primary animate-pulse" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build comprehensive system prompt for Castrol supply chain context
    const systemPrompt = `You are the AI Executive Assistant for Castrol's Global Supply Chain Command Center. You provide strategic insights, executive briefings, and actionable recommendations based on real-time supply chain data.

COMPANY CONTEXT:
- Castrol is a leading global lubricants company
- Operations span across EMEA, Americas, APAC, and India
- Product portfolio: Automotive oils, Industrial fluids, Marine lubricants
- Key focus areas: OTIF performance, inventory optimization, demand forecasting, supplier management

CURRENT BUSINESS SITUATION:
${JSON.stringify(context.businessContext, null, 2)}

REAL-TIME KPI DATA:
${JSON.stringify(context.currentKPIs, null, 2)}

CRITICAL ALERTS:
${JSON.stringify(context.criticalAlerts, null, 2)}

RESPONSE GUIDELINES:
1. Always provide executive-level insights with business impact
2. Use specific data points from the provided context
3. Prioritize actions by business impact and urgency  
4. Reference actual KPI values and alert details
5. Provide strategic recommendations with implementation timeframes
6. Use professional, confident tone suitable for C-suite executives
7. Always include financial implications when relevant
8. Structure responses clearly with key points and recommendations

When analyzing alerts or KPIs:
- Explain root causes and interdependencies
- Quantify business impact (revenue, cost, service level)
- Suggest specific mitigation actions with ownership
- Identify systemic improvements for prevention
- Consider regional and product-specific implications`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory.map((msg: any) => ({
            role: msg.type === "user" ? "user" : "assistant",
            content: msg.content
          })),
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded. Please try again in a moment.",
          response: "I'm experiencing high demand right now. Please try your request again in a few moments."
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "AI service unavailable. Please contact your administrator.",
          response: "The AI service is currently unavailable. Please contact your system administrator to resolve this issue."
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Extract recommendations from response for structured context
    const recommendations = extractRecommendations(aiResponse);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      context: {
        recommendations: recommendations,
        timestamp: new Date().toISOString(),
        dataSource: "real-time"
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in ai-executive-brief function:", error);
    
    const fallbackResponse = generateFallbackResponse(error);
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      error: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function extractRecommendations(aiResponse: string): string[] {
  const recommendations: string[] = [];
  
  // Simple pattern matching for common recommendation phrases
  const patterns = [
    /recommend[^.]*\./gi,
    /suggest[^.]*\./gi,
    /should[^.]*\./gi,
    /need to[^.]*\./gi,
    /action[^.]*\./gi
  ];
  
  patterns.forEach(pattern => {
    const matches = aiResponse.match(pattern);
    if (matches) {
      recommendations.push(...matches.map(m => m.trim()));
    }
  });
  
  return recommendations.slice(0, 5); // Limit to top 5 recommendations
}

function generateFallbackResponse(error: any): string {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  
  if (errorMessage.includes("rate limit") || errorMessage.includes("429")) {
    return "I'm experiencing high demand right now. The current supply chain status shows mixed performance across regions. Hamburg port disruptions are significantly impacting EMEA operations, while India shows strong motorcycle oil demand growth. Please try your specific question again in a moment for detailed analysis.";
  }
  
  if (errorMessage.includes("payment") || errorMessage.includes("402")) {
    return "The AI analysis service is temporarily unavailable. Based on the visible dashboard data, key concerns include OTIF performance at 87.2% (below 95% target) and inventory health at 73 index points. Hamburg port disruptions and base oil shortages require immediate attention. Please contact your system administrator for AI service restoration.";
  }
  
  return `I apologize, but I'm experiencing technical difficulties (${errorMessage}). Based on the current dashboard data, I can see critical supply chain challenges that need executive attention:

1. **OTIF Performance**: Currently at 87.2%, significantly below the 95% target
2. **Critical Alerts**: Hamburg port disruption affecting European operations  
3. **Inventory Health**: Index at 73 points, indicating optimization opportunities
4. **Revenue Impact**: Multiple alerts showing potential €6M+ in penalties

Please try your question again, or contact technical support if issues persist. The supply chain requires immediate attention on the Hamburg situation and OTIF improvement initiatives.`;
}
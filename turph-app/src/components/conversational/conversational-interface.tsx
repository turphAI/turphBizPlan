"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

export function ConversationalInterface() {
  const [input, setInput] = useState("");
  
  return (
    <div className="flex flex-col h-full">
      {/* Response area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground text-center py-8">
            Start a conversation about your Boston networking...
          </div>
        </div>
      </ScrollArea>
      
      {/* Enhanced conversational input */}
      <div className="border-t border-border bg-muted/30 p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about people, events, or companies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                // Handle send
                console.log("Send:", input);
                setInput("");
              }
            }}
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

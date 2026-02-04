"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Header } from "./header";
import { ConversationalInterface } from "../conversational/conversational-interface";
import { StructuredInterface } from "../structured/structured-interface";

export function MainLayout() {
  const [conversationalSize, setConversationalSize] = useState(60);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1"
        onLayout={(sizes) => {
          setConversationalSize(sizes[0]);
        }}
      >
        <ResizablePanel
          defaultSize={60}
          minSize={30}
          maxSize={80}
          className="flex flex-col"
        >
          <ConversationalInterface />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel
          defaultSize={40}
          minSize={20}
          maxSize={70}
          className="flex flex-col"
        >
          <StructuredInterface />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

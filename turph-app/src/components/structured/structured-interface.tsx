"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Calendar, 
  Building2, 
  LayoutDashboard,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

type View = "dashboard" | "people" | "events" | "companies" | "interactions";

export function StructuredInterface() {
  const [activeView, setActiveView] = useState<View>("dashboard");

  const navItems: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: "dashboard", icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
    { id: "people", icon: <Users className="h-4 w-4" />, label: "People" },
    { id: "events", icon: <Calendar className="h-4 w-4" />, label: "Events" },
    { id: "companies", icon: <Building2 className="h-4 w-4" />, label: "Companies" },
    { id: "interactions", icon: <MessageSquare className="h-4 w-4" />, label: "Interactions" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Navigation */}
      <div className="border-b border-border p-2">
        <div className="flex gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveView(item.id)}
              className={cn(
                "flex-1 flex items-center gap-2",
                activeView === item.id && "bg-secondary"
              )}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* View Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {activeView === "dashboard" && <DashboardView />}
          {activeView === "people" && <PeopleView />}
          {activeView === "events" && <EventsView />}
          {activeView === "companies" && <CompaniesView />}
          {activeView === "interactions" && <InteractionsView />}
        </div>
      </ScrollArea>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground">Quick Stats</div>
          <div className="mt-2 text-2xl font-bold">Coming soon...</div>
        </div>
      </div>
    </div>
  );
}

function PeopleView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">People</h2>
        <Button size="sm">Add Person</Button>
      </div>
      <div className="text-sm text-muted-foreground">
        No people added yet. Start building your network!
      </div>
    </div>
  );
}

function EventsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Events</h2>
        <Button size="sm">Add Event</Button>
      </div>
      <div className="text-sm text-muted-foreground">
        No events tracked yet. Add upcoming networking events!
      </div>
    </div>
  );
}

function CompaniesView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Companies</h2>
        <Button size="sm">Add Company</Button>
      </div>
      <div className="text-sm text-muted-foreground">
        No companies added yet. Track companies in your network!
      </div>
    </div>
  );
}

function InteractionsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Interactions</h2>
        <Button size="sm">Log Interaction</Button>
      </div>
      <div className="text-sm text-muted-foreground">
        No interactions logged yet. Track your conversations and follow-ups!
      </div>
    </div>
  );
}

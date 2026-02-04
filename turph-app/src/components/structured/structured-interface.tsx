"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Calendar, 
  Building2, 
  LayoutDashboard,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardView } from "./views/dashboard-view";
import { PeopleView } from "./views/people-view";
import { EventsView } from "./views/events-view";
import { CompaniesView } from "./views/companies-view";
import { InteractionsView } from "./views/interactions-view";

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
        {activeView === "dashboard" && <DashboardView />}
        {activeView === "people" && <PeopleView />}
        {activeView === "events" && <EventsView />}
        {activeView === "companies" && <CompaniesView />}
        {activeView === "interactions" && <InteractionsView />}
      </ScrollArea>
    </div>
  );
}

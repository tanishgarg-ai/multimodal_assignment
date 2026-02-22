import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Bell, Bot, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const scheduleData = [
  { day: 1, events: [
    { time: "9:00 AM", title: "Opening Ceremony", venue: "Main Auditorium", cat: "Ceremony" },
    { time: "11:00 AM", title: "CodeStorm", venue: "Lab Block A", cat: "Coding" },
    { time: "2:00 PM", title: "RoboWars Qualifiers", venue: "Sports Arena", cat: "Robotics" },
    { time: "4:00 PM", title: "DesignX Workshop", venue: "Design Lab", cat: "Design" },
    { time: "7:00 PM", title: "Cultural Night", venue: "Open Amphitheatre", cat: "Cultural" },
  ]},
  { day: 2, events: [
    { time: "10:00 AM", title: "HackIngenium Kickoff", venue: "Innovation Hub", cat: "Hackathon" },
    { time: "11:00 AM", title: "AI Quest", venue: "Lab Block B", cat: "Coding" },
    { time: "2:00 PM", title: "DroneRace", venue: "Open Ground", cat: "Robotics" },
    { time: "3:00 PM", title: "GameJam", venue: "Gaming Lounge", cat: "Gaming" },
    { time: "6:00 PM", title: "DJ Night", venue: "Central Stage", cat: "Cultural" },
  ]},
  { day: 3, events: [
    { time: "10:00 AM", title: "Finals — All Events", venue: "Multiple Venues", cat: "Finals" },
    { time: "2:00 PM", title: "RoboWars Finals", venue: "Sports Arena", cat: "Robotics" },
    { time: "4:00 PM", title: "HackIngenium Demos", venue: "Innovation Hub", cat: "Hackathon" },
    { time: "5:00 PM", title: "Prize Distribution", venue: "Main Auditorium", cat: "Ceremony" },
    { time: "7:00 PM", title: "Closing Ceremony", venue: "Main Auditorium", cat: "Ceremony" },
  ]},
];

const announcements = [
  { id: "1", title: "Early Bird Registration Ends Feb 28!", priority: "high" as const, time: "2 hours ago" },
  { id: "2", title: "Accommodation booking now open", priority: "medium" as const, time: "5 hours ago" },
  { id: "3", title: "HackIngenium theme revealed March 1", priority: "low" as const, time: "1 day ago" },
  { id: "4", title: "Campus shuttle routes published", priority: "low" as const, time: "2 days ago" },
];

const Dashboard = () => {
  const [activeDay, setActiveDay] = useState(1);

  const priorityColors = {
    high: "bg-destructive/20 text-destructive",
    medium: "bg-yellow-500/20 text-yellow-400",
    low: "bg-secondary/20 text-secondary",
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card/80 backdrop-blur-xl">
        <Link to="/chat" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-sm font-semibold tracking-wider">DASHBOARD</h1>
          <p className="text-xs text-muted-foreground">Ingenium 2026 • March 13–15</p>
        </div>
        <Link to="/chat">
          <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5">
            <Bot size={14} /> Ask AI
          </Button>
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Events", value: "12+", icon: Calendar },
            { label: "Days", value: "3", icon: Clock },
            { label: "Prize Pool", value: "₹10L+", icon: Bell },
            { label: "Venues", value: "8", icon: MapPin },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label} className="bg-card border-border box-glow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Icon size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Schedule */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-base tracking-wider flex items-center gap-2">
              <Calendar size={18} className="text-secondary" /> SCHEDULE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={activeDay === d ? "default" : "outline"}
                  onClick={() => setActiveDay(d)}
                  className={activeDay === d ? "gradient-primary text-primary-foreground" : "border-border text-muted-foreground"}
                >
                  Day {d}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {scheduleData
                .find((s) => s.day === activeDay)
                ?.events.map((ev, i) => (
                  <motion.div
                    key={ev.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors"
                  >
                    <span className="text-xs text-secondary font-mono w-[72px] shrink-0">{ev.time}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{ev.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={10} /> {ev.venue}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                      {ev.cat}
                    </span>
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-base tracking-wider flex items-center gap-2">
              <Bell size={18} className="text-secondary" /> ANNOUNCEMENTS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors cursor-pointer"
              >
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${priorityColors[a.priority]}`}>
                  {a.priority}
                </span>
                <p className="text-sm flex-1 truncate">{a.title}</p>
                <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

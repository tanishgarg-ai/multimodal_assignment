import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";

const schedule = {
  day1: [
    { time: "09:00 AM", title: "Opening Ceremony", desc: "Inauguration & keynote address" },
    { time: "10:30 AM", title: "HackIngenium Kickoff", desc: "36-hour hackathon begins" },
    { time: "12:00 PM", title: "RoboWars Qualifiers", desc: "Bot battle qualifiers round 1" },
    { time: "02:00 PM", title: "CodeStorm Round 1", desc: "Competitive programming begins" },
    { time: "04:00 PM", title: "Workshop: AI/ML", desc: "Hands-on AI workshop by industry experts" },
    { time: "07:00 PM", title: "Cultural Night", desc: "Live music & entertainment" },
  ],
  day2: [
    { time: "09:00 AM", title: "DesignX Sprint", desc: "UI/UX design challenge" },
    { time: "11:00 AM", title: "RoboWars Semi-Finals", desc: "Top bots clash" },
    { time: "01:00 PM", title: "Tech Talks", desc: "Speakers on blockchain & cybersecurity" },
    { time: "03:00 PM", title: "GameJam Begins", desc: "48-hour game development challenge" },
    { time: "05:00 PM", title: "Circuit Rush", desc: "Electronics prototyping challenge" },
    { time: "08:00 PM", title: "Stand-up Comedy Night", desc: "Laugh out loud with top comics" },
  ],
  day3: [
    { time: "09:00 AM", title: "CodeStorm Finals", desc: "Final round of competitive coding" },
    { time: "11:00 AM", title: "HackIngenium Demos", desc: "Hackathon project presentations" },
    { time: "01:00 PM", title: "RoboWars Finals", desc: "Grand bot battle finale" },
    { time: "03:00 PM", title: "Panel Discussion", desc: "Future of tech in India" },
    { time: "05:00 PM", title: "Awards Ceremony", desc: "Prize distribution & recognition" },
    { time: "07:00 PM", title: "Closing Concert", desc: "Star night performance" },
  ],
};

const TimelineItem = ({ item, index }: { item: { time: string; title: string; desc: string }; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06 }}
    className="flex gap-4 group"
  >
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-secondary group-hover:shadow-[0_0_12px] group-hover:shadow-secondary transition-shadow" />
      {index < 5 && <div className="w-px flex-1 bg-border" />}
    </div>
    <div className="pb-8">
      <div className="flex items-center gap-2 mb-1">
        <Clock size={14} className="text-secondary" />
        <span className="text-sm text-secondary font-medium">{item.time}</span>
      </div>
      <h4 className="font-display text-base font-semibold">{item.title}</h4>
      <p className="text-muted-foreground text-sm">{item.desc}</p>
    </div>
  </motion.div>
);

const ScheduleSection = () => {
  return (
    <section id="schedule" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-glow mb-12"
        >
          Event Schedule
        </motion.h2>

        <Tabs defaultValue="day1" className="max-w-2xl mx-auto">
          <TabsList className="w-full bg-card border-glow mb-8">
            <TabsTrigger value="day1" className="flex-1 font-display data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              Day 1 — Mar 13
            </TabsTrigger>
            <TabsTrigger value="day2" className="flex-1 font-display data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              Day 2 — Mar 14
            </TabsTrigger>
            <TabsTrigger value="day3" className="flex-1 font-display data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              Day 3 — Mar 15
            </TabsTrigger>
          </TabsList>

          {Object.entries(schedule).map(([day, items]) => (
            <TabsContent key={day} value={day}>
              <div className="space-y-0">
                {items.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ScheduleSection;

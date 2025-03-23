
import { Activity, Heart, HeartPulse, Clock } from "lucide-react";
import StatCard from "./StatCard";
import ECGChart from "./ECGChart";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Monitor your heart's activity at a glance
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Average Heart Rate"
          value="72 bpm"
          icon={<Heart className="h-4 w-4" />}
          description="Resting heart rate"
          trend={{ value: 2, label: "from last week", isPositive: false }}
        />
        <StatCard
          title="Latest ECG"
          value="Normal"
          icon={<HeartPulse className="h-4 w-4" />}
          description="Recorded 2 hours ago"
        />
        <StatCard
          title="Activity Level"
          value="Moderate"
          icon={<Activity className="h-4 w-4" />}
          trend={{ value: 5, label: "from last week", isPositive: true }}
        />
        <StatCard
          title="Monitoring Time"
          value="126 hrs"
          icon={<Clock className="h-4 w-4" />}
          description="Total time tracked"
        />
      </div>

      <ECGChart />
    </div>
  );
};

export default Dashboard;


import { format } from "date-fns";
import { ArrowLeft, Heart, Activity, Info, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Reading } from "./ReadingList";

// Generate a simple ECG sample pattern
const createEcgData = (points = 150, baseValue = 1, noiseLevel = 0.1) => {
  const data = [];
  for (let i = 0; i < points; i++) {
    // Add a heart beat pattern (P-QRS-T) every 40 points
    let value = baseValue + (Math.random() * noiseLevel - noiseLevel / 2);
    
    const position = i % 40;
    // P wave
    if (position === 5) value += 0.5;
    // QRS complex
    else if (position === 10) value -= 0.8;
    else if (position === 12) value += 2;
    else if (position === 14) value -= 0.8;
    // T wave
    else if (position === 20) value += 0.7;
    
    data.push({ x: i, y: value });
  }
  return data;
};

const formatEcgType = (type: string) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getEcgBadgeVariant = (type: string) => {
  switch (type) {
    case "normal":
      return "default";
    case "sinus_tachycardia":
    case "sinus_bradycardia":
      return "secondary";
    case "afib":
      return "destructive";
    default:
      return "outline";
  }
};

interface ReadingDetailProps {
  reading: Reading;
  onBack?: () => void;
}

const ReadingDetail = ({ reading, onBack }: ReadingDetailProps) => {
  const ecgData = createEcgData(
    150,
    1,
    reading.ecgType === "afib" ? 0.4 : 0.1
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8"
        >
          <Link to="/readings" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reading Details</h1>
          <p className="text-muted-foreground">
            {format(reading.date, "EEEE, MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Heart className="mr-2 h-5 w-5 text-primary" />
              Heart Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
                <p className="text-2xl font-bold">{reading.heartRate} <span className="text-base font-normal text-muted-foreground">bpm</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">ECG Type</p>
                <Badge 
                  variant={getEcgBadgeVariant(reading.ecgType) as any}
                  className="text-sm font-medium mt-1"
                >
                  {formatEcgType(reading.ecgType)}
                </Badge>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Blood Pressure</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">{reading.systolic}/{reading.diastolic}</p>
                <p className="ml-2 text-muted-foreground">mmHg</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {reading.systolic < 120 && reading.diastolic < 80
                  ? "Normal"
                  : reading.systolic < 130 && reading.diastolic < 85
                  ? "Elevated"
                  : "High"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              ECG Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 w-full overflow-hidden relative">
              <svg className="w-full h-full" viewBox="0 0 150 50">
                <defs>
                  <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary) / 0.6)" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 10}
                    x2="150"
                    y2={i * 10}
                    stroke="hsl(var(--muted))"
                    strokeWidth="0.2"
                  />
                ))}
                
                {Array.from({ length: 16 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 10}
                    y1="0"
                    x2={i * 10}
                    y2="50"
                    stroke="hsl(var(--muted))"
                    strokeWidth="0.2"
                  />
                ))}
                
                {/* ECG line */}
                <path
                  d={`M${ecgData.map(point => `${point.x},${25 - point.y * 10}`).join(' L')}`}
                  fill="none"
                  stroke="url(#ecgGradient)"
                  strokeWidth="1.5"
                  className="animate-pulse-subtle"
                />
              </svg>
              
              <div className="absolute bottom-0 right-0 bg-gradient-to-l from-background to-transparent w-20 h-full"></div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Recorded at {format(reading.date, "h:mm a")}
          </CardFooter>
        </Card>
      </div>

      {reading.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Info className="mr-2 h-5 w-5 text-primary" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-line">{reading.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReadingDetail;

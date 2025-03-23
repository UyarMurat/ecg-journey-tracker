
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReadingDetail from "@/components/readings/ReadingDetail";
import { Reading } from "@/components/readings/ReadingList";

// Sample data for demonstration
const SAMPLE_READINGS: Record<string, Reading> = {
  "r1": {
    id: "r1",
    date: new Date(2023, 6, 15, 8, 30),
    heartRate: 72,
    ecgType: "normal",
    systolic: 120,
    diastolic: 80,
    notes: "Morning reading, fasting",
  },
  "r2": {
    id: "r2",
    date: new Date(2023, 6, 14, 19, 15),
    heartRate: 78,
    ecgType: "normal",
    systolic: 124,
    diastolic: 82,
    notes: "After dinner",
  },
  "r3": {
    id: "r3",
    date: new Date(2023, 6, 13, 15, 0),
    heartRate: 88,
    ecgType: "sinus_tachycardia",
    systolic: 130,
    diastolic: 85,
    notes: "After exercise",
  },
  "r4": {
    id: "r4",
    date: new Date(2023, 6, 12, 9, 45),
    heartRate: 68,
    ecgType: "normal",
    systolic: 118,
    diastolic: 79,
  },
  "r5": {
    id: "r5",
    date: new Date(2023, 6, 11, 22, 30),
    heartRate: 65,
    ecgType: "sinus_bradycardia",
    systolic: 115,
    diastolic: 75,
    notes: "Before sleep, relaxed",
  },
};

const ReadingViewPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch this from an API
  const reading = id ? SAMPLE_READINGS[id] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-24 pb-16">
        {reading ? (
          <ReadingDetail reading={reading} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-xl font-semibold">Reading not found</h2>
            <p className="text-muted-foreground">
              The reading you are looking for does not exist
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ReadingViewPage;

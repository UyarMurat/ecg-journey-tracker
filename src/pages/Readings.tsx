
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReadingList from "@/components/readings/ReadingList";
import ReadingForm from "@/components/readings/ReadingForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, List } from "lucide-react";
import { ReadingFormData } from "@/components/readings/ReadingForm";

const ReadingsPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (data: ReadingFormData) => {
    console.log("New reading:", data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-24 pb-16">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ECG Readings</h1>
              <p className="text-muted-foreground">
                View and manage your historical ECG records
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="shrink-0"
            >
              {showForm ? (
                <>
                  <List className="mr-2 h-4 w-4" />
                  View Readings
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Reading
                </>
              )}
            </Button>
          </div>

          {showForm ? (
            <ReadingForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <ReadingList />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReadingsPage;

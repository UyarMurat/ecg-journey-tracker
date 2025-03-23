
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReadingFormProps {
  onSubmit: (data: ReadingFormData) => void;
  onCancel?: () => void;
}

export interface ReadingFormData {
  date: Date;
  heartRate: number;
  ecgType: string;
  systolic: number;
  diastolic: number;
  notes: string;
}

const ReadingForm = ({ onSubmit, onCancel }: ReadingFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReadingFormData>({
    defaultValues: {
      date: new Date(),
      heartRate: 72,
      ecgType: "normal",
      systolic: 120,
      diastolic: 80,
      notes: "",
    },
  });

  const onFormSubmit = (data: ReadingFormData) => {
    // Add the selected date to the form data
    const submissionData = {
      ...data,
      date,
    };
    
    // Simulate API call delay
    setTimeout(() => {
      onSubmit(submissionData);
      toast.success("Reading recorded successfully");
      reset();
    }, 500);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Record New Reading</CardTitle>
        <CardDescription>Enter your latest ECG and heart metrics</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date and Time</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal flex-1",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button type="button" variant="outline" className="px-3" disabled>
                <Clock className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
              <Input
                id="heartRate"
                type="number"
                {...register("heartRate", {
                  required: "Required",
                  min: { value: 30, message: "Too low" },
                  max: { value: 220, message: "Too high" },
                })}
              />
              {errors.heartRate && (
                <p className="text-xs text-destructive">{errors.heartRate.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ecgType">ECG Type</Label>
              <Select defaultValue="normal" {...register("ecgType")}>
                <SelectTrigger id="ecgType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="sinus_tachycardia">Sinus Tachycardia</SelectItem>
                  <SelectItem value="sinus_bradycardia">Sinus Bradycardia</SelectItem>
                  <SelectItem value="afib">Atrial Fibrillation</SelectItem>
                  <SelectItem value="pvc">PVC</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="systolic">Systolic (mmHg)</Label>
              <Input
                id="systolic"
                type="number"
                {...register("systolic", {
                  required: "Required",
                  min: { value: 70, message: "Too low" },
                  max: { value: 220, message: "Too high" },
                })}
              />
              {errors.systolic && (
                <p className="text-xs text-destructive">{errors.systolic.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
              <Input
                id="diastolic"
                type="number"
                {...register("diastolic", {
                  required: "Required",
                  min: { value: 40, message: "Too low" },
                  max: { value: 130, message: "Too high" },
                })}
              />
              {errors.diastolic && (
                <p className="text-xs text-destructive">{errors.diastolic.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Any additional observations..."
              className="resize-none"
              {...register("notes")}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting} className="ml-auto">
            {isSubmitting ? "Saving..." : "Save Reading"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ReadingForm;

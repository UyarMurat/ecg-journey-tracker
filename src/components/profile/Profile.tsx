
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon, User, Save, UserCog } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ProfileFormData {
  name: string;
  email: string;
  sex: string;
  height: string;
  weight: string;
  conditions: string;
  medications: string;
  notifications: boolean;
  dataSharing: boolean;
}

const Profile = () => {
  const [date, setDate] = useState<Date>(new Date(1990, 0, 1));
  const [activeTab, setActiveTab] = useState("personal");
  
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      sex: "male",
      height: "175",
      weight: "70",
      conditions: "None",
      medications: "None",
      notifications: true,
      dataSharing: false,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    // Simulate API call
    setTimeout(() => {
      console.log("Profile data:", { ...data, dateOfBirth: date });
      toast.success("Profile updated successfully");
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Personal Info</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register("name", { required: true })} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      {...register("email", { required: true })} 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="dob"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
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
                          fromYear={1920}
                          toYear={new Date().getFullYear() - 10}
                          captionLayout="dropdown-buttons"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                    <Select defaultValue="male" {...register("sex")}>
                      <SelectTrigger id="sex">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      {...register("height")} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      {...register("weight")} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="conditions">Medical Conditions</Label>
                  <Input 
                    id="conditions" 
                    {...register("conditions")} 
                    placeholder="List any existing medical conditions" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Input 
                    id="medications" 
                    {...register("medications")} 
                    placeholder="List any medications you're currently taking" 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Manage your app settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for important health events
                    </p>
                  </div>
                  <Switch 
                    id="notifications"
                    {...register("notifications")}
                    defaultChecked
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dataSharing">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymous data use for research
                    </p>
                  </div>
                  <Switch 
                    id="dataSharing"
                    {...register("dataSharing")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="mt-6"
              disabled={!isDirty && activeTab === "personal"} 
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default Profile;


import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Heart,
  ArrowUpDown,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface Reading {
  id: string;
  date: Date;
  heartRate: number;
  ecgType: string;
  systolic: number;
  diastolic: number;
  notes?: string;
}

// Sample data for demonstration
const SAMPLE_READINGS: Reading[] = [
  {
    id: "r1",
    date: new Date(2023, 6, 15, 8, 30),
    heartRate: 72,
    ecgType: "normal",
    systolic: 120,
    diastolic: 80,
    notes: "Morning reading, fasting",
  },
  {
    id: "r2",
    date: new Date(2023, 6, 14, 19, 15),
    heartRate: 78,
    ecgType: "normal",
    systolic: 124,
    diastolic: 82,
    notes: "After dinner",
  },
  {
    id: "r3",
    date: new Date(2023, 6, 13, 15, 0),
    heartRate: 88,
    ecgType: "sinus_tachycardia",
    systolic: 130,
    diastolic: 85,
    notes: "After exercise",
  },
  {
    id: "r4",
    date: new Date(2023, 6, 12, 9, 45),
    heartRate: 68,
    ecgType: "normal",
    systolic: 118,
    diastolic: 79,
  },
  {
    id: "r5",
    date: new Date(2023, 6, 11, 22, 30),
    heartRate: 65,
    ecgType: "sinus_bradycardia",
    systolic: 115,
    diastolic: 75,
    notes: "Before sleep, relaxed",
  },
];

interface ReadingListProps {
  readings?: Reading[];
}

type SortField = "date" | "heartRate" | "ecgType" | "systolic";
type SortDirection = "asc" | "desc";

const ReadingList = ({ readings = SAMPLE_READINGS }: ReadingListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
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

  // Filter and sort readings
  const filteredReadings = [...readings]
    .filter((reading) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      
      return (
        format(reading.date, "PPP").toLowerCase().includes(searchLower) ||
        reading.ecgType.toLowerCase().includes(searchLower) ||
        reading.heartRate.toString().includes(searchLower) ||
        (reading.notes?.toLowerCase().includes(searchLower) || false)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case "date":
          comparison = a.date.getTime() - b.date.getTime();
          break;
        case "heartRate":
          comparison = a.heartRate - b.heartRate;
          break;
        case "ecgType":
          comparison = a.ecgType.localeCompare(b.ecgType);
          break;
        case "systolic":
          comparison = a.systolic - b.systolic;
          break;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search readings..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSearchTerm("normal")}>
                Normal ECG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("sinus")}>
                Sinus Rhythms
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("afib")}>
                Atrial Fibrillation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("")}>
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[180px] cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleSort("date")}
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Date & Time
                  {getSortIcon("date")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleSort("heartRate")}
              >
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Heart Rate
                  {getSortIcon("heartRate")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleSort("ecgType")}
              >
                <div className="flex items-center">
                  ECG Type
                  {getSortIcon("ecgType")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                onClick={() => toggleSort("systolic")}
              >
                <div className="flex items-center justify-end">
                  BP (mmHg)
                  {getSortIcon("systolic")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReadings.length > 0 ? (
              filteredReadings.map((reading) => (
                <TableRow
                  key={reading.id}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    <Link
                      to={`/readings/${reading.id}`}
                      className="block transition-colors group-hover:text-primary"
                    >
                      {format(reading.date, "PPP")}
                      <div className="text-sm text-muted-foreground">
                        {format(reading.date, "p")}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-medium">{reading.heartRate}</span>
                      <span className="text-muted-foreground ml-1">bpm</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getEcgBadgeVariant(reading.ecgType) as any}>
                      {formatEcgType(reading.ecgType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {reading.systolic}/{reading.diastolic}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8 mb-2 opacity-50" />
                    <p>No readings found</p>
                    <p className="text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReadingList;

import * as React from "react";
import { addDays, format, isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { rentGame, RentalFormData } from "@/actions/rent-game";
import { useParams } from "react-router-dom";

const formSchema = z
  .object({
    startDate: z.date().min(new Date(), "Start date cannot be in the past."),
    startTime: z.string(),
    endDate: z.date(),
    endTime: z.string(),
    quantity: z
      .string()
      .refine(
        (val) => parseInt(val) > 0 && parseInt(val) <= 5,
        "Quantity must be between 1 and 5."
      ),
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be after start date.",
      });
    }
    if (
      isSameDay(data.startDate, data.endDate) &&
      parseInt(data.endTime) <= parseInt(data.startTime)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endTime"],
        message: "End time must be after start time on the same day.",
      });
    }
  });
type FormData = z.infer<typeof formSchema>;

export default function GameRentalDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [submissionState, setSubmissionState] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const { gameId } = useParams<{ gameId: string }>();

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      startTime: "12",
      endDate: addDays(new Date(), 1),
      endTime: "12",
      quantity: "1",
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    if (!gameId) {
      toast({
        title: "Error",
        description: "Game ID is {missing} or invalid.",
        variant: "destructive",
      });
      return;
    }

    const formattedStartTime = `${data.startTime}:00:00`;
    const formattedEndTime = `${data.endTime}:00:00`;
    const formattedStartDate = `${format(
      data.startDate,
      "yyyy-MM-dd"
    )}T00:00:00`;
    const formattedEndDate = `${format(data.endDate, "yyyy-MM-dd")}T00:00:00`;

    const formData: RentalFormData = {
      gameId,
      startDate: formattedStartDate,
      startTime: formattedStartTime,
      endDate: formattedEndDate,
      endTime: formattedEndTime,
      quantity: parseInt(data.quantity, 10),
    };
    console.log(formData);
    const result = await rentGame(formData);
    setSubmissionState(result);
    console.log(result);
    if (result.success) {
      toast({
        title: "Success!",
        description: `Your rental for Game ID: ${gameId} has been successfully submitted!`,
        variant: "default",
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Error:",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setValue("startDate", date);
      if (!endDate || endDate < date) {
        setValue("endDate", date);
      }
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && startDate && date >= startDate) {
      setValue("endDate", date);
    }
  };

  const isEndTimeValid = (hour: string) => {
    if (isSameDay(startDate, endDate)) {
      return parseInt(hour) > parseInt(startTime);
    }
    return true;
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const showToast = () => {
    if (submissionState) {
      const startDateFormatted = format(startDate, "PPP");
      const endDateFormatted = format(endDate, "PPP");
      const startTimeFormatted = `${startTime}:00`;
      const endTimeFormatted = `${endTime}:00`;
      const description = `From ${startDateFormatted} at ${startTimeFormatted} to ${endDateFormatted} at ${endTimeFormatted}`;
      toast({
        title: submissionState.success ? "Success!" : "Error",
        description: `${submissionState.message} - ${description}`,
        variant: submissionState.success ? "default" : "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Rent a Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rent a Game</DialogTitle>
          <DialogDescription>
            Choose your rental dates, times, and quantity. Same-day rentals are
            allowed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">
                From
              </Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="start-date"
                        variant={"outlineSecondary"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handleStartDateSelect(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-hour" className="text-right">
                Time
              </Label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">
                To
              </Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="end-date"
                        variant={"outlineSecondary"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handleEndDateSelect(date);
                        }}
                        disabled={(date) => date < startDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-hour" className="text-right">
                Time
              </Label>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((hour) => (
                        <SelectItem
                          key={hour}
                          value={hour}
                          disabled={!isEndTimeValid(hour)}
                        >
                          {hour}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={showToast}>
              Rent Game
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { useEffect } from "react";
import { isSameDay } from "date-fns";
import { UseFormSetValue } from "react-hook-form";

// Define a specific type for the form data
interface FormData {
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
    quantity: string;
}

export interface UseAdjustEndTimeParams {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  setValue: UseFormSetValue<FormData>;
}

export function useAdjustEndTime({
  startDate,
  endDate,
  startTime,
  endTime,
  setValue,
}: UseAdjustEndTimeParams) {
  useEffect(() => {
    if (isSameDay(startDate, endDate)) {
      const startTimeInt = parseInt(startTime, 10);
      const endTimeInt = parseInt(endTime, 10);

      if (endTimeInt <= startTimeInt) {
        const newEndTime = (startTimeInt + 1) % 24; 
        setValue("endTime", newEndTime.toString().padStart(2, "0"));
      }
    }
  }, [startDate, endDate, startTime, endTime, setValue]);
}

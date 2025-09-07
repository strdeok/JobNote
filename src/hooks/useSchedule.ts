import { fetchAllSchedules } from "@/lib/schedule";
import { useQuery } from "@tanstack/react-query";

export const useSchedule = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => fetchAllSchedules(startDate, endDate),
  });
};

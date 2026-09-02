import { useQuery } from "@tanstack/react-query";
import type { PeriodKey } from "@/types";
import { fetchDashboardData, fetchNotifications } from "@/lib/api/dashboard";

export function useDashboardData(period: PeriodKey) {
  return useQuery({
    queryKey: ["dashboard", period],
    queryFn: () => fetchDashboardData(period),
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createModuleRow, fetchModuleData, fetchModuleDefinitions } from "@/lib/api/modules";

export function useModuleDefinitions() {
  return useQuery({
    queryKey: ["module-definitions"],
    queryFn: fetchModuleDefinitions,
  });
}

export function useModuleData(key: string) {
  return useQuery({
    queryKey: ["module", key],
    queryFn: () => fetchModuleData(key),
    enabled: Boolean(key),
  });
}

export function useCreateModuleRow(key: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => createModuleRow(key, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module", key] });
    },
  });
}

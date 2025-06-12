import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SelectedProjectProps } from "@/types/Project";

export const useGetProjectByID = (projectId: string | undefined) => {
  return useQuery<SelectedProjectProps, AxiosError>({
    queryKey: ["project", { projectId }],
    retry: 3,
    enabled: !!projectId,
    // staleTime: 5 * 60 * 1000, // data is fresh for 5 min
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/projects/${projectId}`);
        return res.data;
      } catch (e: unknown) {
        toast.error("Something went wrong, try again later.");
        throw new Error("Unknown error", { cause: e });
      }
    },
  });
};

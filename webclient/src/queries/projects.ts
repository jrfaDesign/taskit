import { ProjectProps } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetProjects = () => {
  return useQuery<ProjectProps[], AxiosError>({
    queryKey: ["projects"],
    retry: 3,
    enabled: true,
    staleTime: 5 * 60 * 1000, // data is fresh for 5 min
    queryFn: async () => {
      try {
        const res = await axios.get("/api/projects");
        return res.data;
      } catch (e: unknown) {
        toast.error("Something went wrong, try again later.");
        throw new Error("Unknown error", { cause: e });
      }
    },
  });
};

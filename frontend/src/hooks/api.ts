import { getCurrentUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });
};

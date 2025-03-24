import { fetchMessages } from "@/app/actions/chat";
import { useQuery } from "@tanstack/react-query";

export const useMessages = ({ username }: { username: string }) => {
  return useQuery({
    queryKey: ["messages", username],
    queryFn: async () => await fetchMessages({ username }),
  });
};

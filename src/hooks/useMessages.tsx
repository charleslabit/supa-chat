import { fetchMessages } from "@/app/actions/chat";
import { supabase } from "@/lib/supabase";
import { Message } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useMessages = ({ username }: { username: string }) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messages", username],
    queryFn: async () => await fetchMessages({ username }),
  });

  useEffect(() => {
    const channel = supabase
      .channel("messages_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          // ✅ Type assertion to ensure payload.new is a Message
          const newMessage = payload.new as Message;

          queryClient.setQueryData<Message[]>(
            ["messages", username],
            (oldMessages = []) => {
              return [...oldMessages, newMessage]; // Append new message
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, username]);

  return query;
};

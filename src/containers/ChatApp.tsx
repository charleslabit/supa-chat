"use client";
import { ChatSidebar } from "@/components/ChatSideBar";
import { ChatWindow } from "@/components/ChatWindow";
import { useMessages } from "@/hooks/useMessages";
import { Message } from "@/types";
import { Grid } from "@mantine/core";
import { useMemo, useState } from "react";

export const ChatApp = () => {
  const [userName] = useState("Guest");
  const { data: messages = [], isLoading } = useMessages({
    username: userName,
  });

  // Get all unique users
  const uniqueUsernames = [...new Set(messages.map((msg) => msg.sender_name))];

  const uniqueUserMessages = useMemo(() => {
    return uniqueUsernames.reduce(
      (acc: Record<string, Message[]>, username: string) => {
        acc[username] = messages
          .filter((msg) =>
            username === userName
              ? msg.sender_name === username && msg.user_name === username
              : msg.sender_name === username || msg.user_name === username
          )
          .sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );
        return acc;
      },
      {} as Record<string, Message[]>
    );
  }, [messages, userName]);

  return (
    <Grid gutter={0}>
      {/* Sidebar for Recent Chats */}
      <Grid.Col span="content" bg="#252728">
        <ChatSidebar messages={uniqueUserMessages} isLoading={isLoading} />
      </Grid.Col>

      {/* Main Chat Window */}
      <Grid.Col span="auto">
        <ChatWindow messages={uniqueUserMessages} isLoading={isLoading} />
      </Grid.Col>
    </Grid>
  );
};

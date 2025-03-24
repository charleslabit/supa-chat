"use client";
import { selectedUserAtom, usernameAtom } from "@/store";
import { Message } from "@/types";
import { formatChatTimestamp } from "@/util";
import {
  Box,
  Card,
  Group,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconMoodBoy } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import classes from "./ChatApp.module.css";
import { ChatBGAnimate } from "./ChatBGAnimate";
import { MessageInput } from "./MessageInput";

interface ChatWindowProps {
  messages: Record<string, Message[]>;
  isLoading: boolean;
}

export const ChatWindow = ({ messages, isLoading }: ChatWindowProps) => {
  const [userName] = useAtom(usernameAtom);
  const [selectedUser] = useAtom(selectedUserAtom);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }, [messages]);

  return (
    <Card className={classes.chatBackground}>
      <Group>
        <ThemeIcon variant="transparent">
          <IconMoodBoy />
        </ThemeIcon>
        <Text c="white">{selectedUser}</Text>
      </Group>
      <ChatBGAnimate />

      <ScrollArea h="80vh" p={30} viewportRef={scrollRef}>
        <Stack gap={5}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} height={100} />
              ))
            : Object.entries(messages)
                .filter(
                  ([username]) => !selectedUser || username === selectedUser
                )
                .map(([username, messages]) => (
                  <Box key={username}>
                    {messages.map((msg) => (
                      <Box key={msg.id}>
                        <Group
                          w="100%"
                          justify={
                            msg.sender_name === userName ? "right" : "left"
                          }
                        >
                          {msg.sender_name !== userName && (
                            <ThemeIcon variant="transparent">
                              <IconMoodBoy />
                            </ThemeIcon>
                          )}
                          <Text
                            className={
                              msg.sender_name === userName
                                ? classes.chatBubble
                                : classes.chatBubbleSender
                            }
                          >
                            {msg.content}
                          </Text>
                        </Group>
                        <Group justify="center">
                          <Text c="#D19B97" fz={12}>
                            {formatChatTimestamp(msg.created_at)}
                          </Text>
                        </Group>
                      </Box>
                    ))}
                  </Box>
                ))}
        </Stack>
      </ScrollArea>

      <MessageInput />
    </Card>
  );
};

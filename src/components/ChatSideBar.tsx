"use client";
import { selectedUserAtom, usernameAtom } from "@/store";
import { Message } from "@/types";
import {
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconChevronDown, IconMoodBoy, IconSwitch } from "@tabler/icons-react";
import { useAtom } from "jotai";

interface ChatSideBarProps {
  messages: Record<string, Message[]>;
  isLoading: boolean;
}

export const ChatSidebar = ({ messages, isLoading }: ChatSideBarProps) => {
  const [userName, setUserName] = useAtom(usernameAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

  // Handle account switch
  const handleSwitchAccount = () => {
    const newName = prompt("Enter your new name:")?.trim() || "Guest";
    setUserName(newName);
  };

  return (
    <Box w={400} p="md">
      <Group justify="space-between">
        <Text c="white" fw={500}>
          Chats
        </Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              size="xs"
              variant="outline"
              rightSection={<IconChevronDown size={14} />}
            >
              Signed in as: {userName}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item
              leftSection={<IconSwitch size={14} />}
              onClick={handleSwitchAccount}
            >
              Switch Account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Divider my="sm" />

      {/* Chat Channel */}
      <Stack>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} height={50} radius="sm" />
            ))
          : Object.entries(messages).map(([username, messages]) => {
              const recentMessage = messages[messages.length - 1]; // Get the most recent message
              return (
                <Group
                  key={username}
                  className="cursor-pointer"
                  onClick={() => setSelectedUser(username)}
                  bg={selectedUser === username ? "#24313E" : "transparent"}
                >
                  <ThemeIcon variant="transparent">
                    <IconMoodBoy />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text c="white">{username}</Text>
                    <Text c="white" fz="sm" lineClamp={1}>
                      {recentMessage?.content || "No messages yet"}{" "}
                    </Text>
                  </Stack>
                </Group>
              );
            })}
      </Stack>
    </Box>
  );
};

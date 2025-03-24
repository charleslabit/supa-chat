"use client";
import { sendMessage } from "@/app/actions/chat";
import { selectedUserAtom, usernameAtom } from "@/store";
import { Button, Flex, TextInput } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRef, useState } from "react";

export const MessageInput = () => {
  const queryClient = useQueryClient();
  const [username] = useAtom(usernameAtom);
  const [selectedUser] = useAtom(selectedUserAtom);
  const messageRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleInputChange = () => {
    setMessage(messageRef.current?.value || "");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ message }: { message: string }) =>
      await sendMessage({
        message: message.trim(),
        sender: username,
        user: selectedUser,
      }),
    onSuccess: () => {
      messageRef.current!.value = "";
      queryClient.invalidateQueries({ queryKey: ["messages", username] });
    },
  });

  const handleSend = () => {
    const msg = messageRef.current?.value.trim();
    if (!msg) return;
    mutate({ message: msg });
    messageRef.current!.value = "";
  };

  return (
    <Flex gap="sm">
      <TextInput
        placeholder="Type a message..."
        ref={messageRef}
        onChange={handleInputChange} // Track ref changes
        flex={1}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      {message ? (
        <Button variant="transparent" onClick={handleSend} loading={isPending}>
          <IconSend size={18} />
        </Button>
      ) : (
        <Button
          variant="transparent"
          onClick={() => mutate({ message: "😄" })}
          loading={isPending}
        >
          😄
        </Button>
      )}
    </Flex>
  );
};

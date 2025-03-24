"use server";

import { supabase } from "@/lib/supabase";
import { Message } from "@/types";

// Fetch messages from Supabase
export async function fetchMessages({ username }: { username: string }) {
  console.log("username", username);
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true })
    .or(`user_name.eq.${username},sender_name.eq.${username}`);
  console.log("error", error);
  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
  return data as Message[];
}

// Send a new message
export async function sendMessage({
  user,
  sender,
  message,
}: {
  user: string;
  sender: string;
  message: string;
}) {
  console.log("1", user, sender, message);
  if (!user.trim() || !sender.trim() || !message.trim()) {
    return { error: "User, sender, and message are required" };
  }

  const { error } = await supabase.from("messages").insert([
    {
      user_name: user, // Recipient
      sender_name: sender, // Sender
      content: message,
      is_seen: false,
      seen_by: null, // No one has seen it yet
    },
  ]);

  if (error) {
    console.error("Error sending message:", error);
    return { error: "Failed to send message" };
  }

  return { success: true };
}

export const markMessageAsSeen = async (messageId: string, seenBy: string) => {
  const { data, error } = await supabase
    .from("messages")
    .update({
      is_seen: true,
      seen_by: supabase.rpc("array_append", {
        column_name: "seen_by",
        value: seenBy,
      }),
    })
    .eq("id", messageId);

  if (error) {
    console.error("Error marking message as seen:", error.message);
    return null;
  }

  return data;
};

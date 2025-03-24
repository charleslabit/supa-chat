export interface Message {
  id: string;
  content: string;
  created_at: string; // ISO date string
  is_seen: boolean;
  seen_by: string | null;
  sender_name: string;
  user_name: string;
}

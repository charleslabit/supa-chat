export const formatChatTimestamp = (dateString: string | Date) => {
  const date = new Date(dateString);

  // Handle invalid dates (e.g., when dateString is undefined or not a valid date)
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return "Invalid date"; // Fallback message
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", // "Fri"
    hour: "2-digit", // "12"
    minute: "2-digit", // "39"
    hourCycle: "h23", // 24-hour format (no AM/PM)
  }).format(date);
};

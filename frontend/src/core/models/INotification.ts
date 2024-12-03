export interface INotification {
  id: number;
  unread: boolean;
  description: string;
  timestamp: string;
  verb: string;
  level: "warning" | "info" | "success" | "error";
}

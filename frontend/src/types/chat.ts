export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: "uploading" | "processing" | "ready" | "error";
  progress: number;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  venue: string;
  category: string;
  day: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  priority: "low" | "medium" | "high";
}

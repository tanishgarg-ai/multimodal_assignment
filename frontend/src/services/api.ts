import axios from "axios";
import type { Message, UploadedDocument } from "@/types/chat";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// Retry logic
api.interceptors.response.use(undefined, async (error) => {
  const config = error.config;
  if (!config || config._retryCount >= 2) return Promise.reject(error);
  config._retryCount = (config._retryCount || 0) + 1;
  await new Promise((r) => setTimeout(r, 1000 * config._retryCount));
  return api(config);
});

export async function sendMessage(
  sessionId: string,
  message: string,
  attachments?: File[]
): Promise<Message> {
  if (attachments?.length) {
    const formData = new FormData();
    formData.append("session_id", sessionId);
    formData.append("message", message);
    attachments.forEach((f) => formData.append("files", f));
    const { data } = await api.post("/chat/multimodal", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }
  const { data } = await api.post("/chat", { session_id: sessionId, message });
  return data;
}

export async function uploadDocument(
  file: File,
  onProgress?: (progress: number) => void
): Promise<UploadedDocument> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (e.total && onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });
  return data;
}

export async function getDocuments(): Promise<UploadedDocument[]> {
  const { data } = await api.get("/documents");
  return data;
}

export default api;

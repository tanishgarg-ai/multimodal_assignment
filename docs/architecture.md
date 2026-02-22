# Architecture

## Backend

- **API Layer**: FastAPI endpoints under `/api` with CORS.
- **Agent Layer**: Query understanding, retrieval, multimodal, generation, validation.
- **RAG Layer**: Chunking -> embeddings -> FAISS indexing -> top-k retrieval.
- **LLM Layer**: Ollama client with HTTP fallback.
- **Storage**: SQLite metadata + file uploads + FAISS persistence.

## Frontend

- React (Vite) single-page UI
- Components for chat, uploads, multimodal inputs, admin
- Axios client with API key support

## Data Flow

1) User submits text or multimodal input.
2) Orchestrator merges OCR/transcript context.
3) Retrieval Agent fetches top-k chunks from FAISS.
4) Generation Agent builds prompt and queries Ollama.
5) Validation Agent ensures a safe response.
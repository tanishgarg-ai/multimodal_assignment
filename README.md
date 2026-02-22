# Rabbit Multimodal Fest Platform

A local-first, multimodal RAG platform for college fest Q&A. The stack combines FastAPI + FAISS + Ollama for the backend with a React (Vite) frontend.

## Features

- Text + image + voice interactions
- RAG pipeline with chunking, embeddings, FAISS search
- Multi-agent orchestration
- Local Ollama inference
- Admin API key for protected endpoints
- Container-friendly layout

## Repo Structure

- `backend/` FastAPI backend + agents + RAG pipeline
- `frontend/` React UI
- `scripts/` helper scripts
- `docs/` architecture + API docs
- `sample_data/` sample text for ingestion

## Prerequisites

- Python 3.10+
- Node.js 18+
- Ollama installed and running locally
- Optional: CUDA GPU drivers (if available)

## Quick Start

1) Create virtual environment and install backend dependencies:

```
python -m venv .venv
.\.venv\Scripts\activate
pip install -r backend/requirements.txt
```

2) Start Ollama (example):

```
ollama run mistral
```

3) Run the backend:

```
$env:PYTHONPATH = "backend"
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

4) Start the frontend:

```
cd frontend
npm install
npm run dev
```

5) Open the UI at `http://localhost:5173`.

## Configuration

Copy `.env.example` to `.env` and edit values:

- `OLLAMA_HOST` (default `http://localhost:11434`)
- `OLLAMA_MODEL` (default `mistral`)
- `ADMIN_API_KEY` for admin routes

## API Reference

See `docs/api.md`.

## Sample Data

Use `sample_data/sample_fest_guide.txt` to test ingestion via the upload UI or API.

## GPU Support

CUDA usage is auto-detected by SentenceTransformers and Whisper. If CUDA is available, set your environment accordingly for PyTorch.

## Tests

```
$env:PYTHONPATH = "backend"
pytest backend/tests
```

## Deployment Notes

- The project is container-friendly; you can add Dockerfiles and compose files if needed.
- Persist `backend/data/` for FAISS index and metadata.

## License

MIT
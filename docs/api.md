# API Reference

## Chat

- `POST /api/chat`
  - Body: `{ "query": "..." }`
  - Response: `{ "answer": "...", "context": ["..."] }`

- `POST /api/chat/multimodal`
  - Multipart form: `query`, optional `image`, optional `audio`
  - Response: `{ "answer": "...", "context": ["..."], "multimodal": { ... } }`

## Documents

- `POST /api/documents/upload`
  - Multipart form: `file`
  - Response: `{ "id": 1, "filename": "..." }`

- `GET /api/documents`
  - Response: list of stored documents

- `DELETE /api/documents/{id}`

- `POST /api/reindex`
  - Response: `{ "status": "reindexed" }`

## Admin

- `GET /api/admin/status` (requires `X-API-Key`)
- `GET /api/admin/documents` (requires `X-API-Key`)
from __future__ import annotations

from pathlib import Path
from typing import Iterable

from app.core.config import settings
from app.rag.chunking import chunk_text
from app.rag.embeddings import Embedder
from app.rag.index import FaissIndex, IndexedChunk
from app.storage.repository import create_document
from app.storage.db import SessionLocal


class RagPipeline:
    def __init__(self) -> None:
        self.embedder = Embedder()
        self.index = FaissIndex.load(dim=len(self.embedder.embed(["test"])[0]))

    def ingest_text(self, *, filename: str, content_type: str | None, text: str, path: str | None = None) -> int:
        with SessionLocal() as db:
            doc = create_document(
                db,
                filename=filename,
                content_type=content_type,
                path=path or filename,
            )
            doc_id = doc.id
        chunks = chunk_text(text)
        embeddings = self.embedder.embed([c.text for c in chunks])
        indexed_chunks = [IndexedChunk(doc_id=doc_id, chunk_index=c.index, text=c.text) for c in chunks]
        self.index.add(embeddings, indexed_chunks)
        self.index.save()
        return doc_id

    def ingest_file(self, *, file_path: str, content_type: str | None) -> int:
        text = Path(file_path).read_text(encoding="utf-8", errors="ignore")
        filename = Path(file_path).name
        return self.ingest_text(filename=filename, content_type=content_type, text=text, path=file_path)

    def search(self, query: str, top_k: int | None = None) -> list[IndexedChunk]:
        top_k = top_k or settings.top_k
        embedding = self.embedder.embed([query])[0]
        return self.index.search(embedding, top_k)

    def rebuild(self, documents: Iterable[tuple[int, str]]) -> None:
        self.index = FaissIndex.load(dim=len(self.embedder.embed(["test"])[0]))
        self.index.metadata = []
        self.index.index.reset()
        for doc_id, path in documents:
            text = Path(path).read_text(encoding="utf-8", errors="ignore")
            chunks = chunk_text(text)
            embeddings = self.embedder.embed([c.text for c in chunks])
            indexed_chunks = [IndexedChunk(doc_id=doc_id, chunk_index=c.index, text=c.text) for c in chunks]
            self.index.add(embeddings, indexed_chunks)
        self.index.save()

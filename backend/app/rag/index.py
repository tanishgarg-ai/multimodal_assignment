from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

import numpy as np

from app.core.config import settings


@dataclass
class IndexedChunk:
    doc_id: int
    chunk_index: int
    text: str


class FaissIndex:
    def __init__(self, dim: int) -> None:
        self.dim = dim
        self.index = self._create_index()
        self.metadata: list[IndexedChunk] = []

    def _create_index(self):
        try:
            import faiss

            return faiss.IndexFlatIP(self.dim)
        except Exception as exc:
            raise RuntimeError("FAISS is required for vector indexing") from exc

    def add(self, embeddings: list[list[float]], chunks: list[IndexedChunk]) -> None:
        if not embeddings:
            return
        vecs = np.array(embeddings, dtype="float32")
        self.index.add(vecs)
        self.metadata.extend(chunks)

    def search(self, query_embedding: list[float], top_k: int) -> list[IndexedChunk]:
        if self.index.ntotal == 0:
            return []
        vec = np.array([query_embedding], dtype="float32")
        scores, indices = self.index.search(vec, top_k)
        hits: list[IndexedChunk] = []
        for idx in indices[0]:
            if idx == -1:
                continue
            hits.append(self.metadata[idx])
        return hits

    def save(self) -> None:
        Path(settings.index_dir).mkdir(parents=True, exist_ok=True)
        index_path = Path(settings.index_dir) / "faiss.index"
        meta_path = Path(settings.index_dir) / "faiss_meta.json"
        try:
            import faiss

            faiss.write_index(self.index, str(index_path))
        except Exception as exc:
            raise RuntimeError("Failed to save FAISS index") from exc
        meta_payload = [chunk.__dict__ for chunk in self.metadata]
        meta_path.write_text(json.dumps(meta_payload, ensure_ascii=True, indent=2), encoding="utf-8")

    @classmethod
    def load(cls, dim: int) -> "FaissIndex":
        instance = cls(dim)
        index_path = Path(settings.index_dir) / "faiss.index"
        meta_path = Path(settings.index_dir) / "faiss_meta.json"
        if index_path.exists():
            try:
                import faiss

                instance.index = faiss.read_index(str(index_path))
            except Exception:
                pass
        if meta_path.exists():
            raw = json.loads(meta_path.read_text(encoding="utf-8"))
            instance.metadata = [IndexedChunk(**item) for item in raw]
        return instance
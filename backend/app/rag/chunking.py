from __future__ import annotations

from dataclasses import dataclass

from app.core.config import settings


@dataclass
class TextChunk:
    text: str
    index: int


def chunk_text(text: str) -> list[TextChunk]:
    size = settings.chunk_size
    overlap = settings.chunk_overlap
    chunks: list[TextChunk] = []
    start = 0
    idx = 0
    while start < len(text):
        end = min(start + size, len(text))
        chunk = text[start:end]
        chunks.append(TextChunk(text=chunk, index=idx))
        idx += 1
        start = end - overlap if end - overlap > 0 else end
    return chunks
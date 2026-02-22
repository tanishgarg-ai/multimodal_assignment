from __future__ import annotations

from app.core.config import settings
from app.utils.gpu import detect_device


class Embedder:
    def __init__(self) -> None:
        self.device = detect_device()
        try:
            from sentence_transformers import SentenceTransformer

            self.model = SentenceTransformer(settings.embedding_model, device=self.device)
        except Exception as exc:
            raise RuntimeError("SentenceTransformer is required for embeddings") from exc

    def embed(self, texts: list[str]) -> list[list[float]]:
        embeddings = self.model.encode(texts, normalize_embeddings=True)
        return embeddings.tolist()
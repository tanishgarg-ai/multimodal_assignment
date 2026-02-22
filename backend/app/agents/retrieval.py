from __future__ import annotations

from app.rag.pipeline import RagPipeline


class RetrievalAgent:
    def __init__(self, pipeline: RagPipeline) -> None:
        self.pipeline = pipeline

    def retrieve(self, query: str) -> list[str]:
        chunks = self.pipeline.search(query)
        return [chunk.text for chunk in chunks]
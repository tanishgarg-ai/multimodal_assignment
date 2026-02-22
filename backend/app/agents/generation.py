from __future__ import annotations

from app.llm.ollama import OllamaClient


class GenerationAgent:
    def __init__(self) -> None:
        self.llm = OllamaClient()

    def generate(self, query: str, context: list[str]) -> str:
        return self.llm.generate(query, context=context)
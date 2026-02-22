from __future__ import annotations

from app.agents.generation import GenerationAgent
from app.agents.multimodal import MultimodalAgent
from app.agents.query import QueryUnderstandingAgent
from app.agents.retrieval import RetrievalAgent
from app.agents.validation import ValidationAgent
from app.rag.pipeline import RagPipeline


class AgentOrchestrator:
    def __init__(self) -> None:
        self.pipeline = RagPipeline()
        self.query_agent = QueryUnderstandingAgent()
        self.retrieval_agent = RetrievalAgent(self.pipeline)
        self.multimodal_agent = MultimodalAgent()
        self.generation_agent = GenerationAgent()
        self.validation_agent = ValidationAgent()

    def chat(self, query: str) -> dict:
        analyzed = self.query_agent.analyze(query)
        context = self.retrieval_agent.retrieve(analyzed["query"])
        answer = self.generation_agent.generate(analyzed["query"], context)
        answer = self.validation_agent.validate(answer)
        return {"answer": answer, "context": context}

    def chat_multimodal(self, query: str, image_path: str | None, audio_path: str | None) -> dict:
        multimodal = self.multimodal_agent.handle(image_path=image_path, audio_path=audio_path)
        merged_query = query
        if multimodal.get("ocr_text"):
            merged_query += "\n\nOCR:\n" + multimodal["ocr_text"]
        if multimodal.get("transcript"):
            merged_query += "\n\nTranscript:\n" + multimodal["transcript"]
        analyzed = self.query_agent.analyze(merged_query)
        context = self.retrieval_agent.retrieve(analyzed["query"])
        answer = self.generation_agent.generate(analyzed["query"], context)
        answer = self.validation_agent.validate(answer)
        return {"answer": answer, "context": context, "multimodal": multimodal}
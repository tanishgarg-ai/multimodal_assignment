from __future__ import annotations


class QueryUnderstandingAgent:
    def analyze(self, query: str) -> dict:
        return {"query": query.strip(), "intent": "ask"}
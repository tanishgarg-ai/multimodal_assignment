from __future__ import annotations


class ValidationAgent:
    def validate(self, answer: str) -> str:
        if not answer:
            return "I'm not sure yet. Please add more fest documents or rephrase your question."
        return answer
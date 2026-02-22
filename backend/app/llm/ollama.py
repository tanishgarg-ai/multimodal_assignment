from __future__ import annotations

import json
from typing import Iterable

import httpx

from app.core.config import settings


class OllamaClient:
    def __init__(self) -> None:
        self.host = settings.ollama_host.rstrip("/")
        self.model = settings.ollama_model

    def generate(self, prompt: str, *, context: Iterable[str]) -> str:
        system_prompt = "You are a helpful assistant for a college fest platform."
        full_prompt = f"{system_prompt}\n\nContext:\n" + "\n\n".join(context) + f"\n\nUser: {prompt}\nAssistant:"
        try:
            import ollama

            response = ollama.generate(model=self.model, prompt=full_prompt)
            return response.get("response", "").strip()
        except Exception:
            payload = {"model": self.model, "prompt": full_prompt, "stream": False}
            with httpx.Client(timeout=60) as client:
                resp = client.post(f"{self.host}/api/generate", content=json.dumps(payload))
                resp.raise_for_status()
                data = resp.json()
                return data.get("response", "").strip()
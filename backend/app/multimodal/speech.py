from __future__ import annotations

from pathlib import Path


class SpeechToText:
    def __init__(self) -> None:
        try:
            import whisper

            self.model = whisper.load_model("base")
        except Exception:
            self.model = None

    def transcribe(self, audio_path: str) -> str:
        if not self.model:
            return ""
        result = self.model.transcribe(audio_path)
        return result.get("text", "").strip()


def transcribe_audio(audio_path: str) -> str:
    return SpeechToText().transcribe(audio_path)
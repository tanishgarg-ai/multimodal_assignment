from __future__ import annotations

from app.multimodal.ocr import extract_text_from_image
from app.multimodal.speech import transcribe_audio
from app.multimodal.vision import caption_image


class MultimodalAgent:
    def handle(self, *, image_path: str | None, audio_path: str | None) -> dict:
        result: dict = {}
        if image_path:
            result["ocr_text"] = extract_text_from_image(image_path)
            result["caption"] = caption_image(image_path)
        if audio_path:
            result["transcript"] = transcribe_audio(audio_path)
        return result
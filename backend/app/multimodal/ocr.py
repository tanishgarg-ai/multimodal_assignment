from __future__ import annotations

from pathlib import Path

from PIL import Image


class OCRService:
    def __init__(self) -> None:
        self.reader = None
        try:
            import easyocr

            self.reader = easyocr.Reader(["en"], gpu=False)
        except Exception:
            self.reader = None

    def extract_text(self, image_path: str) -> str:
        if self.reader:
            result = self.reader.readtext(image_path, detail=0)
            return "\n".join(result).strip()
        try:
            import pytesseract

            image = Image.open(image_path)
            return pytesseract.image_to_string(image).strip()
        except Exception:
            return ""


def extract_text_from_image(image_path: str) -> str:
    return OCRService().extract_text(image_path)
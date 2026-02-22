from __future__ import annotations

from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from app.agents.orchestrator import AgentOrchestrator
from app.storage.files import save_upload

router = APIRouter()
_orchestrator = AgentOrchestrator()


class ChatRequest(BaseModel):
    query: str


class ChatResponse(BaseModel):
    answer: str
    context: list[str]


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    result = _orchestrator.chat(request.query)
    return result


@router.post("/chat/multimodal")
async def chat_multimodal(
    query: str,
    image: UploadFile | None = File(default=None),
    audio: UploadFile | None = File(default=None),
):
    image_path = save_upload(image.file, image.filename) if image else None
    audio_path = save_upload(audio.file, audio.filename) if audio else None
    result = _orchestrator.chat_multimodal(query, image_path, audio_path)
    return result
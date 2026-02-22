from __future__ import annotations

from fastapi import APIRouter

from app.api.routers import admin, chat, documents, health

router = APIRouter()

router.include_router(health.router, tags=["health"])
router.include_router(chat.router, prefix="/api", tags=["chat"])
router.include_router(documents.router, prefix="/api", tags=["documents"])
router.include_router(admin.router, prefix="/api", tags=["admin"])
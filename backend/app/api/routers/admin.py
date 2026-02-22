from __future__ import annotations

from fastapi import APIRouter, Depends

from app.core.security import require_admin_api_key
from app.storage.db import SessionLocal
from app.storage.repository import list_documents

router = APIRouter()


@router.get("/admin/status", dependencies=[Depends(require_admin_api_key)])
async def admin_status():
    return {"status": "ok"}


@router.get("/admin/documents", dependencies=[Depends(require_admin_api_key)])
async def admin_documents():
    with SessionLocal() as db:
        docs = list_documents(db)
        return [
            {"id": doc.id, "filename": doc.filename, "created_at": doc.created_at.isoformat()}
            for doc in docs
        ]
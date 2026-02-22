from __future__ import annotations

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.rag.pipeline import RagPipeline
from app.storage.db import SessionLocal
from app.storage.files import save_upload, remove_file
from app.storage.repository import list_documents, get_document, delete_document

router = APIRouter()
_pipeline = RagPipeline()


@router.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    path = save_upload(file.file, file.filename)
    doc_id = _pipeline.ingest_file(file_path=path, content_type=file.content_type)
    return {"id": doc_id, "filename": file.filename}


@router.get("/documents")
async def list_all_documents():
    with SessionLocal() as db:
        docs = list_documents(db)
        return [
            {"id": doc.id, "filename": doc.filename, "created_at": doc.created_at.isoformat()}
            for doc in docs
        ]


@router.delete("/documents/{doc_id}")
async def remove_document(doc_id: int):
    with SessionLocal() as db:
        doc = get_document(db, doc_id)
        if not doc:
            raise HTTPException(status_code=404, detail="Document not found")
        remove_file(doc.path)
        delete_document(db, doc)
    return {"status": "deleted"}


@router.post("/reindex")
async def reindex_documents():
    with SessionLocal() as db:
        docs = list_documents(db)
        payload = [(doc.id, doc.path) for doc in docs]
    _pipeline.rebuild(payload)
    return {"status": "reindexed", "count": len(payload)}
from __future__ import annotations

from typing import Iterable

from sqlalchemy.orm import Session

from app.storage.models import Document


def create_document(db: Session, *, filename: str, content_type: str | None, path: str) -> Document:
    doc = Document(filename=filename, content_type=content_type, path=path)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


def list_documents(db: Session) -> Iterable[Document]:
    return db.query(Document).order_by(Document.created_at.desc()).all()


def get_document(db: Session, doc_id: int) -> Document | None:
    return db.query(Document).filter(Document.id == doc_id).first()


def delete_document(db: Session, doc: Document) -> None:
    db.delete(doc)
    db.commit()
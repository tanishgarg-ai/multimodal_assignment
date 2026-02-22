from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.core.config import settings
from app.core.logging import configure_logging
from app.storage.db import init_db
from app.storage.files import ensure_dirs


def create_app() -> FastAPI:
    configure_logging(settings.log_level)
    app = FastAPI(title=settings.app_name)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins.split(","),
        allow_credentials=True,
        allow_methods=["*"] ,
        allow_headers=["*"],
    )

    @app.on_event("startup")
    def startup() -> None:
        ensure_dirs()
        init_db()

    app.include_router(router)
    return app


app = create_app()
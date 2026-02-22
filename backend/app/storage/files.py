from __future__ import annotations

import os
from pathlib import Path
from typing import BinaryIO

from app.core.config import settings


def ensure_dirs() -> None:
    Path(settings.uploads_dir).mkdir(parents=True, exist_ok=True)
    Path(settings.index_dir).mkdir(parents=True, exist_ok=True)


def save_upload(file_obj: BinaryIO, filename: str) -> str:
    ensure_dirs()
    safe_name = filename.replace("..", "").replace("/", "_").replace("\\", "_")
    target_path = Path(settings.uploads_dir) / safe_name
    with open(target_path, "wb") as f:
        f.write(file_obj.read())
    return str(target_path)


def remove_file(path: str) -> None:
    try:
        os.remove(path)
    except FileNotFoundError:
        return
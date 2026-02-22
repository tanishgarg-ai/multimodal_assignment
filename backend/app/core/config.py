from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "Rabbit Multimodal Fest"
    api_prefix: str = "/api"
    cors_origins: str = "*"
    log_level: str = "INFO"

    data_dir: str = "data"
    uploads_dir: str = "data/uploads"
    index_dir: str = "data/index"

    sqlite_url: str = "sqlite:///./data/metadata.db"

    ollama_host: str = "http://localhost:11434"
    ollama_model: str = "mistral"

    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    chunk_size: int = 500
    chunk_overlap: int = 50
    top_k: int = 5

    admin_api_key: str = "dev-admin-key"


settings = Settings()
from typing import List
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.http.models import Distance, VectorParams
from langchain_openai import OpenAIEmbeddings
import uuid
from ..core.config import settings

class VectorStore:
    def __init__(self):
        self.client = QdrantClient(
            host=settings.QDRANT_HOST,
            port=settings.QDRANT_PORT
        )
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
        self._init_collection()

    def _init_collection(self):
        """Initialize vector collection if it doesn't exist"""
        collections = self.client.get_collections().collections
        if not any(col.name == settings.COLLECTION_NAME for col in collections):
            self.client.create_collection(
                collection_name=settings.COLLECTION_NAME,
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
            )

    async def add_texts(self, texts: List[str], metadata: dict = None) -> str:
        """Add text chunks to vector store"""
        document_id = str(uuid.uuid4())
        embeddings = self.embeddings.embed_documents(texts)
        
        points = [
            models.PointStruct(
                id=str(uuid.uuid4()),
                payload={"text": text, "document_id": document_id, **(metadata or {})},
                vector=embedding
            )
            for text, embedding in zip(texts, embeddings)
        ]
        
        self.client.upsert(
            collection_name=settings.COLLECTION_NAME,
            points=points
        )
        
        return document_id

    async def search(self, query: str, limit: int = 3) -> List[str]:
        """Search for similar text chunks"""
        query_embedding = self.embeddings.embed_query(query)
        
        results = self.client.search(
            collection_name=settings.COLLECTION_NAME,
            query_vector=query_embedding,
            limit=limit
        )
        
        return [hit.payload["text"] for hit in results] 
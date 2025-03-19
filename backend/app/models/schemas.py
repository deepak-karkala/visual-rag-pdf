from pydantic import BaseModel
from typing import List, Optional

class Message(BaseModel):
    content: str
    role: str = "user"

class ChatResponse(BaseModel):
    response: str
    context: Optional[List[str]] = None

class DocumentResponse(BaseModel):
    message: str
    document_id: str 
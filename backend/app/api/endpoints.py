from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from ..models.schemas import Message, ChatResponse, DocumentResponse
from ..services.pdf_service import PDFService
from ..services.vector_store import VectorStore
from ..services.chat_service import ChatService

router = APIRouter()

# Service instances
pdf_service = PDFService()
vector_store = VectorStore()
chat_service = ChatService()

@router.post("/upload", response_model=DocumentResponse)
async def upload_pdf(file: UploadFile = File(...)):
    """Upload and process a PDF file"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        # Save and process the PDF
        file_path = await pdf_service.save_pdf(file)
        chunks = pdf_service.extract_text(file_path)
        
        # Store in vector database
        document_id = await vector_store.add_texts(chunks, {"filename": file.filename})
        
        # Cleanup
        pdf_service.cleanup_file(file_path)
        
        return DocumentResponse(
            message="PDF processed successfully",
            document_id=document_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat", response_model=ChatResponse)
async def chat(message: Message):
    """Process a chat message and return a response"""
    try:
        # Retrieve relevant context
        context = await vector_store.search(message.content)
        
        # Get response from LLM
        response = await chat_service.get_response(message.content, context)
        
        return ChatResponse(
            response=response,
            context=context
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
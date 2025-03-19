import os
from typing import List
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from ..core.config import settings

class PDFService:
    def __init__(self):
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )

    async def save_pdf(self, file) -> str:
        """Save uploaded PDF file and return the file path"""
        file_path = os.path.join(settings.UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        return file_path

    def extract_text(self, file_path: str) -> List[str]:
        """Extract text from PDF and split into chunks"""
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        
        chunks = self.text_splitter.split_text(text)
        return chunks

    def cleanup_file(self, file_path: str):
        """Remove the uploaded PDF file"""
        if os.path.exists(file_path):
            os.remove(file_path) 
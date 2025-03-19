# Chat with PDF

A modern web application that allows users to chat with their PDF documents using AI. Upload a PDF and ask questions about its content.

## Features

- 🚀 Modern, responsive UI built with Next.js 13+ and Tailwind CSS
- 💬 Interactive chat interface with real-time responses
- 📄 PDF document upload and processing
- 🔍 Semantic search using vector embeddings
- 🤖 AI-powered question answering using LLMs
- 🎯 Precise context retrieval for accurate responses

## Tech Stack

- **Frontend:**
  - Next.js 13+
  - TypeScript
  - Tailwind CSS
  - React Hooks

- **Backend:**
  - FastAPI
  - LangChain
  - Python 3.9+
  - Qdrant Vector Database

## Prerequisites

- Python 3.9 or higher
- Node.js 18 or higher
- Docker (for Qdrant)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd visual-rag-pdf
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables:**

   Create `.env` file in the backend directory:
   ```
   OPENAI_API_KEY=your_openai_api_key
   MODEL_NAME=gpt-4-turbo-preview
   QDRANT_HOST=localhost
   QDRANT_PORT=6333
   ```

   Create `.env.local` file in the frontend directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

5. **Start Qdrant:**
   ```bash
   docker-compose up -d
   ```

6. **Start the Backend:**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

7. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Project Structure

```
.
├── frontend/               # Next.js frontend application
│   ├── app/               # App router pages and components
│   │   ├── api/         # API routes and endpoints
│   │   ├── components/  # React components
│   │   └── lib/         # Utility functions and API client
│   ├── backend/           # FastAPI backend application
│   │   ├── app/         # Application package
│   │   │   ├── api/     # API routes and endpoints
│   │   │   ├── core/    # Core configuration
│   │   │   ├── models/  # Data models and schemas
│   │   │   └── services/ # Business logic services
│   │   └── main.py      # Application entry point
│   └── docker-compose.yml # Docker compose configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Project Description
This project is about building a 'Chat with PDF' application. 
It lets the user upload a PDF document and then ask questions about it.
The application consists of two pipelines,
	1. Ingestion pipeline: Ingest the PDF document, create vector embeddings and store them in vector database.
	2. Inference pipeline: The user will query the system, the application will retrieve the context most similar to user query, append it as context and then invoke the LLM to generate the response for user query.

# Tech Stack
- Frontend: NextJS, Tailwind
- Backend: FastAPI with Langchain for LLM orchestration
- Vector Database: Qdrant
- LLM: GPT 4o-mini


# Development Stages
- Stage 1: Project Setup
	- Step 1: Set up the environment, package management
	- Step 2: Set up the directory Structure
	- Step 3: Set up the NextJS project
		- Use the Vercel template from this link: https://chat.vercel.ai/
	- Step 4: Set up the FastAPI backend

- Stage 2: Chat UI connected to LLM API
	- Step 1: Simple chat UI front end in NextJS and Tailwind
	- Step 2: Create a FastAPI backend to handle the chat input
	- Step 3: 

- Stage 3: Setting up CI/CD pipeline with Testing

- Stage 3: Adding ingestion pipeline

- Stage 4: Adding inference pipeline

- Stage 5: End to end testing with mock data

- Stage 6: Enhancing UI with sample PDFs
 

# Instructions to Cursor Coding Agent
1. Let us do this project stage by stage.
2. Keep the code clean and minimal.
3. Let us start with Stage 1, project setup.
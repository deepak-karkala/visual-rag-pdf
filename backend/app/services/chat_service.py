from typing import List
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, AIMessage, SystemMessage
from ..core.config import settings

class ChatService:
    def __init__(self):
        self.chat = ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model="gpt-4-turbo-preview",
            temperature=0.7
        )

    async def get_response(self, messages: List[dict]) -> str:
        """Get response from chat model"""
        formatted_messages = []
        for message in messages:
            if message["role"] == "system":
                formatted_messages.append(SystemMessage(content=message["content"]))
            elif message["role"] == "user":
                formatted_messages.append(HumanMessage(content=message["content"]))
            elif message["role"] == "assistant":
                formatted_messages.append(AIMessage(content=message["content"]))

        response = self.chat.invoke(formatted_messages)
        return response.content 
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("API key is missing. Please set GOOGLE_API_KEY in your .env file.")

genai.configure(api_key=api_key)

model = genai.GenerativeModel(
    "models/gemini-1.5-flash",
    system_instruction=(
        "People can no longer live on Earth, and now they need to migrate to Mars for survival. "
        "However, before they can settle, they need essential information on three critical subjects: "
        "climate control, resource management, and ecosystem design. "
        "You are going to play a game with them to help them learn these concepts. "
        "Each time they send a message, create a scenario related to one of these subjects. "
        "Randomly choose between climate control, resource management, and ecosystem design for each scenario. "
        "Provide three responses, only one of which is correct, to help them practice making the right choices. "
        "After they answer, tell them if they were correct or not, and explain why. "
        "The goal is to teach them important lessons before they leave Earth for Mars. "
        "Ensure that you ask a new question each time, without repeating any previous topics. "
        "The structure of your response should follow this format: "
        "question (must be one phrase), responses [1, 2, 3], and a prompt for a stable diffusion model about the question (a simple descriptive phrase)./follow this pattern when the user send you a message other than 1 or 2 or 3 "
        "when the user send you 1 or 2 or 3 respond based on the question and explain why and dont do nothing more and dont ask again "
        "make sure to follow each pattern that i gave you."
    )
)

chat = model.start_chat()

while True:
    user_input = input("You : ")

    if user_input.lower() == "exit":
        print("Ending the chat.")
        break

    response = chat.send_message(user_input)
    
    print(f"si chedli:  {response.text}")

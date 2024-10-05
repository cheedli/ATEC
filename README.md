Deimos - Mars Knowledge Platform
Deimos is a Flask-based web application that offers a platform dedicated to exploring Mars and its potential for human habitation. 
The platform provides users with detailed information about Mars' history and research, an AI-powered chatbot to answer any questions related to life on Mars, and a simulation of real-world scenarios on Mars assisted by large language models (LLMs) and diffusion models.




-Key Features:
Mars Information Library: A comprehensive database of research, facts, and guides about Mars' history, geology, and potential for human settlement.
Mars Chatbot: An AI chatbot fine-tuned to answer questions about life on Mars, exploration missions, and other Mars-related queries.
Simulation: A simulation feature powered by LLMs and diffusion models to create real-world scenarios for life on Mars, assisting users in understanding critical decision-making processes and challenges.




-Technologies Used :
Flask: A lightweight web framework to run the application.
Hugging Face: Used for hosting and deploying the fine-tuned chatbot models.
Gemini: The Gemini LLM is used for answering complex Mars-related questions.
Flux 1.5: Manages data flow for simulations and chatbot responses.
Diffusion Model: Integrated to generate simulations and visual representations of potential situations on Mars.


-Getting Started
Follow these instructions to set up the project locally on your machine.

-Prerequisites
Ensure you have the following installed on your system:

Python 3.8+: Download Python
Flask: To serve the web application.
Hugging Face Transformers: To load the fine-tuned models.
Gemini: For the LLM-based Mars chatbot.
Flux 1.5: For the simulation management.
CUDA-enabled GPU (Optional): For diffusion models to perform better.


-Installation
Clone the Repository
bash
Copier le code
git clone https://github.com/yourusername/deimos.git
cd deimos

-Create a Virtual Environment

python -m venv venv
source venv/bin/activate  # For Linux/Mac
# or
venv\Scripts\activate  # For Windows


-Install the Required Dependencies

pip install -r requirements.txt
The requirements.txt file contains the following dependencies:

Flask==2.0.3
transformers==4.12.3
torch==1.9.0
diffusers==0.6.0
flux==1.5
gemini==0.2

Set Up Hugging Face API Key
You need to create an account on Hugging Face and obtain an API key to access the fine-tuned chatbot models.

Create a .env file in the root directory and add your Hugging Face API key:
plaintext

Copier le code
HF_API_KEY=your-huggingface-api-key

Run the Application
bash

Copier le code
flask run
By default, the application will be available at http://127.0.0.1:5000.

Usage
Access the Mars Information Library
Navigate to the "Mars Library" section to browse through a detailed collection of articles, guides, and manuals related to Mars exploration and its history.
Interact with the Mars Chatbot
Visit the "Chatbot" section to ask any questions about life on Mars or other space-related topics. The chatbot is powered by a fine-tuned model hosted on Hugging Face.
Explore Simulations
The "Simulation" section allows you to run realistic simulations of potential situations on Mars. These are generated using a combination of large language models and diffusion models to visualize the challenges and solutions for life on Mars.
Contributing
We welcome contributions! Here's how you can help:

Fork the repository.
Create a new feature branch.
Submit a pull request.

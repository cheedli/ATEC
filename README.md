# **Deimos - Mars Knowledge Platform**

**Deimos** is a Flask-based web application offering a platform to explore Mars and its potential for human habitation. The platform provides users with:

- Detailed information about Mars' history and research
- An AI-powered chatbot to answer questions related to life on Mars
- A simulation of real-world scenarios on Mars, assisted by large language models (LLMs) and diffusion models.

## **Key Features**
- **Mars Information Library**: A comprehensive database of research, facts, and guides about Mars' history, geology, and potential for human settlement.
- **Mars Chatbot**: An AI chatbot fine-tuned to answer questions about life on Mars, exploration missions, and other Mars-related topics.
- **Simulation**: A feature powered by LLMs and diffusion models to simulate real-world scenarios for life on Mars, helping users understand decision-making processes and challenges.

## **Technologies Used**
- **Flask**: Lightweight web framework to run the application.
- **Hugging Face**: Used for hosting and deploying fine-tuned chatbot models.
- **Gemini**: LLM used for answering complex Mars-related questions.
- **Flux 1.5**: Manages data flow for simulations and chatbot responses.
- **Diffusion Model**: Generates simulations and visual representations of potential situations on Mars.

## **Getting Started**
Follow these instructions to set up the project locally.

### **Prerequisites**
Ensure you have the following installed:
- **Python 3.8+**: [Download Python](https://www.python.org/downloads/)
- **Flask**: To serve the web application.
- **Hugging Face Transformers**: To load the fine-tuned models.
- **Gemini**: For the LLM-based Mars chatbot.
- **Flux 1.5**: For simulation management.
- **CUDA-enabled GPU (optional)**: For better performance with diffusion models.

### **Installation**
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/cheedli/ATEC
    cd deimos
    ```

2. **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # For Linux/Mac
    # or
    venv\Scripts\activate  # For Windows
    ```

3. **Install the Required Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

    - Alternatively, install the dependencies manually:
      ```plaintext
      Flask==2.0.3
      transformers==4.12.3
      torch==1.9.0
      diffusers==0.6.0
      flux==1.5
      gemini==0.2
      ```

### **Set Up Hugging Face API Key**
1. Create an account on [Hugging Face](https://huggingface.co/).
2. Obtain an API key and add it to a `.env` file in the root directory:
    ```plaintext
    HF_API_KEY=your-huggingface-api-key
    ```

### **Run the Application**
```bash
py appp.py
```
By default, the application will be accessible at: [http://127.0.0.1:5000](http://127.0.0.1:5000).

## **Usage**
- **Mars Information Library**: Explore a detailed collection of articles, guides, and research on Mars.
- **Mars Chatbot**: Ask questions about life on Mars in the "Chatbot" section. The chatbot is powered by a fine-tuned model hosted on Hugging Face.
- **Simulations**: Run realistic simulations of potential life on Mars scenarios in the "Simulation" section. These simulations are generated using LLMs and diffusion models.

## **Contributing**
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new feature branch.
3. Submit a pull request.

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


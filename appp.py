from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
import google.generativeai as genai
import requests
import io
from PIL import Image
import time
API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"

headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("API key is missing. Please set GOOGLE_API_KEY in your .env file.")

genai.configure(api_key=api_key)

# Initialize the model
model = genai.GenerativeModel(
    "models/gemini-1.5-flash",
    system_instruction=(
        "You are tasked with preparing humans for life on Mars, as Earth is becoming uninhabitable. "
        "To ensure survival, you will guide them through learning three crucial topics: climate control, resource management, and ecosystem design. "
        "You will create testing scenarios for each subject, challenging their understanding of these areas. "
        "For each interaction, randomly select one topic from climate control, resource management, or ecosystem design and generate a scenario. "
        "Each scenario will have three possible responses, labeled 1, 2, and 3, with only one correct answer. "
        "After they respond, confirm whether their choice was correct or not, and explain why. "
        "Never repeat the same topic in two consecutive scenarios, and ensure each new scenario is fresh and different."
        "When generating your response, follow this exact structure:"
        "\n\n"
        "1. The question, placed on a separate line."
        "\n\n"
        "2. The three possible responses formatted as:1. Response1 ,2. Response2 ,3. Response3."
        "\n\n"
        "3. On the next line, provide a stable diffusion prompt describing the scenario in simple terms."
        "\n\n"
        "4. On the following line, write the number of the correct response, e.g., '2'"
        "\n\n"
        "5. Finally, on the last line, give an explanation of why the answer is correct."
        "\n\n"
        "Ensure proper spacing between lines using double newlines (\\n\\n) for clear formatting, "
        "and always adhere to this exact structure."
        "make sure to follow the structure"
    )
)


chat = model.start_chat() 

app = Flask(__name__)

@app.route('/')
def home():
    # Initialize question and answers
    response = chat.send_message("start")
    question_data = parse_response(response.text)
    return render_template('quiz.html', question=question_data['question'], answers=question_data['responses'])
    #return render_template('index.html')

@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    user_answer = int(request.form.get('answer')) 
    if user_answer == correct_answer:
        feedback = f"Correct! {explanation}"
    else:
        feedback = f"Incorrect! The correct answer was {correct_answer}. {explanation}"
    
    return jsonify({'feedback': feedback})
correct_answer=1
explanation=""
def parse_response(response_text):
    global correct_answer, explanation  
    try:
        parts = response_text.split('\n\n')
        print(response_text)

        if len(parts) != 5:
            parts = response_text.split('\n')
            if len(parts) != 5:
                raise ValueError("Error while parsing response")

        question = parts[0].strip()
        prompt = parts[2].strip()


        # Extract the responses
        responses_section = parts[1].split('1.')
        if len(responses_section) > 1:
            numbered_sections = responses_section[1].split('2.')
            first_response = numbered_sections[0].strip()
            third_split = numbered_sections[1].split('3.')
            second_response = third_split[0].strip()
            third_response = third_split[1].strip()
            numbered_responses = [first_response, second_response, third_response]
        else:
            raise ValueError("Could not extract 3 responses")
        prompt = parts[2].strip() if len(parts) > 2 else "life on mars"
        # The stable diffusion prompt is the third part if it exists
       
      
        start_time = time.time()

        timeout = 500  # Maximum time to wait for the image in seconds
        image_bytes = None
        image_bytes = query({
	            "inputs": prompt,
                }  )      
        while image_bytes is None:
            

            # Check for timeout
            if time.time() - start_time > timeout:
                raise TimeoutError("Image retrieval timed out.")
        image = Image.open(io.BytesIO(image_bytes))
        image.save("static/img/cc.png")   

                # Extract the correct answer and explanation
        correct_answer = int(parts[3].strip())  # The correct answer number
        explanation = parts[4].strip()  # Explanation for the correct answer

        return {
                    'question': question,
                    'responses': numbered_responses,
                    'prompt': parts[2].strip(),
                    'correct_answer': correct_answer,
                    'explanation': explanation
                }

    except Exception as e:
        print("Error while parsing response:", e)
    
    return {'question': 'Error: Unexpected response format.', 'responses': [], 'prompt': ''}

if __name__ == '__main__':
    app.run(debug=True)

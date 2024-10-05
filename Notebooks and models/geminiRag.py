import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import warnings
warnings.filterwarnings("ignore", category=UserWarning, message="Convert_system_message_to_human will be deprecated!")

# Your existing imports and code here

# Configure Google API Key
GOOGLE_API_KEY = 'AIzaSyCFRldRloS5M4nbRELf4TQux3Sw0D-W3X8'  # Make sure to use your actual API key here
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the ChatGoogleGenerativeAI model
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GOOGLE_API_KEY,
                               temperature=0.2, convert_system_message_to_human=True)

# Load and process PDF for context
pdf_loader = PyPDFLoader("MarsReview.pdf")
pages = pdf_loader.load_and_split()
context = "\n\n".join(str(p.page_content) for p in pages)

# More code...

# Split text and create embeddings
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
texts = text_splitter.split_text(context)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GOOGLE_API_KEY)

# Create vector index and initialize RetrievalQA
vector_index = Chroma.from_texts(texts, embeddings).as_retriever(search_kwargs={"k": 5})
qa_chain = RetrievalQA.from_chain_type(model, retriever=vector_index, return_source_documents=True)

# Define the prompt template
template = """
You are an expert in Mars survival, drawing from accurate, comprehensive information. Use the following pieces of context to answer the question at the end, and create practical scenarios when relevant. If you don't know the answer, say "I don't know," and avoid speculation. Keep the answers informative but concise, and include key survival tips when applicable. Always end with "Thanks for asking!".
{context}
Question: {question}
Helpful Answer:
"""
QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
qa_chain = RetrievalQA.from_chain_type(model, retriever=vector_index, return_source_documents=True, chain_type_kwargs={"prompt": QA_CHAIN_PROMPT})

# Function to run the chatbot
# Function to run the chatbot
def run_chatbot():
    while True:
        question = input("Ask a question about Mars survival or type 'exit' to quit: ")
        if question.lower() == 'exit':
            break
        # Replace the deprecated _call_ method with invoke
        result = qa_chain.invoke({"query": question})
        print(result["result"])


if _name_ == "_main_":
    run_chatbot()
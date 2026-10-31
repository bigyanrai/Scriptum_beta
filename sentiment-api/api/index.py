import os
import re
import joblib
import nltk

from fastapi import FastAPI
from pydantic import BaseModel
from nltk.corpus import stopwords


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "sentiment_model.pkl"
)

VECTORIZER_PATH = os.path.join(
    BASE_DIR,
    "model",
    "tfidf_vectorizer.pkl"
)

# Use the stopwords included in the project
NLTK_DATA_PATH = os.path.join(BASE_DIR, "nltk_data")
nltk.data.path.append(NLTK_DATA_PATH)

stop_words = set(stopwords.words("english"))

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

app = FastAPI()


class SentimentRequest(BaseModel):
    text: str


def clean_text(text):
    text = text.lower()
    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()

    words = text.split()
    words = [word for word in words if word not in stop_words]

    return " ".join(words)


@app.get("/")
def home():
    return {
        "message": "Sentiment API is running"
    }


@app.post("/predict")
def predict_sentiment(request: SentimentRequest):
    text = clean_text(request.text)

    vector = vectorizer.transform([text])
    prediction = model.predict(vector)

    return {
        "sentiment": str(prediction[0])
    }
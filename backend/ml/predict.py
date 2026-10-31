import os
import re
import sys
import joblib

from nltk.corpus import stopwords

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model", "sentiment_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "model", "tfidf_vectorizer.pkl")

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

stop_words = set(stopwords.words("english"))


def clean_text(text):
    text = text.lower()

    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()

    words = text.split()
    words = [word for word in words if word not in stop_words]

    return " ".join(words)


if len(sys.argv) < 2:
    print("No text provided")
    sys.exit(1)

comment = sys.argv[1]

comment = clean_text(comment)

vector = vectorizer.transform([comment])

prediction = model.predict(vector)

print(prediction[0])
# import re
# import joblib
# import pandas as pd

# from nltk.corpus import stopwords
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.model_selection import train_test_split
# from sklearn.svm import LinearSVC
# from sklearn.metrics import accuracy_score, classification_report

# # Load dataset
# df = pd.read_csv("dataset/imdbDataset.csv")

# print("Dataset loaded successfully!")
# print(df.head())

# # Clean text
# stop_words = set(stopwords.words("english"))

# def clean_text(text):
#     text = text.lower()

#     # Remove HTML tags
#     text = re.sub(r"<.*?>", "", text)

#     # Remove URLs
#     text = re.sub(r"http\S+", "", text)

#     # Remove punctuation and numbers
#     text = re.sub(r"[^a-zA-Z\s]", "", text)

#     # Remove extra spaces
#     text = re.sub(r"\s+", " ", text).strip()

#     # Remove stopwords
#     words = text.split()
#     words = [word for word in words if word not in stop_words]

#     return " ".join(words)

# print("Cleaning dataset...")

# df["review"] = df["review"].apply(clean_text)

# print("Dataset cleaned!")

# # Convert text into TF-IDF vectors
# vectorizer = TfidfVectorizer(max_features=10000)

# X = vectorizer.fit_transform(df["review"])
# y = df["sentiment"]

# # Split dataset
# X_train, X_test, y_train, y_test = train_test_split(
#     X,
#     y,
#     test_size=0.2,
#     random_state=42,
# )

# # Train model
# print("Training SVM...")

# model = LinearSVC()

# model.fit(X_train, y_train)

# print("Training completed!")

# # Test accuracy
# predictions = model.predict(X_test)

# accuracy = accuracy_score(y_test, predictions)

# print(f"\nAccuracy: {accuracy * 100:.2f}%\n")

# print(classification_report(y_test, predictions))

# # Save model
# joblib.dump(model, "model/sentiment_model.pkl")
# joblib.dump(vectorizer, "model/tfidf_vectorizer.pkl")

# print("Model saved successfully!")


import os
import re
import joblib
import pandas as pd

from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "datasets")
MODEL_DIR = os.path.join(BASE_DIR, "model")

os.makedirs(MODEL_DIR, exist_ok=True)

stop_words = set(stopwords.words("english"))


def clean_text(text):
    text = str(text).lower()

    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()

    words = text.split()
    words = [word for word in words if word not in stop_words]

    return " ".join(words)


print("Loading IMDb...")

imdb = pd.read_csv(
    os.path.join(DATASET_DIR, "imdb.csv")
)

imdb = imdb.rename(
    columns={
        imdb.columns[0]: "text",
        imdb.columns[1]: "sentiment"
    }
)

imdb = imdb[["text", "sentiment"]]


print("Loading Amazon...")

amazon = pd.read_csv(
    os.path.join(DATASET_DIR, "amazon.csv"),
    header=None
)

amazon.columns = [
    "label",
    "title",
    "text"
]

amazon = amazon[["text", "label"]]

amazon["sentiment"] = amazon["label"].map({
    1: "negative",
    2: "positive"
})

amazon = amazon[["text", "sentiment"]]


print("Loading Twitter...")

twitter = pd.read_csv(
    os.path.join(DATASET_DIR, "twitter.csv"),
    encoding="latin-1",
    header=None
)

twitter.columns = [
    "label",
    "id",
    "date",
    "query",
    "user",
    "text"
]

twitter = twitter[["text", "label"]]

twitter = twitter[
    twitter["label"].isin([0, 4])
]

twitter["sentiment"] = twitter["label"].map({
    0: "negative",
    4: "positive"
})

twitter = twitter[["text", "sentiment"]]

print("Loading Blog Comments...")

blog = pd.read_csv(
    os.path.join(DATASET_DIR, "blog.csv")
)

blog = blog.rename(
    columns={
        blog.columns[0]: "text",
        blog.columns[1]: "sentiment"
    }
)

blog = blog[["text", "sentiment"]]


print("Sampling datasets...")

imdb = imdb.sample(
    n=min(50000, len(imdb)),
    random_state=42
)

amazon = amazon.sample(
    n=min(50000, len(amazon)),
    random_state=42
)

twitter = twitter.sample(
    n=min(50000, len(twitter)),
    random_state=42
)

blog = pd.concat(
    [blog] * 100,
    ignore_index=True
)

dataset = dataset = pd.concat(
    [
        imdb,
        amazon,
        twitter,
        blog
    ],
    ignore_index=True
)
dataset.drop_duplicates(
    subset=["text"],
    inplace=True
)

dataset.reset_index(
    drop=True,
    inplace=True
)

print("Total samples:", len(dataset))


print("Cleaning text...")

dataset["text"] = dataset["text"].apply(clean_text)


print("Creating TF-IDF...")

vectorizer = TfidfVectorizer(
    max_features=20000,
    ngram_range=(1, 2),
    min_df=2,
    max_df=0.95,
    sublinear_tf=True
)

X = vectorizer.fit_transform(dataset["text"])
y = dataset["sentiment"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


print("Training SVM...")

model = LinearSVC()

model.fit(
    X_train,
    y_train
)


prediction = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    prediction
)

print(f"Accuracy: {accuracy*100:.2f}%")

joblib.dump(
    model,
    os.path.join(MODEL_DIR, "sentiment_model.pkl")
)

joblib.dump(
    vectorizer,
    os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl")
)

print("Model saved successfully.")
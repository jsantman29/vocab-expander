import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize 

nltk.data.path.append('/opt/python/nltk_data')

# Convert text to lowercase, then remove unnecessary words.
def filter_text(text):
    
    common_words = set(stopwords.words('english'))
    lowercase_text = text.lower()
    word_tokens = word_tokenize(lowercase_text)
    filtered_words = []

    for w in word_tokens:
        # Removes stop words and punctuation tokens.
        if w not in common_words and w.isalpha():
            filtered_words.append(w)
    
    filtered_string = " ".join(filtered_words)
    return filtered_string
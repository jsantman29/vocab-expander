const API_ROOT = process.env.REACT_APP_TEXT_API_ROOT;
const API_KEY = process.env.REACT_APP_TEXT_API_KEY;

/* Requesting from the API. */

export const buildRequest = (type) => {
    const url = API_ROOT + type;
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
    };
    return [url, headers];
};

/* Handling data from the API. */

export const postFilteredText = (text) => {
    const [url, headers] = buildRequest('text');
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            text: text,
        }),
    });
};

export const getSynonyms = (word) => {
    const [url, headers] = buildRequest('synonyms');
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            word: word,
        }),
    });
};
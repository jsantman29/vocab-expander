import requests

API_ROOT = 'https://wordsapiv1.p.rapidapi.com/words';
API_HOST = 'wordsapiv1.p.rapidapi.com';

def build_request(endpoint, api_key):
    url = API_ROOT + endpoint
    headers = {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': api_key,
    }
    return [url, headers]

def get_synonyms(word, api_key):
    [url, headers] = build_request(f'/{word}/synonyms', api_key)
    return requests.get(url, headers=headers)

def format_synonyms_response(response):
    
    status_code = response.status_code
    formatted_response = dict({"statusCode": status_code})
    body = dict()

    if status_code == 200:
        response_headers = response.headers
        response_body = response.json()
        body['synonyms'] = response_body['synonyms']
        # body['requests_remaining'] = response_headers[]

    else:
        body['error'] = "Failed to make API Request."
    
    formatted_response.update(body)
    return formatted_response
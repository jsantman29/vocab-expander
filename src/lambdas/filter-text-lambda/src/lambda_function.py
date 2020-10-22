import json
import text_processing

def lambda_handler(event, context):
    
    response = None
    
    try:
        text = event['text']
        filtered_text = text_processing.filter_text(text)
        response = get_success_response(filtered_text)

    except KeyError:
        response = get_bad_request_response('A required field was missing in the request: text')
    
    return response

def get_success_response(text):
    return {
        'statusCode': 200,
        'body': text
    }
    
def get_bad_request_response(msg):
    return {
        'statusCode': 400,
        'body': msg
    }


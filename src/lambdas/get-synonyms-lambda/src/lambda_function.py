import json
import boto3
import wordsapi
        
def lambda_handler(event, context):
    
    client = boto3.client('ssm')
    parameter = client.get_parameter(Name='WordsAPI_Key', WithDecryption=True)
    
    words_api_key = parameter['Parameter']['Value']

    response = wordsapi.get_synonyms(event['word'],words_api_key)
    return wordsapi.format_synonyms_response(response)
# Links layers with lambda.

LAMBDA_NAME=$1
LAYER_ARN_ONE=arn:aws:lambda:us-east-1:170951129663:layer:test-layer-python:3

aws lambda update-function-configuration --function-name ${LAMBDA_NAME} --layers ${LAYER_ARN_ONE}
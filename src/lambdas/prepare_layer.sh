# Prepares the ZIP file containing a Python folder to be published as an AWS Lambda Layer.

set -o pipefail

echo Preparing Python libraries.
pip install --target ./python -r requirements.txt
echo Finished prepping libraries.

echo Zipping file.
zip -r python.zip python/
echo Finished zipping file.

echo Uploading layer.
aws lambda publish-layer-version --layer-name test-layer-python --description "Test Layer for Pythn 3.x" --compatible-runtimes [list_runtimes...] --zip-file fileb://python.zip

# Cleans the files that have been packaged from the layer.

echo Removing installed Python packages.
rm -r python/
echo Finished removing installed Python packages.

echo Removing zip folder.
rm -r python.zip
echo Finished removing zip folder.
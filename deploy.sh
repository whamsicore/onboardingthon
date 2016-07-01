#!/bin/sh

rm -f exports.zip
zip -r exports.zip exports.js node_modules parsers
aws lambda update-function-code --function-name parser --zip-file fileb://exports.zip

#!/bin/bash

# Input: $1 = language, $2 = code file path, $3 = input file path

LANGUAGE=$1
CODE_FILE=$2
INPUT_FILE=$3

if [[ "$LANGUAGE" == "cpp" ]]; then
  g++ "$CODE_FILE" -o /app/program && /app/program < "$INPUT_FILE"
elif [[ "$LANGUAGE" == "python" ]]; then
  python3 "$CODE_FILE" < "$INPUT_FILE"
elif [[ "$LANGUAGE" == "java" ]]; then
  javac "$CODE_FILE" && java -cp /app Program < "$INPUT_FILE"
else
  echo "Unsupported language: $LANGUAGE"
fi

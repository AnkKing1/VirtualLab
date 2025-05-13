#!/bin/bash

# Input: $1 = language, $2 = code file path, $3 = input file path

LANGUAGE=$1
CODE_FILE=$2
INPUT_FILE=$3

case "$LANGUAGE" in
  cpp)
    g++ "$CODE_FILE" -o /app/program && /app/program < "$INPUT_FILE"
    ;;
  c)
    gcc "$CODE_FILE" -o /app/program && /app/program < "$INPUT_FILE"
    ;;
  python)
    python3 "$CODE_FILE" < "$INPUT_FILE"
    ;;
  java)
    FILE_DIR=$(dirname "$CODE_FILE")
    FILE_NAME=$(basename "$CODE_FILE" .java)
    javac "$CODE_FILE" && java -cp "$FILE_DIR" "$FILE_NAME" < "$INPUT_FILE"
    ;;
  javascript|js)
    node "$CODE_FILE" < "$INPUT_FILE"
    ;;
  go)
    go run "$CODE_FILE" < "$INPUT_FILE"
    ;;
  ruby)
    ruby "$CODE_FILE" < "$INPUT_FILE"
    ;;
  bash)
    bash "$CODE_FILE" < "$INPUT_FILE"
    ;;
  *)
    echo "❌ Unsupported language: $LANGUAGE"
    ;;
esac

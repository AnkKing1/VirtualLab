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

    # Extract public class name from Java code
    CLASS_NAME=$(grep -oP 'public\s+class\s+\K\w+' "$CODE_FILE")

    if [ -z "$CLASS_NAME" ]; then
        echo "Error: Could not determine public class name."
        exit 1
    fi

    # Clean up any previous compiled files
    rm -f "$FILE_DIR"/*.class

    # Copy the file with the correct name
    cp "$CODE_FILE" "$FILE_DIR/$CLASS_NAME.java"

    # Compile the Java file
    javac "$FILE_DIR/$CLASS_NAME.java"

    # If compilation succeeded, run it
    if [ $? -eq 0 ]; then
        java -cp "$FILE_DIR" "$CLASS_NAME" < "$INPUT_FILE"
    else
        echo "Compilation failed."
    fi
    ;;

  javascript|js)
  FILE_DIR=$(dirname "$CODE_FILE")
  TMP_JS="$FILE_DIR/tmp_run_file.js"

  # Remove previous temp file if exists
  [ -f "$TMP_JS" ] && rm "$TMP_JS"

  # Copy original file (e.g. *.javascript) to *.js so node can run it
  cp "$CODE_FILE" "$TMP_JS"

  # Debug info
  echo "Running Node.js on $TMP_JS"
  if ! command -v node > /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    exit 1
  fi

  if [ ! -f "$INPUT_FILE" ] || [ ! -s "$INPUT_FILE" ]; then
    echo "No input file or empty input file, running without stdin"
    node "$TMP_JS"
  else
    echo "Using input file: $INPUT_FILE"
    cat "$INPUT_FILE" | node "$TMP_JS"
  fi

  # Cleanup
  rm -f "$TMP_JS"
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

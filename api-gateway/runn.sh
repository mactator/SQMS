#!/bin/bash

# Check if a parameter is passed (the number of instances)
if [ -z "$1" ]; then
    echo "Please provide the number of instances to start."
    exit 1
fi

NUM_INSTANCES=$1
START_PORT=5000

# Loop to start the specified number of instances
for ((i=1; i<=NUM_INSTANCES; i++)); do
    PORT=$((START_PORT + i))
    echo "Starting server on port $PORT..."
    gnome-terminal -- bash -c "bun run dev --port $PORT; exec bash"
    # Alternatively, use xterm or another terminal emulator if gnome-terminal is unavailable
    # Example for xterm: xterm -hold -e "bun run dev --port $PORT"
    # Or to run in the background without a new terminal: bun run dev --port $PORT &
done

echo "All instances started."

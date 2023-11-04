.PHONY: build

# Target to scaffold the React app using create-react-app inside the Docker container
init:
	# Check if the "frontend" directory exists. If it does, abort the build.
	if [ -d "frontend" ]; then \
		echo "Error: The 'frontend' directory already exists. Please remove it before building the app."; \
		exit 1; \
	fi
	# First, we'll build our development image
	docker build -t dev-image -f Dockerfile.dev .
	# Next, we'll run a temporary container from this image to execute create-react-app
	# Set the user for the Docker process using --user
	docker  run --rm --user "$(shell id -u):$(shell id -g)"  -v ./frontend:/app -w /app -i -t  node:16  bash -c "mkdir frontend && cd frontend && npx create-react-app . frontend  --template typescript"

start:
	UID=$(shell id -u) GID=$(shell id -g) docker compose up


.PHONY: build

# Target to scaffold the React app using create-react-app inside the Docker container
build:
	# Check if the "frontend" directory exists. If it does, abort the build.
	if [ -d "frontend" ]; then \
		echo "Error: The 'frontend' directory already exists. Please remove it before building the app."; \
		exit 1; \
	fi
	# First, we'll build our development image
	docker build -t dev-image -f Dockerfile.dev .
	# Next, we'll run a temporary container from this image to execute create-react-app
	# Set the user for the Docker process using --user
	docker run --rm --user "$(shell id -u):$(shell id -g)" -v ${PWD}:/app dev-image create-react-app frontend

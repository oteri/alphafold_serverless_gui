.PHONY: build

# Target to scaffold the React app using create-react-app inside the Docker container
build:
	# First, we'll build our development image
	docker build -t dev-image -f Dockerfile.dev .
	# Next, we'll run a temporary container from this image to execute create-react-app
	# Set the user for the Docker process using --user
	docker run --rm --user "$(shell id -u):$(shell id -g)" -v ${PWD}:/app dev-image create-react-app frontend

.DEFAULT_GOAL := serve
MAKEFLAGS += --no-print-directory --silent

# Variables and targets are underscore-prefixed to prevent them from appearing
# in Bash autocomplete
_S3_PREFIX_PROD = "nft"
_S3_PREFIX_STAGE = "nft-stage"

# Create production files in /build
.PHONY: build
build: _check-node-deps
	npm run build

# Run tests and check code style, raising an error upon failure
.PHONY: ci
ci: eslint test-ci

# Upload non-hashed files last to ensure that
# their referenced assets already exist on S3.
.PHONY: deploy-prod
deploy-prod:
	aws s3 cp build/ s3://$(_S3_PREFIX_PROD).duolingo.com \
		--cache-control max-age=31536000 \
		--exclude "*" \
		--include "static/*" \
		--recursive
	aws s3 cp build/ s3://$(_S3_PREFIX_PROD).duolingo.com \
		--cache-control no-cache \
		--exclude "static/*" \
		--recursive

# Upload non-hashed files last to ensure that
# their referenced assets already exist on S3.
.PHONY: deploy-stage
deploy-stage:
	aws s3 cp build/ s3://$(_S3_PREFIX_STAGE).duolingo.com \
		--cache-control max-age=31536000 \
		--exclude "*" \
		--include "static/*" \
		--recursive
	aws s3 cp build/ s3://$(_S3_PREFIX_STAGE).duolingo.com \
		--cache-control no-cache \
		--exclude "static/*" \
		--recursive

.PHONY: eslint
eslint: _check-node-deps
	npx eslint --ext=.ts,.tsx --max-warnings=0 src

.PHONY: eslint-fix
eslint-fix: _check-node-deps
	npx eslint --ext=.ts,.tsx --fix src

# Install npm packages (after first removing all existing npm packages)
.PHONY: install
install:
	NODE_ENV= npm ci # NODE_ENV= to always include devDependencies

# Start the local server
.PHONY: serve
serve: _check-node-deps
	npm run start

# Start Jest interactively and rerun tests on file changes
.PHONY: test
test: _check-node-deps
	npm run test

# Run Jest non-interactively
.PHONY: test-ci
test-ci: _check-node-deps
	npm run test -- --watchAll=false

.PHONY: _check-node-deps
_check-node-deps:
	node scripts/checkDependencies.js || make install

#!/bin/bash

# Usage: ./release.sh <tag>
# Example: ./release.sh v1.1.0

TAG=$1

if [ -z "$TAG" ]; then
  echo "Usage: ./release.sh <tag>"
  exit 1
fi

# Check if the tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Error: Tag '$TAG' already exists."
  exit 1
fi

# Create a new tag
git tag "$TAG"
git push origin "$TAG"

echo "Tag '$TAG' created and pushed."

# Optionally, you can trigger the GitHub Actions workflow if needed
# For this, you'll need to use GitHub's REST API or the GitHub CLI to trigger the workflow

# Example with GitHub CLI
#gh workflow run deploy.yml -f TAG=$TAG

#!/bin/bash

# Usage: ./create_branch.sh <issue_number> <feature_name>
# Example: ./create_branch.sh 1.1 "basic-html-parser"

ISSUE_NUMBER=$1
FEATURE_NAME=$2

if [ -z "$ISSUE_NUMBER" ] || [ -z "$FEATURE_NAME" ]; then
  echo "Usage: ./create_branch.sh <issue_number> <feature_name>"
  exit 1
fi

# Validate branch name format
BRANCH_NAME="feature/issue-$ISSUE_NUMBER-$FEATURE_NAME"
if ! [[ $BRANCH_NAME =~ ^feature/issue-[0-9]+\.[0-9]+-[a-zA-Z0-9_-]+$ ]]; then
  echo "Error: Branch name format is incorrect." >&2
  echo "Please use the following format:" >&2
  echo "  feature/issue-<issue_number>-<feature_name>" >&2
  echo "Example:" >&2
  echo "  feature/issue-1.1-basic-html-parser" >&2
  exit 1
fi

# Check if the develop branch exists
if git show-ref --quiet refs/heads/develop; then
  echo "Develop branch exists. Checking out..."
else
  echo "Develop branch does not exist. Creating it from main..."
  git checkout main
  git pull origin main
  git checkout -b develop
  git push -u origin develop
fi

# Create the feature branch from develop
git checkout develop
git pull origin develop
git checkout -b $BRANCH_NAME

echo "Branch '$BRANCH_NAME' created from 'develop'."

#!/bin/sh

# First, check if there are zero arguments
if [ $# -eq 0 ]; then
  echo "No arguments supplied"
else
  # If there are arguments, loop through each one
  for arg in "$@"; do
    # For each argument, create a directory with 'ex' in front
    mkdir "ex$arg"
  done
fi
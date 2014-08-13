#!/bin/bash

set -ex

REPOROOT="$(readlink -f "$(dirname "$0")/..")"
VENV="${REPOROOT}/build/venv"

if ! [ -d "$VENV" ]
then
    echo "Creating virtualenv: $VENV"
    virtualenv "$VENV"
fi

echo 'Installing/updating dependencies.'
"$VENV/bin/pip" install --requirement "$REPOROOT/config/pip-requirement.txt"

echo 'Generating site.'
"$VENV/bin/pelican" --help

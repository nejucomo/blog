#!/bin/bash

set -e

REPOROOT="$(readlink -f "$(dirname "$0")/..")"
VENV="${REPOROOT}/build/venv"

if ! [ -d "$VENV" ]
then
    echo "=== Creating virtualenv: $VENV ==="
    virtualenv "$VENV"

    echo '=== Activating virtualenv ==='
    source "$VENV/bin/activate"

    echo '=== Installing/updating dependencies ==='
    "$VENV/bin/pip" install --requirement "$REPOROOT/settings/pip-requirement.txt"
fi

echo '=== Generating site ==='
exec "$VENV/bin/pelican" \
    --settings "$REPOROOT/settings/pelicanconf.py" \
    --output "$REPOROOT/build/output" \
    --cache-path "$REPOROOT/build/cache" \
    --delete-output-directory \
    "$@" \
    "$REPOROOT/content"

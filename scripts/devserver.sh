#!/bin/bash

set -ex

REPOROOT="$(readlink -f "$(dirname "$0")/..")"

cd "${REPOROOT}/build/output"

exec "${REPOROOT}/build/venv/bin/python" -m SimpleHTTPServer

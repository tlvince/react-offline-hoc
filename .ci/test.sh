#!/usr/bin/env bash

set -ex

npm-s3 install
npm run lint
npm run build
npm run cover

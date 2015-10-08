---
title: Contributing
---

# Contributing

## Contributing code

### Sign the Contributor License Agreement (CLA) (not yet available)

We require a CLA for code contributions, so before we can accept a pull request
we need to have a signed CLA. Please send signed copies of the form to TBD.

### File issues in Github

In general all enhancements or bugs should be tracked via github issues before
PRs are submitted. We don't require them, but it'll help us plan and track.

When submitting bugs through issues, please try to be as descriptive as
possible. It'll make it easier and quicker for everyone if the developers can
easily reproduce your bug.

### Submit pull requests

Our only method of accepting code changes is through github pull requests.

## Development guide

### Development using docker

Confidant comes with Dockerfile and docker-compose.yml files. You can use these
to run a local development environment. As of right now it's necessary to have
real AWS credentials and a KMS key created with proper IAM privileges.

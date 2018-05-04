# Lyft Open Source Webstie

[![Build Status](https://travis-ci.org/lyft/lyft.github.io.svg?branch=develop)](https://travis-ci.org/lyft/lyft.github.io)

This is code for oss.lyft.com website.

## Technology stack

* [GatsbyJS](https://www.gatsbyjs.org/)
* [TypeScript](http://www.typescriptlang.org/)
* [Styled Components](https://www.styled-components.com/)

## Hacking

You need to have `node` and `yarn` installed.

Clone the repo and run following command to start the development server:

```sh
GITHUB_TOKEN=<github-token> yarn start
```

:bulb: Get a new GitHub access token [here](https://github.com/settings/tokens)!

## Deploy

Everything merged to the `develop` branch is automatically deployed via TravisCI.

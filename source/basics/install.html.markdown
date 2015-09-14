---
title: Installation
---

# Installation

As mentioned in the Quickstart guide, Confidant is available as a docker image,
but if you want to install Confidant on an AWS instance instead, this guide
will get you started.

Assumptions:

1. Using Ubuntu or Debian (please help with non-Ubuntu/Debian install
   instructions!)
1. Using gunicorn as the wsgi server
1. Using an ELB in front of confidant
1. Installation location: /srv/confidant/venv
1. venv location: /srv/confidant/venv
1. node\_modules location: /srv/confidant/node\_modules

## Clone Confidant

```bash
cd /srv
git clone https://github.com/lyft/confidant
```

## Make a virtualenv and install pip requirements

```bash
cd /srv/confidant
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
deactivate
```

## Build the frontend

```bash
cd /srv/confidant/confidant
sudo apt-get install ruby-full npm nodejs nodejs-legacy
gem install compass
npm install grunt-cli
npm install
grunt build
```

That's it. Now move on to the configuration section.

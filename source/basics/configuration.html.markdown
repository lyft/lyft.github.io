---
title: Configuration
---

# Configuration

Confidant is primarily configured through environment variables. The list of
all available configuration options can be found in the settings.py file.

Assuptions, from the prerequisites guide:

1. Your Google application is setup and you know your client id and secret key.
1. Your KMS auth and encryption keys are created.
1. Your DynamoDB table has been created.

## Basic environment configuration

This is the minimum configuration needed to use Confidant:

```bash
# The region our service is running in.
export AWS_DEFAULT_REGION='us-east-1'
# The IAM role name of the confidant server.
export AUTH_CONTEXT='confidant-production'
# The KMS key used for auth.
export AUTH_KEY='authnz-production'
# A long randomly generated string used for the google OAuth2 flow.
AUTHOMATIC_SALT='H39bfLCqLbrYrFyiJIxkK0uf12rlzvgjgo9FqOnttPXIdAAuyQ'
# The DynamoDB table name for storage.
export DYNAMODB_TABLE='confidant-production'
# Set the gevent resolver to ares; see:
#   https://github.com/surfly/gevent/issues/468
export GEVENT_RESOLVER='ares'
# The client id and consumer secret from the google developer console.
export GOOGLE_OAUTH_CLIENT_ID='123456789-abcdefghijklmnop.apps.googleusercontent.com'
export GOOGLE_OAUTH_CONSUMER_SECRET='123456789abcdefghijklmnop'
# The KMS key used for at-rest encryption in DynamoDB.
export KMS_MASTER_KEY='confidant-production'
# The Redis server used for sessions.
export REDIS_URL='redis://localhost:6381'
# A long randomly generated string for CLDR protection.
export SESSION_SECRET='aBVmJA3zv6zWGjrYto135hkdox6mW2kOu7UaXIHK8ztJvT8w5O'
```

## Advanced environment configuration

Confidant can track some stats via statsd. By default it's set to send stats to
statsd on localhost on port 8125.

```bash
export STATSD_HOST='mystatshost.example.com'
export STATSD_PORT='8125'
```

Confidant can also send graphite events on secret updates or changes in service
mappings:

```bash
export GRAPHITE_EVENT_URL='https://graphite.example.com/events/'
export GRAPHITE_USERNAME='mygraphiteuser'
export GRAPHITE_PASSWORD='mylongandsupersecuregraphitepassword'
```

Confidant support an authentication method for services other than KMS auth,
that uses S3 folders and IAM protection. Unless you have a strong need to use
this, you should use KMS auth, as it's generally more secure and some future
features may be limited to KMS auth mode:

```bash
export USE_SERVICE_KEYS='true'
export S3_BUCKET='example-bucket'
export S3_PREFIX='confidant-production'
```

The above configuration will store keys for services myservice1, myservice2 and
mysevice3 in the following folders:

* s3://example-bucket/confidant-production/myservice1
* s3://example-bucket/confidant-production/myservice2
* s3://example-bucket/confidant-production/myservice3

Then we can restrict access to each subfolder to its related IAM role, so IAM
role myservice1, myservice2, and myservice3 would be able to read from each
folder respectively and the confidant-production service would be able to read
and write to confidant-production/*.

It's also possible to restrict access to a subset of users that authenticate
using Google authentication:

```bash
export USERS_FILE='/etc/confidant/users.yaml'
export GOOGLE_AUTH_EMAIL_SUFFIX='@example.com'
```

In the above configuration, Confidant will limit authentication to users with
the email domain @example.com. Additionally, Confidant will look in the
users.yaml file for a list of email addresses allowed to access Confidant.

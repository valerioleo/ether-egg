# Coincierge Monorepo
This repository is the codebase of Coincierge LTD. It follows a monorepo approach in order to reduce repetition.

We suggest using **vscode** as editor as you can find already all the debugger files to easily run the needed processes or tests.

## Getting started

It is easy to get started: just navigate to `src/js` and execute `yarn`.
It will install automatically all the dependencies in all the sub projects.

Repeat the same for `src/solidity` and, after all packages are installed, run inside `src/solidity/reference` the command `yarn compile`.

You should be now all setup and move to launching neo4j and rabbitMQ

You can now start your services in the vscode debugger using `Runner API` or `Cabinet API` or `Fullstack` settings.
**Important**: when running for the first time, you need to tell your browser that the api is a trusted one. To do so, navigate
to the page https://localhost:8443 and accept the certificate.

Alternatively, just allow any localhost on Chrome by pasting the command `chrome://flags/#allow-insecure-localhost` in your url bar.

### Run neo4j

Download apoc plugins

```
mkdir $HOME/neo4j/plugins
cd $HOME/neo4j/plugins
wget https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/3.5.0.4/apoc-3.5.0.4-all.jar
```

```
docker run -d \
    -p 7474:7474 -p 7687:7687 \
    -v $HOME/neo4j/data:/data -v $HOME/neo4j/logs:/logs -v $HOME/neo4j/plugins:/plugins \
    -e NEO4J_ACCEPT_LICENSE_AGREEMENT='yes' \
    -e NEO4J_AUTH='neo4j/password' \
    -e NEO4J_apoc_export_file_enabled=true \
    -e NEO4J_apoc_import_file_enabled=true \
    -e NEO4J_apoc_import_file_use__neo4j__config=true \
    neo4j:3.5.8-enterprise
```

Note: if you want to run the test, spin up the test db:

```
docker run -d -p 7475:7474 -p 7688:7687 -v $HOME/neo4j/data:/test-data -v $HOME/neo4j/logs:/test-logs -v $HOME/neo4j/plugins:/plugins -e NEO4J_AUTH='neo4j/password' -e NEO4J_ACCEPT_LICENSE_AGREEMENT='yes' neo4j:3.5.8-enterprise
```

### Run rabbitMQ

```
docker run -d \
  --publish=8080:15672 \
  --publish=5672:5672 \
  --publish=5671:5671 \
  -e RABITT_MQ_HOST_NAME='localhost' \
  -e RABBITMQ_DEFAULT_PASS='pass' \
  -e RABBITMQ_DEFAULT_USER='user' \
  -e RABBITMQ_DEFAULT_VHOST='vhost' \
  rabbitmq:3-management
```
### Run minio

```
docker run -d -p 9000:9000 \
  -e "MINIO_ACCESS_KEY=OSJ90KMK8FNEILHQOKMS" \
  -e "MINIO_SECRET_KEY=lM02Cnff9RlfQ9cK+tRg5oP3R27glCnPESJ7siW+" \
  -v $HOME/minio/data:/data \
  -v $HOME/minio/config:/root/.minio \
  minio/minio server /data
```
### Run Graylog Localy

Just go to  `src/js/graylog` and run
```
docker-compose up
```

## First use

Signup to localhost:8443. The page will fail as expected, but the user will be created using the Auth0 jwt.
Now that you have a user, can go to http://localhost:7474/browser/ and create the admin Role.

To create the admin, just run the following command, subistituting the email with the email you just used to
create your first user.

```
MATCH (u:User {email: "email"})
MERGE (r:Role {name: "admin"})<-[:HAS_ROLE]-(u)-[:HAS_ROLE]->(r2:Role {name: "super_admin"})
```

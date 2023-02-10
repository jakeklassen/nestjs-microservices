# NestJS Microservices Example

This is using [pnpm](https://pnpm.io/) workspaces to manage the project.

## Libs

- `math` - Shared library used by `math-service`.

## Services

- `web-service` - NestJS web service - REST API and persists to Postgres
- `math-service` - NestJS microservice - Processes operations and responds with results

## Dashboards

- `rabbitmq` - RabbitMQ dashboard - http://localhost:15672
- `jaeger` - Jaeger dashboard - http://localhost:16686 - Use this to check the traces of the services

## Running

Run `docker-compose up -d` from the project root to start the services.

Copy `.env.example` to `.env` in each service.

You can run them both at once:

```sh
$ pnpm --filter @acme-corp/math-service --filter @acme-corp/web-service run start:dev
```

Or just run them individually in separate tabs.

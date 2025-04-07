# Boilerplate Express Server

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/msobiecki/boilerplate-express-server/blob/master/LICENSE)

This repository serves as a boilerplate for setting up an Express server with TypeScript. It includes essential middleware and tools for building a robust and maintainable server application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

Install the dependencies:

```bash
npm install
```

## Usage

### Development

To start the server in development mode, which uses `nodemon` for auto-reloading:

- Single instance:

  ```bash
  npm run dev
  ```

- Cluster mode:
  ```bash
  npm run dev:cluster
  ```

### Production

To build and start the server for production:

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Start the server in cluster mode:
   ```bash
   npm run start:cluster
   ```

## Environment Variables

The application requires the following environment variables, which should be defined in a `.env` file:

| Variable                      | Description                                                    | Default Value |
| ----------------------------- | -------------------------------------------------------------- | ------------- |
| `APP_SCHEMA`                  | Http protocol schema of the application                        | http          |
| `APP_HOSTNAME`                | Hostname of the application                                    | localhost     |
| `APP_PORT`                    | Port number or Unix socket path the application will listen on | 3000          |
| `SWAGGER_ENABLED`             | Enable to display Swagger docs                                 | false         |
| `SWAGGER_PUBLIC_APP_SCHEMA`   | Public http protocol schema for Swagger docs                   | APP_SCHEMA    |
| `SWAGGER_PUBLIC_APP_HOSTNAME` | Public hostname for public Swagger documentation               | APP_HOSTNAME  |
| `SWAGGER_PUBLIC_APP_PORT`     | Public port number for public Swagger documentation            | APP_PORT      |
| `APP_ROUTE_PREFIX`            | Route prefix for the API                                       | /api          |
| `APP_COOKIE_SIGN_SECRET`      | Secret for signing cookies                                     | secret        |
| `CLUSTER_NUMBER_OF_INSTANCES` | Number of cluster instances                                    | 1             |
| `LOG_LEVEL`                   | Level of logging                                               | info          |
| `LOG_PATH`                    | Path to log files                                              | (empty)       |

## Dependencies

| Package               | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `@godaddy/terminus`   | Graceful shutdown for your HTTP server.                    |
| `cookie-parser`       | Parse Cookie header and populate `req.cookies`.            |
| `cors`                | Enable Cross-Origin Resource Sharing (CORS).               |
| `cron`                | A simple cron-like job scheduler for Node.js.              |
| `dotenv`              | Loads environment variables from a `.env` file.            |
| `express-prom-bundle` | Prometheus middleware for Express.                         |
| `express-rate-limit`  | Basic IP rate-limiting middleware.                         |
| `helmet`              | Helps secure Express apps by setting various HTTP headers. |
| `http-status`         | Utility to interact with HTTP status codes.                |
| `pino`                | Super fast, low overhead logging library.                  |
| `pino-http`           | HTTP logger for Express.                                   |
| `pino-pretty`         | Pretty print logs for Pino.                                |
| `prom-client`         | Prometheus client for Node.js.                             |
| `request-ip`          | Middleware for getting a user's IP address.                |
| `swagger-jsdoc`       | Generates swagger spec from JSDoc comments.                |
| `swagger-ui-express`  | Serve swagger-ui for your API docs.                        |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to contribute to this repository by opening issues or submitting pull requests. Happy coding!

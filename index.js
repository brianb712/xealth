// The server
const Hapi = require('@hapi/hapi');

// Output API descriptions and debugging info.
const Blipp = require('blipp');
const Good = require('@hapi/good');

// Provide documentation and debugging support for APIs
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

// The routes
const Alphabetize = require('./src/routes/alphabetize');
const NotFound = require('./src/routes/not-found');

const swaggerOptions = {
  info: {
    title: 'Xealth alphabetize APIs',
    version: '1.0.0',
  },
  host: 'localhost:8080',
  jsonPath: '/xealth/api/',
  documentationPath: '/xealth/api/documentation',
  swaggerUIPath: '/xealth/api/',
};

const server = new Hapi.Server({
  port: 8080,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Content-Type', 'Authorization'],
      additionalHeaders: ['X-Requested-With'],
    },
  },
});

const init = async () => {
  await server.register([
    // routes register
    Alphabetize,
    NotFound,

    // plugins register
    Blipp,
    Inert,
    Vision,
    { plugin: HapiSwagger, options: swaggerOptions },
    {
      plugin: Good,
      options: {
        ops: {
          interval: 10000,
        },
        reporters: {
          consoleReporter: [
            {
              module: '@hapi/good-console',
              args: [
                {
                  log: { exclude: 'health' },
                  response: { exclude: 'health' },
                  request: { exclude: 'health' },
                },
              ],
            },
            'stdout',
          ],
        },
      },
    },
  ]);

  await server.start();
};

init()
  .then(() => {
    console.log(`Server running at ${server.info.uri} API version : ${swaggerOptions.info.version}`);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
    server.stop(() => {
      console.log('Server has been stopped.');
      return process.exit(500);
    });
  });

module.exports = server;

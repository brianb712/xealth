const Hapi = require('@hapi/hapi');
const server = new Hapi.Server();

const HttpStatus = require('http-status-codes');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const NotFound = require('../../routes/not-found');

const { after, before, describe, it } = (exports.lab = Lab.script()); // eslint-disable-line no-multi-assign

describe('notFound endpoint', () => {
  before(() => {
    server.register(NotFound);
  });
  after(() => {
    server.stop();
  });
  it('catches GET requests to unfound paths', async () => {
    const request = {
      method: 'GET',
      url: '/doesNotExist'
    };
    const response = await server.inject(request);
    expect(response.statusCode).to.equal(HttpStatus.NOT_FOUND);
  });
  it('catches PUT requests to unfound paths', async () => {
    const request = {
      method: 'PUT',
      url: '/doesNotExist'
    };
    const response = await server.inject(request);
    expect(response.statusCode).to.equal(HttpStatus.NOT_FOUND);
  });
  it('catches POST requests to unfound paths', async () => {
    const request = {
      method: 'POST',
      url: '/doesNotExist'
    };
    const response = await server.inject(request);
    expect(response.statusCode).to.equal(HttpStatus.NOT_FOUND);
  });
  it('catches PATCH requests to unfound paths', async () => {
    const request = {
      method: 'PATCH',
      url: '/doesNotExist'
    };
    const response = await server.inject(request);
    expect(response.statusCode).to.equal(HttpStatus.NOT_FOUND);
  });
});

import { EventEmitter } from 'events';
import HttpMocks from 'node-mocks-http';
import chai from 'chai';

import { AuthController } from '../../../../api/controller';

const assert = chai.assert;

function buildResponse() {
  return HttpMocks.createResponse({ eventEmitter: EventEmitter });
}

describe('AuthController demo test', () => {
  let req;
  let res;

  beforeEach(() => {
    res = buildResponse();
    req = HttpMocks.createRequest({
      method: 'GET',
      query: {},
      url: '/ping',
      params: {},
    });
  });

  it('should return status code 200 on success', (done) => {
    const result = AuthController.login(req, res);

    result.then(() => {
      assert.equal(res._getStatusCode(), 200);
      done();
    }).catch(e => done(e));
  });
});

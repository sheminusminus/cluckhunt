// @flow

import jwt from 'jsonwebtoken';
import Tokens from 'csrf';
import moment from 'moment';

import { pbkdf2, compareStrings } from '../util';

// models required for typedefs
import { User } from '../db/models';

class AuthService {
  /**
   * AuthService.authenticate
   * Attempt to authenticate as a given user.
   * @param passwordInput The password sent to be verified.
   * @param user The user object to compare for authentication.
   * @returns {User} [authUser]
   */
  static authenticate(passwordInput: string, user: User): ?User {
    const {
      password,
      salt,
    } = user;

    const hashedInput = pbkdf2(passwordInput, salt);

    if (compareStrings(password, hashedInput)) {
      return user;
    }

    return null;
  }

  /**
   * AuthService.createSessionToken
   * Create a jsonwebtoken to be used for bearer authorization.
   * @param {Object} userData - The user data to encode.
   * @returns {{token: string, expiration: number}} JWT string and time of expiration.
   */
  static createSessionToken(userData: Object): Object {
    // current time in seconds
    const now = moment().unix();
    // expires in 24 hours, in seconds
    const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24);

    const payload = {
      iss: 'jubilee',
      exp: expiration,
      iat: now,
      data: userData,
    };

    let encoded;

    try {
      encoded = jwt.sign(payload, process.env.SESSION_KEY);
    } catch (err) {
      throw err;
    }

    return {
      token: encoded,
      expiration,
    };
  }

  /**
   * AuthService.verifySessionToken
   * Try to decode the given jsonwebtoken and return the result.
   * @param sessionToken {string} The token to decode.
   * @returns {*} The decoded result.
   */
  static verifySessionToken(sessionToken: string): any {
    let decoded;

    try {
      decoded = jwt.verify(sessionToken, process.env.SESSION_KEY);
    } catch (err) {
      throw err;
    }

    return decoded;
  }

  /**
   * AuthController.createXsrfToken
   * Create an anti-xsrf token to encode in the JWT and attach to an HttpOnly cookie.
   * @returns {string}
   */
  static createXsrfToken(): string {
    const tokens = new Tokens();
    const secret = tokens.secretSync();
    const xsrfToken = tokens.create(secret);

    return xsrfToken;
  }
}

export default AuthService;

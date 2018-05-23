// @flow
import shortid from 'shortid';
import DataService from './data';
import { randomString, pbkdf2 } from '../util';

import { User } from '../db/models';

type UserData = {
  accessCredential: string,
  accessMethod: string,
  email: Object,
  prefix: ?string,
  suffix: ?string,
  firstName: string,
  middleName: ?string,
  lastName: string,
  cellPhone: ?Object,
  homePhone: ?Object,
  workPhone: ?Object,
  address: ?Object,
  imageUrl: ?string,
  birthdate: ?Object,
  joinDate: ?Object,
  anniversary: ?Object,
  userNotes: ?string,
  families: ?Array<number>,
  groups: ?Array<number>,
  userCategory: ?string,
  directoryId: number,
  allowLogin: boolean,
  accessRoleId: number,
};

class UserService {
  /**
   * UserService.create
   * Kicks off salt generation, password hashing, creating a new database user.
   * @param input {object} Contains email, password, firstName, lastName.
   * @returns {?User} Returns the User that was just created if successful.
   */
  static async create(input: UserData): Promise<?User> {
    const {
      accessCredential,
      accessMethod,
      email,
      prefix,
      suffix,
      firstName,
      middleName,
      lastName,
      cellPhone,
      homePhone,
      workPhone,
      address,
      imageUrl,
      birthdate,
      joinDate,
      anniversary,
      userNotes,
      families,
      groups,
      userCategory,
      directoryId,
      allowLogin,
      accessRoleId = 3, // default to regular member role
    } = input;

    const shortCode = shortid.generate();

    const phones = [];
    if (cellPhone) phones.push(cellPhone);
    // if (homePhone) phones.push(homePhone);
    // if (workPhone) phones.push(workPhone);

    const significantDates = [];
    if (birthdate) significantDates.push(birthdate);
    // if (joinDate) significantDates.push(joinDate);
    // if (anniversary) significantDates.push(anniversary);

    // prep the user object
    const user = {
      accessCredential,
      accessMethod,
      directoryId,
      email: email.email,
      prefix,
      suffix,
      firstName,
      middleName,
      lastName,
      shortCode,
      categoryId: 1,
      imageUrl,
      emailAddresses: [email],
      phones,
      addresses: [address],
      significantDates,
      userNotes,
      families,
      groups,
      allowLogin,
      accessRoleId,
    };

    // try to create the user
    return DataService.createUser(user);
  }

  /**
   * Ask the data service to find the user for an email address.
   * @param email {string}
   * @returns {?User}
   */
  static async getUserByEmail(email: string): Promise<?User> {
    return DataService.getUserByEmail(email);
  }

  /**
   * Ask the data service to find the user for an id.
   * @param id {number}
   * @returns {?User}
   */
  static async getUserById(id: number): Promise<?User> {
    return DataService.getUserById(id);
  }

  /**
   * Find the user attached to a given sms code record.
   * @param phone {string}
   * @param code {string}
   * @returns {?User}
   */
  static async getUserForSmsCode(phone: string, code: string): Promise<?User> {
    const smsCodeRecord = await DataService.getSmsCodeRecord(phone, code);
    if (smsCodeRecord) {
      return DataService.getUserById(smsCodeRecord.userId);
    }

    return undefined;
  }

  /**
   * Verify this user can use the given phone number.
   * @param phone {string}
   * @param userId {number}
   * @returns {Promise<?boolean>}
   */
  static async isLoginPhoneValid(phone: string, userId: number): Promise<?boolean> {
    return DataService.getUserSmsPhoneMatch(userId, phone);
  }

  /**
   * Ask the data service to find the user for a shortCode.
   * @param shortCode {string}
   * @returns {?User}
   */
  static async getUserByShortCode(shortCode: string): Promise<?User> {
    return DataService.getUserByShortCode(shortCode);
  }

  /**
   * Checks if the email address already exists. If so, return false (invalid).
   * In future we can modify to contain more tests.
   * @param email {string}
   * @returns {Promise.<boolean>}
   */
  static async isSignupEmailValid(email: string): Promise<boolean> {
    const existing = await UserService.getUserByEmail(email);
    return !existing;
  }

  /**
   * UserService.validate
   * Decide which type of validation to use.
   * @param type {string}
   * @param input {*}
   * @returns {boolean} Whether the input to validate is valid or not.
   */
  static async validate(type: string, input: any): Promise<boolean> {
    switch (type) {
      case 'SIGNUP_EMAIL':
        return UserService.isSignupEmailValid(input);
      default:
        throw new Error('No type passed to validate()');
    }
  }
}

export default UserService;

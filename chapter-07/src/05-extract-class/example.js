/**
 * 리팩토링 전
 */
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }

  get officeNumber() {
    return this._officeNumber;
  }
}
/**
 * 리팩토링 후
 */
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }
}

class TelephoneNumber {
  get _areaCode() {
    return this._areaCode;
  }

  get number() {
    return this._number;
  }
}
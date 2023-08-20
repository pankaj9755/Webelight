class Constants {
  constructor() {}
  static ordering = {
    ASC: "ASC",
    DESC: "DESC",
  };
  static DEFAULTS = {
    LIMIT: 10,
  };
  static statusValues = {
    // like active, inactive
    active: 1,
    inactive: 0,
  };

  static messages = {
    emailNotFound:'User email not found',
    successful: "Successful",
    passwordNotNatch: 'Password not match',
    notAuthorized: 'Not Authorized',
    dataNotFound: "Record not found",
  };
  static validationMessage = {
    emailUnique: "The specified e-mail address already exists",
    mobileUnique: "Phone number already exists",
  };
}
export default Constants;

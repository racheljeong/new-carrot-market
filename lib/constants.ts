
export const MIN_LENGTH = 4;

export const PWD_REGEX = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
  );

//error msg
export const PWD_REGEX_ERRORMSG = "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";
export const phoneValidator = (phone) => {
  if (!phone || phone.length <= 0) return 'Phone cannot be empty.';
  if (phone.length <= 8) return 'Phone cannot be less than 8.';

  return '';
};
export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  if (password.length < 8) return 'Password cannot be less than 8.';

  return '';
};

export const emailValidator = (email) => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.match(validRegex)) return 'Invalid email address!"';

  return '';
};
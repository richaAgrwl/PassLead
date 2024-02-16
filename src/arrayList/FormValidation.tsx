import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup
    .string()
    .required('This field is required')
    .matches(
      /^[a-zA-Z]/,
      'This field cannot start with number and special character'
    )
    .min(2),

  email: yup.string().email().required(),
  address: yup.string().min(5).required('This field is required'),
  postal_code: yup
    .number()
    .typeError("That doesn't look like a postal code")
    .positive("Postal code can't start with a minus or zero")
    .integer("A number can't include a decimal point")
    .test(
      'no-e',
      "postal can't contain the letter 'e'",
      (value) => !value || String(value).indexOf('e') === -1
    )
    .required('This field is required')
    .min(5),
  city: yup.string().required('This field is required'),
  state: yup.string().required('This field is required'),
  password: yup
    .string()
    .required('Password is required')
    .max(8, 'Password must be 8 characters long')
    .min(6, 'Password must have at least 6 characters ')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  userType: yup.string().required('This field is required'),

  agencyName: yup.string().when('userType', ([userType], schema) => {
    if (userType === 'agency')
      return yup.string().required('This field is required');
    return schema;
  }),
  agencyUrl: yup.string().when('company', ([radioButton], schema) => {
    if (radioButton === 'agency')
      return yup.string().url().required('This field is required');
    return schema;
  }),
  registerAs: yup.string().required(),
  country: yup.string().required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required('Password is required'),
});
const verificationSchema = yup.object().shape({
  oneVariCode: yup.number().max(1, 'maximum one character'),
  towVariCode: yup.number().max(1, 'maximum one character'),
  threeVariCode: yup.number().max(1, 'maximum one character'),
  fourVariCode: yup.number().max(1, 'maximum one character'),
  fiveVariCode: yup.number().max(1, 'maximum one character'),
  sixVariCode: yup.number().max(1, 'maximum one character'),
});
// leadValidationSchema
const allowedFileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'mp3',
  'mp4',
  'webm',
];

const leadValidationSchema = yup.object().shape({
  leadTitle: yup
    .string()
    .required('This field is required')
    .matches(
      /^[a-zA-Z]/,
      'This field cannot start with number and special character'
    )
    .min(4),
  leadDescription: yup.string().min(10).required('This field is required'),
  approxBudget: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("Budget can't start with a minus or zero")
    .integer("A number can't include a decimal point")
    .test(
      'no-e',
      "Budget can't contain the letter 'e'",
      (value) => !value || String(value).indexOf('e') === -1
    )
    .required('This field is required')
    .typeError('This field is required'),
  //preferredLocation: yup.string().min(10).required('This field is required'),
  leadEmail: yup.string().email().required('This field is required'),
  leadPhone: yup
    .string()
    .required('This field is required')
    .test('is-phone-number', 'Invalid phone number', (value) => {
      // Define a regular expression to match valid phone numbers
      const phoneRegex = /^[0-9]{10}$/; // This example assumes 10-digit phone numbers

      if (!phoneRegex.test(value)) {
        return false; // Validation fails if the phone number doesn't match the regex
      }

      return true; // Validation passes
    }),
  clientLocation: yup.string().required('This field is required'),

  numberApplication: yup.number().required('This field is required'),
  leadProof: yup
    .array()
    .test('fileType', 'Invalid file type', (value) => {
      if (!value || value.length === 0) {
        // No files selected, validation passes
        return true;
      }

      const invalidFiles = value.filter((file) => {
        // Get the file extension
        const fileExtension = file.name.split('.').pop().toLowerCase();

        // Check if the file extension is in the list of allowed extensions
        return !allowedFileExtensions.includes(fileExtension);
      });

      // Return true if all files are valid, otherwise false
      return invalidFiles.length === 0;
    })
    .required('Please select a file'),
});

const emailValidateSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
});

const passwordValidateSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .max(8, 'Password must be 8 characters long')
    .min(6, 'Password must have at least 6 characters ')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const updateUserSchema = yup.object().shape({
  userName: yup
    .string()
    .matches(
      /^[a-zA-Z]/,
      'This field cannot start with number and special character'
    )
    .min(2),

  userAddress: yup.string().min(5),

  newPassword: yup
    .string()
    .max(8, 'Password must be 8 characters long')
    .min(6, 'Password must have at least 6 characters ')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  userType: yup.string().required('This field is required'),

  userAgencyName: yup.string().when('userType', ([userType], schema) => {
    if (userType === 'agency')
      return yup.string().required('This field is required');
    return schema;
  }),
  userAgencyUrl: yup.string().when('company', ([radioButton], schema) => {
    if (radioButton === 'agency')
      return yup.string().url().required('This field is required');
    return schema;
  }),
});

export {
  userSchema,
  loginSchema,
  leadValidationSchema,
  verificationSchema,
  emailValidateSchema,
  passwordValidateSchema,
  updateUserSchema,
};

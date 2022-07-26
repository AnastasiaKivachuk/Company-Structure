type MESSAGES_MAP = { [key: string]: string };

export const FORM_FIELDS_ERRORS: MESSAGES_MAP = {
  REQUIRED: 'This field is required',
  SHOULD_BE_NO_MORE_AVAILABLE: 'Should be no more available',
  SHOULD_BE_NO_MORE: 'Should not be more than [max]',
  SHOULD_BE_AT_LEAST: 'Should be at least [min]',
  MIN_LENGTH: 'Min length: [min]',
  MAX_LENGTH: 'Max length: [max]',
  DEFAULT_ERROR: 'An error has been occurred',
  ONLY_LATIN: 'Please use only Latin symbols',
  URL_INCORRECT: 'Url is incorrect',
};

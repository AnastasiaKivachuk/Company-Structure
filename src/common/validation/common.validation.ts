import * as yup from 'yup';
import { FORM_FIELDS_ERRORS } from '../constants/messages.constants';

export const isRequired = yup
  .string()
  .trim()
  .required(FORM_FIELDS_ERRORS.REQUIRED);

export const stringRequiredYup = (min: number, max: number) => yup
  .string()
  .trim()
  .required(FORM_FIELDS_ERRORS.REQUIRED)
  .min(min, FORM_FIELDS_ERRORS.MIN_LENGTH.replace('[min]', String(min)))
  .max(max, FORM_FIELDS_ERRORS.SHOULD_BE_NO_MORE.replace('[max]', String(max)));

export const checkUrlYup = yup.string().trim()
  .required(FORM_FIELDS_ERRORS.REQUIRED).url(FORM_FIELDS_ERRORS.URL_INCORRECT);

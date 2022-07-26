import * as yup from 'yup';
import { checkUrlYup, stringRequiredYup } from '@validation/common.validation';

export const FIELD_NAMES = {
  NAME: 'name',
  POSITION: 'position',
  PHOTO_URL: 'photoUrl',
};

export const schema = yup.object().shape({
  [FIELD_NAMES.NAME]: stringRequiredYup(1, 50),
  [FIELD_NAMES.POSITION]: stringRequiredYup(1, 50),
  [FIELD_NAMES.PHOTO_URL]: checkUrlYup,
});

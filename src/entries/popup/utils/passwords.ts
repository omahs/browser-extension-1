import { passwordStrength } from 'check-password-strength';

import { i18n } from '~/core/languages';

export const strengthMeta = [
  {
    text: i18n.t('passwords.too_weak'),
    color: 'orange',
    symbol: 'exclamationmark.triangle.fill',
  },
  {
    text: i18n.t('passwords.weak'),
    color: 'orange',
    symbol: 'exclamationmark.triangle.fill',
  },
  {
    text: i18n.t('passwords.strong'),
    color: 'green',
    symbol: 'checkmark.shield.fill',
  },
];

export const passwordStrengthOptions = [
  {
    id: 0,
    value: 'Too weak',
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: 'Weak',
    minDiversity: 0,
    minLength: 8,
  },
  {
    id: 2,
    value: 'Strong',
    minDiversity: 4,
    minLength: 8,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
] as Options;

export const getPasswordStrength = (password: string) => {
  return passwordStrength(password, passwordStrengthOptions).id;
};

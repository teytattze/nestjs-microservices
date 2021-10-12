import * as moment from 'moment';

export const getCurrentUnixTime = (): number => {
  return moment().unix();
};

export const getExpiresTime = (duration: number): number => {
  return moment()
    .add(duration * 1000)
    .unix();
};

export const checkExpiration = (expires: number | string): boolean => {
  const currentTime = getCurrentUnixTime();
  if (typeof expires === 'string') {
    return currentTime >= parseInt(expires);
  }
  return currentTime >= expires;
};

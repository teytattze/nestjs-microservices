import * as moment from 'moment';

export const getCurrentUnixTime = (): number => {
  return moment().unix();
};

export const getExpiresTime = (duration: number): number => {
  return moment()
    .add(duration * 1000)
    .unix();
};

export const isExpired = (expires: Date): boolean => {
  const now = moment().toISOString();
  return moment(expires).isBefore(now);
};

export const createExpiredDate = (duration: number): Date => {
  return moment()
    .add(duration * 1000)
    .toDate();
};

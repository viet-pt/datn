import moment from 'moment';

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const convertTime = (date, FORMAT_TIME) => {
  if (!date) {
    return date;
  }
  return moment(date).utc().format(FORMAT_TIME || "DD/MM/YYYY HH:mm");
}
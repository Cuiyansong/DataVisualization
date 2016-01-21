export const FETCH_DATA_BY_MONTH = 'FETCH_DATA_BY_MONTH';

export function fetchDataByMonth(month) {
  return {
    type: FETCH_DATA_BY_MONTH,
    month
  }
};

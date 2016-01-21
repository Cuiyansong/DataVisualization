import { FETCH_DATA_BY_MONTH } from '../Actions/migration-map';

export function data(state = {}, action) {
  return []
}

export function counter(state = { count: 0 }, action) {
  let count = state.count;
  switch (action.type) {
  case 'increase':
    return { count: count + 1 };
  default:
    return state
  }
}

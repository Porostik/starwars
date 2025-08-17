import { getPerson } from './current';
import { getPeoples } from './list';

export const people = {
  list: getPeoples,
  current: getPerson
};

export * from './types';

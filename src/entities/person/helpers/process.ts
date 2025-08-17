import type { Person } from '@/shared/api';
import type { ProcessPerson } from '../types';

export const processPerson = (person: Person) => {
  return {
    ...person,
    id: Number(person.url.split('/').slice(-2)[0])
  };
};

export const processPeoples = (peoples: Person[]): ProcessPerson[] => {
  return peoples.map(processPerson);
};

import { $client } from '../client';
import type { PaginatedResponse } from '../types';
import type { GetPeoplesParams, Person } from './types';

export const getPeoples = (params: GetPeoplesParams) => {
  return $client.get<PaginatedResponse<Person>>('/people', {
    params
  });
};

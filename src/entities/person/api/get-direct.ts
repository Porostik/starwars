import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import type { DirectResponse } from '../types';

const getDirectKey = (url: string) => ['direct', url];

export const getDirectOptions = (url: string) =>
  queryOptions({
    queryKey: getDirectKey(url),
    queryFn: async () => {
      const { data } = await axios.get<DirectResponse>(url);
      return data;
    }
  });

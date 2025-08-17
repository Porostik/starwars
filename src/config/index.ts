import { z } from 'zod';
import { createEnv } from '@/shared/lib/env';

export const config = createEnv({
  shape: {
    API_URL: z.string()
  },
  env: import.meta.env,
  keyFormat: (key) => `VITE_${key}`
});

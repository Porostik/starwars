import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProcessPerson } from '../types';

interface RewriteState {
  rewrites: Record<string, ProcessPerson>;

  onRewrite: (person: ProcessPerson) => void;
}

export const useRewriteStore = create<RewriteState>()(
  persist(
    (set) => ({
      rewrites: {},

      onRewrite: (person) => {
        set((state) => ({
          rewrites: {
            ...state.rewrites,
            [person.id]: person
          }
        }));
      }
    }),
    {
      name: 'rewrites-person'
    }
  )
);

export const useGetMergedPerson = (person: ProcessPerson) => {
  const rewrites = useRewriteStore((state) => state.rewrites)[person.id];

  return {
    ...person,
    ...(rewrites ? rewrites : {})
  };
};

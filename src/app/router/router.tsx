import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './route-tree.gen';
import { queryClient } from '../query/client';

// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface HistoryState {
    returnUrl: string;
  }
}

export const AppRouter = () => <RouterProvider router={router} />;

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import BgImg from '@/shared/assets/background.jpg';
import { Header } from '@/widgets/header';
import type { RouteContext } from '@/shared/types';

const Root = () => {
  return (
    <div
      className="w-full h-full flex flex-col gap-y-3 overflow-hidden"
      style={{
        background: `url(${BgImg}) no-repeat center center fixed`
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: Root
});

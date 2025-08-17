import { useEffect, useState } from 'react';

export const useIsShowPendingText = (isPending: boolean, thresholdMs: number) => {
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (!isPending) {
      setShow(false);
      return;
    }
    const id = setTimeout(() => setShow(true), thresholdMs);
    return () => clearTimeout(id);
  }, [isPending, thresholdMs]);

  return {
    isShow,
    isPending
  };
};

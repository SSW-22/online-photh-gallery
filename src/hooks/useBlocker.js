import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

import { useContext, useEffect } from "react";

export default function useBlocker(blocker, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    // eslint-disable-next-line consistent-return
    return unblock;
  }, [navigator, blocker, when]);
}

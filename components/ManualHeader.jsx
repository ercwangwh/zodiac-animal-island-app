import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Home() {
  const { enableWeb3, isWeb3Enabled, account } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
  }, [isWeb3Enabled]);

  let conneted = false;
  return (
    <div>
      {account ? (
        <div>Conneted to {account}</div>
      ) : (
        <button onClick={async () => await enableWeb3()}>Conneted</button>
      )}
    </div>
  );
}

import { ConnectButton, Input, Button } from "web3uikit";

export default function Header() {
  return (
    <nav
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      <h1 className="py-4 px-4 font-bold text-3xl"> Zodia Animal Island</h1>
      <div
        style={{
          margin: "20px",
        }}
      >
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
}

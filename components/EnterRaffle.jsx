import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

// import { useNotification } from "web3uikit";
// import { Button } from "web3uikit/dist/components/Button";
// import abi from "../constants/abi.json";
// import contractAddresses from "../constants/contractAddresses.json";

export default function EnterRaffle() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  // console.log(parseInt(chainIdHex));
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [entranceFee, setEntranceFee] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [winnerZodia, setRecentWinner] = useState("0");
  const [raffleState, setRaffleState] = useState("0");

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getWinnerZodia } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getWinnerZodia",
    params: {},
  });

  const { runContractFunction: getPlayersNumber } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumPlayers",
    params: {},
  });

  const { runContractFunction: getRaffleState } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRaffleState",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled]);

  async function updateUIValues() {
    // Another way we could make a contract call:
    // const options = { abi, contractAddress: raffleAddress }
    // const fee = await Moralis.executeFunction({
    //     functionName: "getEntranceFee",
    //     ...options,
    // })
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numPlayersFromCall = (await getPlayersNumber()).toString();
    const winnerZodiaFromCall = (await getWinnerZodia()).toString();
    const raffleStateFromCall = (await getRaffleState()).toString();

    setRaffleState(raffleStateFromCall);

    setEntranceFee(entranceFeeFromCall);
    setNumberOfPlayers(numPlayersFromCall);
    setRecentWinner(winnerZodiaFromCall);
    // console.log(numPlayersFromCall);
    // console.log("getEntranceFee:", entranceFeeFromCall);
  }

  return (
    <div>
      {/* {raffleAddress ? (
        <div>
          <div>Raffle State: {raffleState}</div>
          <div>
            Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} MTAIC
          </div>
          <div>The current number of players is: {numberOfPlayers}</div>
          <div>Last winner zodia is: {winnerZodia}</div>
        </div>
      ) : (
        <div>No Contract Adddress Detected</div>
      )} */}
    </div>
  );
}

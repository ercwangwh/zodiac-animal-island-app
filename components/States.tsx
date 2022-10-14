import { useEffect, useState } from "react";
import { useContractReads, useContractEvent } from "wagmi";
import { abi } from "../constants";
import { ethers } from "ethers";
type CardIdObject = {
  cardId: number;
};
const raffleContract = {
  addressOrName: "0x4710a165c4944e3069a21b60d8d5cec650da59c2",
  contractInterface: abi,
};

const stateUintToEnum = ["Open", "Caculating", "Closed"];
const zodiaUintToEnum = [
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
];

function States({ cardId }: CardIdObject) {
  const [raffleState, setRaffleState] = useState("0");
  const [entranceFee, setEntranceFee] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [winnerZodiac, setWinnerZodiac] = useState("0");

  const [cardIdState, setCardIdState] = useState(0);

  useEffect(() => {
    // if (data) {
    setCardIdState(cardId);
    console.log("use effect", cardId);
    const refetchData = refetch();
    console.log(refetchData.then());
    // if (typeof refetchData !== "undefined") {
    //   const raffleStateFromCall: string = refetchData[0].toString();
    //   const entranceFeeFromCall: string = data[1].toString();
    //   const numberOfPlayersFromCall: string = data[2]?.toString();
    //   const winnerZodiacFromCall: string = data[3].toString();

    //   setRaffleState(raffleStateFromCall);
    //   setEntranceFee(entranceFeeFromCall);
    //   setNumberOfPlayers(numberOfPlayersFromCall);
    //   setWinnerZodiac(winnerZodiacFromCall);
    //   // console.log(
    //   //   "inUpdate",
    //   //   raffleStateFromCall,
    //   //   entranceFeeFromCall,
    //   //   numberOfPlayersFromCall
    //   // );
    // }

    // console.log("Data No Change");
  }, [cardId]);

  useContractEvent({
    ...raffleContract,
    eventName: "raffleEnter",
    listener: () => {
      updateUIValues();
      // refetch();
      console.log("Tese");
    },
  });

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...raffleContract,
        functionName: "getRaffleState",
      },
      {
        ...raffleContract,
        functionName: "getEntranceFee",
      },
      {
        ...raffleContract,
        functionName: "getNumPlayers",
      },
      {
        ...raffleContract,
        functionName: "getWinnerZodia",
      },
    ],
  });

  if (cardIdState) {
    refetch();
    console.log("refetch....");
  }

  async function updateUIValues() {
    if (typeof data !== "undefined") {
      const raffleStateFromCall: string = data[0].toString();
      const entranceFeeFromCall: string = data[1].toString();
      const numberOfPlayersFromCall: string = data[2]?.toString();
      const winnerZodiacFromCall: string = data[3].toString();

      setRaffleState(raffleStateFromCall);
      setEntranceFee(entranceFeeFromCall);
      setNumberOfPlayers(numberOfPlayersFromCall);
      setWinnerZodiac(winnerZodiacFromCall);
      // console.log(
      //   "inUpdate",
      //   raffleStateFromCall,
      //   entranceFeeFromCall,
      //   numberOfPlayersFromCall
      // );
    }
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
          <img src="/images/1.svg" alt="Logo" />
        </div>

        <div className="ml-4">
          <h2 className="font-semibold">Raffle State {cardId}</h2>
          <p className="mt-2 text-sm text-gray-500">
            {stateUintToEnum[parseInt(raffleState)]}
          </p>
        </div>
      </div>

      <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
          <img src="/images/2.svg" alt="Logo" />
        </div>

        <div className="ml-4">
          <h2 className="font-semibold">Entrance Fee </h2>
          <p className="mt-2 text-sm text-gray-500">
            {ethers.utils.formatUnits(entranceFee, "ether")} MTAIC
          </p>
        </div>
      </div>
      <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
          <img src="/images/3.svg" alt="Logo" />
        </div>

        <div className="ml-4">
          <h2 className="font-semibold">Current number of players</h2>
          <p className="mt-2 text-sm text-gray-500">{numberOfPlayers}</p>
        </div>
      </div>
      <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
          <img src="/images/4.svg" alt="Logo" />
        </div>

        <div className="ml-4">
          <h2 className="font-semibold">Last winner zodia</h2>
          <p className="mt-2 text-sm text-gray-500">
            {zodiaUintToEnum[parseInt(winnerZodiac)]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default States;

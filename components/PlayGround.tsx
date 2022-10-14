import React from "react";
import { useEffect, useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractReads,
} from "wagmi";
import { abi } from "../constants";
import { ethers } from "ethers";

interface DataPipe {
  data: ethers.utils.Result[] | undefined;
}

type CardProps = {
  cardId: number;
  cardName: string;
  cardDescrption: string;
  updatUI: (data: ethers.utils.Result[] | undefined) => void;
};

function Card({ cardName, cardDescrption, cardId, updatUI }: CardProps) {
  const { config } = usePrepareContractWrite({
    addressOrName: "0x4710a165C4944E3069a21B60D8d5CEc650dA59C2",
    contractInterface: [
      {
        type: "function",
        name: "enterRaffle",
        constant: false,
        stateMutability: "payable",
        payable: true,
        inputs: [{ type: "uint8", name: "_playerChoosen" }],
        outputs: [],
      },
    ],
    functionName: "enterRaffle",
    args: cardId,
    enabled: Boolean(cardId),
    overrides: {
      value: ethers.utils.parseEther("0.01"),
    },
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const {
    data: readData,
    isError,
    refetch,
  } = useContractReads({
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

  if (isSuccess) {
    // if (typeof readData !== "undefined") {
    // refetch().then()
    refetch().then(function (result) {
      updatUI(result.data);
      console.log(result.data);
    });

    // }
  }

  return (
    <div
      className="flex justify-center items-center bg-center bg-white rounded-md"
      style={{ backgroundImage: "url('/images/" + cardName + ".jpg')" }}
    >
      <div className="flex flex-col justify-end w-72 sm:w-72 h-96  text-gray-800 overflow-hidden cursor-pointer ">
        <div className="bg-white bg-opacity-95 shadow-md rounded-xl p-4 flex flex-col mx-4 mb-4">
          <h3 className="text-xl font-bold pb-2">{cardName}</h3>
          <p className="text-gray-500 text-sm pb-2">{cardDescrption}</p>
          <div className="flex justify-center items-center">
            <button
              disabled={!write || isLoading}
              className="p-2 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-sm rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                write?.();
              }}
            >
              {isLoading ? "Entering..." : "Pick and GO!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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

function PlayGround() {
  const [raffleState, setRaffleState] = useState("0");
  const [entranceFee, setEntranceFee] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [winnerZodiac, setWinnerZodiac] = useState("0");

  useEffect(() => {
    // if (data) {
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
    console.log("Data Change");
  }, [raffleState, entranceFee, numberOfPlayers, winnerZodiac]);

  async function updateUIValues(data: ethers.utils.Result[] | undefined) {
    if (typeof data !== "undefined") {
      const raffleStateFromCall: string = data[0].toString();
      const entranceFeeFromCall: string = data[1].toString();
      const numberOfPlayersFromCall: string = data[2]?.toString();
      const winnerZodiacFromCall: string = data[3].toString();

      setRaffleState(data[0].toString());
      setEntranceFee(data[1].toString());
      setNumberOfPlayers(data[2]?.toString());
      setWinnerZodiac(data[3].toString());

      console.log(
        "updateUIvalues",
        raffleState,
        entranceFee,
        numberOfPlayers,
        winnerZodiac
      );
    }
  }

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
            <img src="/images/1.svg" alt="Logo" />
          </div>

          <div className="ml-4">
            <h2 className="font-semibold">Raffle State</h2>
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
            <h2 className="font-semibold">Current Players </h2>
            <p className="mt-2 text-sm text-gray-500">{numberOfPlayers}</p>
          </div>
        </div>
        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
            <img src="/images/4.svg" alt="Logo" />
          </div>

          <div className="ml-4">
            <h2 className="font-semibold">Last Winner Zodiac</h2>
            <p className="mt-2 text-sm text-gray-500">
              {zodiaUintToEnum[parseInt(winnerZodiac)]}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between flex-wrap gap-5">
        <Card
          cardId={0}
          cardName="Rat"
          cardDescrption="Master yourself, master the enemy."
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={1}
          cardName="Ox"
          cardDescrption="Mess with the bull, and you get the horns!"
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={2}
          cardName="Tiger"
          cardDescrption="I will fail, but to surrender is a privilege I do not have."
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={3}
          cardName="Rabbit"
          cardDescrption="I am the fire of Shojin. Face me with all your strength."
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={4}
          cardName="Dragon"
          cardDescrption="I bloodied my knuckles to sharpen my fists."
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={5}
          cardName="Snake"
          cardDescrption="How would greet each other ovwer the years?"
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={6}
          cardName="Horse"
          cardDescrption="I will rise again, more powerful than you can ever imagine."
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={7}
          cardName="Goat"
          cardDescrption="Death is not the end for you. I have seen to it."
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={8}
          cardName="Monkey"
          cardDescrption="By my will this shall be finished. Give up now!"
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={9}
          cardName="Rooster"
          cardDescrption="Expand too far, and you lose your center."
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={10}
          cardName="Dog"
          cardDescrption="The cycle of life and death continues,we will live."
          updatUI={updateUIValues}
        ></Card>
        <Card
          cardId={11}
          cardName="Pig"
          cardDescrption="You deny the darkness in your soul, you deny your power!"
          updatUI={updateUIValues}
        ></Card>
      </div>
    </div>
  );
}

export default PlayGround;

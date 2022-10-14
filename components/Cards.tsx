import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

interface StatesProps {
  transFunc: (id: number) => void;
}
type CardProps = {
  cardId: number;
  cardName: string;
  cardDescrption: string;
  transactionStateFunc: (id: number) => void;
};

function Card({
  cardName,
  cardDescrption,
  cardId,
  transactionStateFunc,
}: CardProps) {
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

  if (isSuccess) {
    transactionStateFunc(cardId);
    console.log(cardId);
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

function Cards({ transFunc }: StatesProps) {
  return (
    <div className="flex flex-row justify-between flex-wrap gap-5">
      <Card
        cardId={0}
        cardName="Rat"
        cardDescrption="Master yourself, master the enemy."
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={1}
        cardName="Ox"
        cardDescrption="Mess with the bull, and you get the horns!"
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={2}
        cardName="Tiger"
        cardDescrption="I will fail, but to surrender is a privilege I do not have."
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={3}
        cardName="Rabbit"
        cardDescrption="I am the fire of Shojin. Face me with all your strength."
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={4}
        cardName="Dragon"
        cardDescrption="I bloodied my knuckles to sharpen my fists."
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={5}
        cardName="Snake"
        cardDescrption="How would greet each other ovwer the years?"
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={6}
        cardName="Horse"
        cardDescrption="I will rise again, more powerful than you can ever imagine."
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={7}
        cardName="Goat"
        cardDescrption="Death is not the end for you. I have seen to it."
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={8}
        cardName="Monkey"
        cardDescrption="By my will this shall be finished. Give up now!"
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={9}
        cardName="Rooster"
        cardDescrption="Expand too far, and you lose your center."
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={10}
        cardName="Dog"
        cardDescrption="The cycle of life and death continues,we will live."
        transactionStateFunc={transFunc}
      ></Card>
      <Card
        cardId={11}
        cardName="Pig"
        cardDescrption="You deny the darkness in your soul, you deny your power!"
        transactionStateFunc={transFunc}
      ></Card>
    </div>
  );
}

export default Cards;

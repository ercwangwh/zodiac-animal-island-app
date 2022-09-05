import { Card, Avatar, useNotification } from "web3uikit";
import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";
import { resolve } from "styled-jsx/css";
// import testImg from "../icons/Rat.svg";

export default function Cards() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  // console.log(parseInt(chainIdHex));
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
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
  // console.log(raffleAddress);

  const [entranceFee, setEntranceFee] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [winnerZodia, setRecentWinner] = useState("0");
  const [raffleState, setRaffleState] = useState("0");
  const [_clickPlayerChoosen, setPlayerChoosen] = useState(0);

  const dispatch = useNotification();

  // const { runContractFunction: getPlayerChoosen } = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: raffleAddress, // specify the networkId
  //   functionName: "getPlayerChoosen",
  //   params: { index: _clickPlayerChoosen },
  // });

  // const options = {
  //   abi: abi,
  //   contractAddress: raffleAddress,
  //   functionName: "enterRaffle",
  //   params: {
  //     secondsAgos: [0, 10],
  //   },
  // };
  let playerChoose = 0;
  function setPlayerChoose(choose) {
    playerChoose = choose;
  }

  const { runContractFunction: enterRaffleRat, data: enterTxResponseRat } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee,
      params: { _playerChoosen: 0 },
    });

  const { runContractFunction: enterRaffleOx, data: enterTxResponseOx } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee,
      params: { _playerChoosen: 1 },
    });

  const { runContractFunction: enterRaffleTigger, data: enterTxResponseTiger } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee,
      params: { _playerChoosen: 2 },
    });

  const {
    runContractFunction: enterRaffleRabbit,
    data: enterTxResponseRabbit,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: { _playerChoosen: 3 },
  });

  const {
    runContractFunction: enterRaffleDragon,
    data: enterTxResponseDragon,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: { _playerChoosen: 4 },
  });

  const { runContractFunction: enterRaffleSnake, data: enterTxResponseSnake } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee,
      params: { _playerChoosen: 5 },
    });

  const { runContractFunction: enterRaffleHorse, data: enterTxResponseHorse } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee,
      params: { _playerChoosen: 6 },
    });

  const { runContractFunction: enterRaffleGoat, data: enterTxResponseGoat } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee,
      params: { _playerChoosen: 7 },
    });

  const {
    runContractFunction: enterRaffleMonkey,
    data: enterTxResponseMonkey,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: { _playerChoosen: 8 },
  });

  const {
    runContractFunction: enterRaffleRooster,
    data: enterTxResponseRooster,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: { _playerChoosen: 9 },
  });

  const { runContractFunction: enterRaffleDog, data: enterTxResponseDog } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee,
      params: { _playerChoosen: 10 },
    });

  const { runContractFunction: enterRafflePig, data: enterTxResponsePig } =
    useWeb3Contract({
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee,
      params: { _playerChoosen: 11 },
    });

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

    // const playerAddressFromCall = (await getPlayerAddress()).toString();
    // const playerChoosenFromCall = (await getPlayerChoosen()).toString();
    // const playerEntranceFeeFromCall = (await getPlayerEntranceFee()).toString();
    const raffleStateFromCall = await getRaffleState();
    // const recentWinnerFromCall = await getRecentWinner();
    setEntranceFee(entranceFeeFromCall);
    setNumberOfPlayers(numPlayersFromCall);
    setRecentWinner(winnerZodiaFromCall);
    setRaffleState(raffleStateFromCall);

    // setPlayerAddress(playerAddressFromCall);
    // setPlayerChoosen(_clickPlayerChoosen);
    // setPlayerEntranceFee(playerEntranceFeeFromCall);
    // console.log(numPlayersFromCall);
    console.log(
      "getEntranceFee:",
      entranceFeeFromCall
      // "playerChoosenFromCall:",
      // playerChoosenFromCall,
    );
  }

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  // Probably could add some error handling
  const handleSuccess = async (tx) => {
    await tx.wait(1);
    updateUIValues();
    handleNewNotification(tx);
  };

  function waitPlayerChoose(choose) {
    return new Promise((resolve, reject) => {
      try {
        setPlayerChoosen(choose);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  return (
    <div>
      <div>Raffle State: {stateUintToEnum[raffleState]}</div>
      <div>
        Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} MTAIC
      </div>
      <div>The current number of players is: {numberOfPlayers}</div>
      <div>Last winner zodia is: {zodiaUintToEnum[winnerZodia]}</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div
          // onClick={() => setPlayerChoosen(0)}
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Rat"
            onClick={async function enterRaffleAsync() {
              setPlayerChoose(0);
              console.log("playerchoose", playerChoose);
              await enterRaffleRat({
                // onComplete:
                // onError:
                // params: { _playerChoosen: 1 },
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Rat"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Rat.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          // onClick={() => setPlayerChoosen(1)}
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Ox"
            onClick={async function enterRaffleAsync() {
              // await waitPlayerChoose(1);
              // console.log("_clickPlayerChoosen", _clickPlayerChoosen);
              // await waitPlayerChoose(4);
              // console.log("_clickPlayerChoosenChange", _clickPlayerChoosen);
              setPlayerChoose(1);
              console.log("playerchoose", playerChoose);
              await enterRaffleOx({
                // onComplete:
                // onError:
                // params: { _playerChoosen: 1 },
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Ox"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Ox.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Tiger"
            onClick={async function () {
              setPlayerChoose(2);
              console.log("playerchoose", playerChoose);
              await enterRaffleTigger({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Tiger"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Tiger.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Rabbit"
            onClick={async function () {
              setPlayerChoose(3);
              console.log("playerchoose", playerChoose);
              await enterRaffleRabbit({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Rabbit"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Rabbit.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Dragon"
            onClick={async function () {
              setPlayerChoose(4);
              console.log("playerchoose", playerChoose);
              await enterRaffleDragon({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Dragon"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Dragon.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Snake"
            onClick={async function () {
              setPlayerChoose(5);
              console.log("playerchoose", playerChoose);
              await enterRaffleSnake({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Snake"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Snake.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Horse"
            onClick={async function () {
              setPlayerChoose(6);
              console.log("playerchoose", playerChoose);
              await enterRaffleHorse({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Horse"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Horse.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Goat"
            onClick={async function () {
              setPlayerChoose(7);
              console.log("playerchoose", playerChoose);
              await enterRaffleGoat({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Goat"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Goat.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Monkey"
            onClick={async function () {
              setPlayerChoose(8);
              console.log("playerchoose", playerChoose);
              await enterRaffleMonkey({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Monkey"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Monkey.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Rooster"
            onClick={async function () {
              setPlayerChoose(9);
              console.log("playerchoose", playerChoose);
              await enterRaffleRooster({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Rooster"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Rooster.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Dog"
            onClick={async function () {
              setPlayerChoose(10);
              console.log("playerchoose", playerChoose);
              await enterRaffleDog({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Dog"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Dog.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "150px",
          }}
        >
          <Card
            description="Pig"
            onClick={async function () {
              setPlayerChoose(11);
              console.log("playerchoose", playerChoose);
              await enterRafflePig({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            setIsSelected={function noRefCheck() {}}
            title="Pig"
          >
            <div
              style={{
                marginLeft: "24px",
              }}
            >
              <Avatar image="/Pig.jpg" isRounded theme="image" size={80} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

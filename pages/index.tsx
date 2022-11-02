import type { NextPage } from "next";
import Cards from "../components/Cards";
import ConnectWallet from "../components/ConnectWallet";
import States from "../components/States";
import PlayGround from "../components/PlayGround";

const Home: NextPage = () => {
  return (
    <div className="m-8">
      {/* <Test></Test> */}
      <div className=" flex flex-row justify-between">
        <h1 className=" text-3xl font-sans font-bold">
          Zodiac Animal Lottery Island
        </h1>
        <ConnectWallet></ConnectWallet>
      </div>
      <PlayGround></PlayGround>
      {/* <div className="mt-12">
        <States></States>
      </div>
      <div className="mt-12">
        <Cards></Cards>
      </div> */}
    </div>
  );
};

export default Home;

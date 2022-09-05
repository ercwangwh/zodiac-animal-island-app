import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import EnterRaffle from "../components/EnterRaffle";
import Cards from "../components/Cards";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <EnterRaffle />
      <Cards />
    </div>
  );
}

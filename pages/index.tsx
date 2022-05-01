import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Header from "../component/header";
import HomePage from "../component/homePage";
import { createContext, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SearchBar from "../component/searchBar";
interface Query{
  field: "state"|"category";
  value: string;
}
interface Context {
  query: Query | null;
  setQuery: Dispatch<SetStateAction<Query | null>>
}

export const QueryContext = createContext<Context>({} as Context);

const Home: NextPage = () => {
  
  const [query, setQuery] = useState<Query | null>(null);
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      <div className={styles.container}>
        <Head>
          <title>Tourisa</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <main className={styles.main}>
          <SearchBar />
          <HomePage />
        </main>
      </div>
    </QueryContext.Provider>
  );
};

export default Home;

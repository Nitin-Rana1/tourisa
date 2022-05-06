import styles from "./styles/AllPlans.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import useCollectionOnce from "../fireb/useCollectionOnce";
import Card from "./card";

import {
  collection,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../fireb/firebApp";
import { QueryContext } from "../pages";
import PopularSearch from "./popularSearches";

interface CardIF {
  title: string;
  des: string;
  state: string;
  images: string;
  district: string;
  category: string;
  price: number;
  priceType: string;
  contact: string;
  points: number;
  count: number;
  // id: string;
}

function AllPlans() {
  // const [plans, setPlans] = useState<Array<CardIF>>([]);
  const { query: qu } = useContext(QueryContext);
  let q = query(collection(db, "plans"));
  if (qu) q = query(collection(db, "plans"), where(qu.field, "==", qu.value));
  const [snapshots, loading, err] = useCollectionOnce(q);
  return (
    <main className={styles.container}>
      <section className={styles.loader}>
        {loading && <h3>Loading.........</h3>}
      </section>
      {snapshots?.docs.map((doc, i) => {
        
        return (
          <div key={i}>
            <Card data={doc.data() as CardIF} id = {doc.id} />
          </div>
        );
      })}
    </main>
  );
}
export default AllPlans;
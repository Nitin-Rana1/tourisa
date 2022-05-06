import { query, collection, where, orderBy, limit } from "firebase/firestore";
import { useState, useContext } from "react";
import  useCollectionOnce  from "../fireb/useCollectionOnce";

import { db } from "../fireb/firebApp";
// import { QueryContext } from "../pages";

import styles from "./styles/PopularSearch.module.scss";
function PopularSearch() {
  // const [plans, setPlans] = useState([]);
  const plansRef = collection(db, "plans");
  const q = query(plansRef, orderBy("points", "desc"), limit(3));
  const [snapshots, loading, err] = useCollectionOnce(q);

  return (
    <main className={styles.container}>
      {loading && <h1>populloading</h1>}
      {!loading && <h2>Popular searches</h2>}
      <div className={styles.allCards}>
        {snapshots?.docs.map((doc, i) => {
          let d = doc.data();
          return (
            <span className={styles.oneCard} key={i}>
              <img src={d.images} alt='popularSearch' />
              <span>{d.title} dklf d df dkjf kfj lkjfj   skf</span>
            </span>
          );
        })}
      </div>
    </main>
  );
}
export default PopularSearch;

import { query, collection, where, orderBy, limit } from "firebase/firestore";
import { useState, useContext } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../fireb/firebApp";
import { QueryContext } from "../pages";
import styles from './styles/PopularSearch.module.scss';

function PopularSearch() {
  const [plans, setPlans] = useState([]);
  const plansRef = collection(db, "plans");
  const q = query(
    plansRef,
    orderBy("points", "desc"),
    limit(3)
  );
  const [snapshots, loading, err] = useCollectionOnce(q);

  return (
    <main className={styles.container}>
      {snapshots?.docs.map((doc, i) => {
        let d = doc.data();
        return (
          <span key={i} className={styles.oneImg}>
            <img src={d.images} alt={d.des} />
          </span>
        );
      })}
    </main>
  );
}
export default PopularSearch;

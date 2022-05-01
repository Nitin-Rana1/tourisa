import { query, collection, where, orderBy, limit } from "firebase/firestore";
import { useState, useContext } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../fireb/firebApp";
import { QueryContext } from "../pages";

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
    <main>
      {loading && <h1>populloading</h1>}
      {snapshots?.docs.map((doc, i) => {
        console.log(doc.data());
        return (

          <div key={i}>
            
          </div>
        );
      })}
    </main>
  );
}
export default PopularSearch;

import styles from "./styles/SearchBar.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { statesArr, districtsArr } from "../data/states";
import {
  collection,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import { db } from "../fireb/firebApp";
import { QueryContext } from "../pages";

function SearchBar() {
  const { query, setQuery } = useContext(QueryContext);
  const [districts, setDistricts] = useState(districtsArr[0]);
  const stateRef = useRef<HTMLSelectElement | null>(null);
  const districtRef = useRef<HTMLSelectElement | null>(null);
  const [stateSelected, setStateSelected] = useState<string>(statesArr[0]);
  let tags = [
    "Travel Plans",
    "Local Cuisine",
    "Travel Tips",
    "Local Spots",
    "Adventure Spots",
  ];
  //searchBar
  const [tagSelected, setTagSelected] = useState<string>(tags[0]);

  function stateSelect() {
    let v = stateRef.current?.value!;
    setStateSelected(v);

    let d = statesArr.findIndex((x) => {
      return x == v;
    });

    setDistricts([...districtsArr[d]]);
  }
  function searchByState() {
    let val = stateRef.current?.value;
    if (!val) return;
    setQuery({ field: "state", value: val });
    setStateSelected(val);
    // const q = query(collection(db, "plans"), where("state", "==", val));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const plansArr: any = [];
    //   querySnapshot.forEach((doc) => {
    //     plansArr.push(doc.data());
    //   });
    //   setPlans(plansArr);
    // });
  }
  function searchByTag(val: string) {
    setQuery({ field: "category", value: val });
    setTagSelected(val);
    // const q = query(collection(db, "plans"), where("category", "==", val));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const plansArr: any = [];
    //   querySnapshot.forEach((doc) => {
    //     plansArr.push(doc.data());
    //     console.log("hiii", doc.data());
    //   });
    //   setPlans(plansArr);
    // });
  }
  return (
    <main className={styles.container}>
      <select
        ref={stateRef}
        className={styles.stateSearchList}
        onChange={stateSelect}
        name='state'
        id='state'
      >
        {statesArr.map((val, i) => {
          return (
            <option value={val} key={i}>

              
              {val}
            </option>
          );
        })}
      </select>
      <button className={styles.searchButton} onClick={searchByState}>
        Search
      </button>
      <div className={styles.tags}>
        {tags.map((val, i) => {
          return (
            <span
              key={i}
              onClick={() => {
                searchByTag(val);
              }}
            >
              {val}
            </span>
          );
        })}
      </div>
      {/* <label htmlFor='district'>District</label>

      <select ref={districtRef} name='dis' id='dis'>
        {districts.map((val, i) => {
          return (
            <option value={val} key={i}>
              {val}
            </option>
          );
        })}
      </select> */}
    </main>
  );
}
export default SearchBar;

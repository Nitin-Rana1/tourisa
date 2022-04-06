import styles from "./styles/HomePage.module.scss";
import { useEffect, useRef, useState } from "react";
import { statesArr, districtsArr } from "../data/states";
import Card from "../component/card";

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

function HomePage() {
  const [plans, setPlans] = useState(["huhu"]);
  const [districts, setDistricts] = useState(districtsArr[0]);
  const stateRef = useRef<HTMLSelectElement | null>(null);
  const districtRef = useRef<HTMLSelectElement | null>(null);

  function stateSelect() {
    let v = stateRef.current?.value;
    setStateSelected(v);
    let d = statesArr.findIndex((x) => {
      return x == v;
    });

    setDistricts([...districtsArr[d]]);
  }
  //searchBar
  const [stateSelected, setStateSelected] = useState<string | null>(null);
  const [tagSelected, setTagSelected] = useState<string | null>(null);
  function search() {
    let val = stateRef.current?.value;
    // console.log(districtRef.current?.value);
    if (!val) return;
    const q = query(collection(db, "plans"), where("state", "==", val));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const plansArr: any = [];
      querySnapshot.forEach((doc) => {
        plansArr.push(doc.data());
      });
      setPlans(plansArr);
    });
  }
  useEffect(() => {
    async function t() {
      const q = query(collection(db, "plans"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const plansArr: any = [];
        querySnapshot.forEach((doc) => {
          plansArr.push(doc.data());
          console.log("hiii", doc.data());
        });
        setPlans(plansArr);
      });
    }
    t();
  }, []);
  let tags = [
    "Travel Plans",
    "Local Cuisine",
    "Travel Tips",
    "Local Spots",
    "Adventure Spots",
  ];
  function searchByTag(val: string) {
    if (!val) return;
    const q = query(collection(db, "plans"), where("category", "==", val));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const plansArr: any = [];
      querySnapshot.forEach((doc) => {
        plansArr.push(doc.data());
        console.log("hiii", doc.data());
      });
      setPlans(plansArr);
    });
  }
  return (
    <main className={styles.container}>
      <section className={styles.searchBar}>
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
        <button className={styles.searchButton} onClick={search}>
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
      </section>
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
      {plans.map((val, i) => {
        return (
          <div key={i}>
            <Card data={val} />
          </div>
        );
      })}
    </main>
  );
}
export default HomePage;

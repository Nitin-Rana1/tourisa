import { useRouter } from "next/router";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../fireb/firebApp";
import styles from "../styles/Plan.module.scss";
import { useEffect, useState } from "react";
interface Card {
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
}
function Post() {
  const router = useRouter();
  const { docId } = router.query;
  const [data, setData] = useState<Card>();
  // card

  const [rating, setRating] = useState<null | number>(1);
  const [rateIt, setRateIt] = useState(1);
  let fiveArr = [0, 0, 0, 0, 0];
  // let stars = Math.floor(data.points / data.count);
  const [stars, setStars] = useState(1);
  console.log("DATAA");
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "plans", docId as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data() as Card);
        setStars(Math.floor(docSnap.data().points / docSnap.data().count));
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);
  return (
    <main className={styles.container}>
      {data && (
        <section className={styles.card}>
          <h3 className={styles.title}>{data.title}</h3>

          <img src={data.images} />
          <div>
            <b>Description:</b>
            {data.des}
          </div>
          <div className={styles.ratings}>
            <b>Rating: </b>
            {fiveArr.map((val, i) => {
              let cl = "gray";
              if (i < stars) {
                cl = "shine";
              }
              return (
                <img className={styles[cl]} key={i} src='star.png' alt='star' />
              );
            })}
          </div>

          <div>
            <b>State: </b>
            {data.state}
          </div>
          <div>
            <b>District: </b>
            {data.district}
          </div>
          <div>
            <b>Category: </b>
            {data.category}
          </div>
          <div>
            <b>Price: </b>
            {data.price}
          </div>
          <div>
            <b>Price Type: </b>
            {data.priceType}
          </div>

          <div className={styles.rateIt}>
            <b>Rate It: </b>
            {fiveArr.map((val, i) => {
              let cl = "gray";
              if (i < rateIt) {
                cl = "shine";
              }
              return (
                <img
                  onClick={() => setRateIt(i + 1)}
                  className={styles[cl]}
                  key={i}
                  src='star.png'
                  alt='star'
                />
              );
            })}
          </div>
          <div>
            <b>Comment: </b>
            <textarea name="ta" id="ta" cols={30} rows={5}></textarea>
          </div>
        </section>
      )}
    </main>
  );
}
export default Post;

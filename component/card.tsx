import styles from "./styles/Card.module.scss";
import { useRef, useState } from "react";
import Link from "next/link";
interface card {
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
function Card({ data, id }: { data: card; id: string }) {
  const [rating, setRating] = useState<null | number>(1);
  let stars = Math.floor(data.points / data.count);
  const [rateIt, setRateIt] = useState(1);
  let fiveArr = [0, 0, 0, 0, 0];
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h3 className={styles.title}>{data.title}</h3>

        <Link href={"/plans/" + id}>
          <img src={data.images} />
        </Link>
        <div>
          <b>Description:</b>
          {data.des}
        </div>
        <div className={styles.ratings}>
          <b>Rating:   </b>
          {fiveArr.map((val, i) => {
            let cl = "gray";
            if (i < stars) {
              cl = "shine";
            }
            return (
              <img
                className={styles[cl]}
                key={i}
                src='star.png'
                alt='star'
              />
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
          <b>Rate It:    </b>
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

      </section>
    </main>
  );
}

export default Card;

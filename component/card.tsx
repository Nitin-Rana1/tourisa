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

        <Link href={id}>
          <img src={data.images} />
        </Link>
        <div>
          <b>Description:</b>
          <span className={styles.desc}>{data.des}</span>
        </div>
        <article className={styles.imgAndDes}>
          <span>
            <div className={styles.ratings}>
              <b>Rating: </b>
              <span>
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
              </span>
            </div>

            <div>
              <b>State: </b>
              <span>{data.state}</span>
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
          </span>
          <span className={styles.gmap}>
            <img src='/g.jpg' alt='googleMap' />
          </span>
        </article>
      </section>
    </main>
  );
}

export default Card;

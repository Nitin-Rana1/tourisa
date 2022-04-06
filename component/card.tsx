import styles from "./styles/Card.module.scss";
import { useRef, useState } from "react";
import Rating from "@mui/material/Rating";
interface card {
  title: string;
  des: string;
  state: string;
  images: string;
  district: string;
  category: string;
  price: number;
  priceType: string;
  contact: string,
  points: number;
  count: number;
}
function Card({ data }: { data: card }) {
  const [rating, setRating] = useState<null | number>(1);
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h3 className={styles.title}>{data.title}</h3>
        <img src={data.images} />
        <div>
          <b>Description:</b>
          {data.des}
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
        <div>
          <b>Ratings: </b>
          {data.points / data.count}
        </div>
        <div>
          <b>Your Rating: </b>
          {/* <Rating name='read-only' value={3} readOnly /> */}
        </div>
      </section>
    </main>
  );
}

export default Card;

import styles from "./styles/Upload.module.scss";
import { statesArr, districtsArr } from "../data/states";
import { useRef, useState } from "react";
import { storage, db } from "../fireb/firebApp";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function Upload() {
  //DB data
  const [title, setTitle] = useState("none");
  const [url, setUrl] = useState<string | null>(null);
  const [category, setCategory] = useState("plan");
  const [des, setDes] = useState("none");
  const [disSelected, setDisSelected] = useState<string>("none");
  const [price, setPrice] = useState(0);
  const [priceType, setPriceType] = useState("none");
  const [location, setLocation] = useState("none");
  const [stateSelected, setStateSelected] = useState<string>(statesArr[0]);
  // Select menu data and ref
  const [districts, setDistricts] = useState(districtsArr[0]);
  const stateRef = useRef<HTMLSelectElement | null>(null);
  const districtRef = useRef<HTMLSelectElement | null>(null);

  function stateSelect() {
    let v = stateRef.current?.value;
    setStateSelected(v);
    let d = statesArr.findIndex((x) => {
      return x == v;
    });
    setDisSelected(districtsArr[d][0]);
    setDistricts([...districtsArr[d]]);
  }
  function districtSelect() {
    setDisSelected(districtRef.current?.value);
  }
  function upload() {
    console.log(stateRef.current?.value);
    console.log(districtRef.current?.value);
  }

  const [img, setImg] = useState(null);
  function imgInput(e: any) {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  }
  async function submit() {
    let uuid = crypto.randomUUID();
    console.log(uuid);
    const imageRef = ref(storage, stateSelected! + disSelected! + uuid);
    if (!img) return;
    await uploadBytes(imageRef, img!).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setUrl(url);
        })
        .catch((err) => {
          console.log(err.message, "error getting image url");
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    await setDoc(doc(db, "plans", stateSelected! + disSelected! + uuid), {
      title: title,
      des: des,
      state: stateSelected,
      district: disSelected,
      category: category,
      price: price,
      location: location,
      images: url,
    });
  }
  return (
    <main className={styles.container}>
      <br />
      <label htmlFor='state'>State</label>
      <select ref={stateRef} onChange={stateSelect} name='state' id='state'>
        {statesArr.map((val, i) => {
          return (
            <option value={val} key={i}>
              {val}
            </option>
          );
        })}
      </select>
      <br />
      <br />
      <label htmlFor='district'>District</label>

      <select onChange={districtSelect} ref={districtRef} name='dis' id='dis'>
        {districts.map((val: string, i: number) => {
          return (
            <option value={val} key={i}>
              {val}
            </option>
          );
        })}
      </select>
      <br />
      <br />
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        name='title'
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor='location'>Location</label>

      <input
        type='text'
        name='location'
        onChange={(e) => setLocation(e.target.value)}
      />
      <br />
      <label htmlFor='des'>Description</label>

      <input type='text' name='des' onChange={(e) => setDes(e.target.value)} />
      <br />
      <label htmlFor='price'>price</label>
      <input
        type='number'
        name='price'
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />
      <br />
      <label htmlFor='priceType'>Price Type</label>

      <input
        type='text'
        name='priceType'
        onChange={(e) => setPriceType(e.target.value)}
      />

      <input type='file' onChange={imgInput} />
      <br />

      <button onClick={submit}>Submit</button>
    </main>
  );
}
export default Upload;

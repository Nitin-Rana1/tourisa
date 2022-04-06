import styles from "../styles/Upload.module.scss";
import { statesArr, districtsArr } from "../data/states";
import { useRef, useState } from "react";
import { storage, db } from "../fireb/firebApp";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import type { NextPage } from "next";
import Header from "../component/header";

const Upload: NextPage = () => {
  //DB data
  const [title, setTitle] = useState("none");
  const [url, setUrl] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [des, setDes] = useState("none");
  const [disSelected, setDisSelected] = useState<any>("none");
  const [price, setPrice] = useState(0);
  const [priceType, setPriceType] = useState("none");
  const [location, setLocation] = useState("none");
  const [stateSelected, setStateSelected] = useState<any>(statesArr[0]);
  const [contact, setContact] = useState("none");
  // Select menu data and ref
  const [districts, setDistricts] = useState(districtsArr[0]);
  const stateRef = useRef<HTMLSelectElement | null>(null);
  const districtRef = useRef<HTMLSelectElement | null>(null);
  const [prevImgUrl, setPrevImgUrl] = useState<any>(null);
//hlo
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

  const [img, setImg] = useState(null);
  function imgInput(e: any) {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.addEventListener("load", function () {
      setPrevImgUrl(this.result);
    });
  }
  async function submit() {
    let uuid = crypto.randomUUID();
    console.log(uuid);
    const imageRef = ref(storage, stateSelected! + disSelected! + uuid);
    if (!img) return;
    await uploadBytes(imageRef, img!);
    const urll = await getDownloadURL(imageRef);

    // await uploadBytes(imageRef, img!).then(() => {
    //   getDownloadURL(imageRef)
    //     .then((url) => {
    //       setUrl(url);
    //     })
    //     .catch((err) => {
    //       console.log(err.message, "error getting image url");
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // });
    await setDoc(doc(db, "plans", stateSelected! + disSelected! + uuid), {
      title: title,
      des: des,
      state: stateSelected,
      district: disSelected,
      category: category,
      price: price,
      location: location,
      images: urll,
      tourisaVerified: true,
      points: 100,
      count: 23,
      contact: contact,
    });
    setUrl(urll);
  }
  let categoryArr = [
    "Travel Plans",
    "Local Cuisine",
    "Travel Tips",
    "Local Spots",
    "Adventure Spots",
  ];
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  function categorySelect() {
    let v = categoryRef.current?.value;
    setCategory(v);
  }
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h3>Create Your Own Post</h3>
        <section className={styles.form}>
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
          <label htmlFor='district'>District</label>

          <select
            onChange={districtSelect}
            ref={districtRef}
            name='dis'
            id='dis'
          >
            {districts.map((val: string, i: number) => {
              return (
                <option value={val} key={i}>
                  {val}
                </option>
              );
            })}
          </select>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='location'>Location</label>

          <input
            type='text'
            name='location'
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor='des'>Description</label>

          <textarea
            placeholder='Write short and on-point description of plan you are promising'
            name='des'
            onChange={(e) => setDes(e.target.value)}
          />
          <label htmlFor='category'>Category</label>
          <select
            ref={categoryRef}
            onChange={categorySelect}
            name='category'
            id='category'
          >
            {categoryArr.map((val, i) => {
              return (
                <option value={val} key={i}>
                  {val}
                </option>
              );
            })}
          </select>

          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            placeholder='eg 1000, 2k, 3k, 500'
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <label htmlFor='priceType'>Price Type</label>

          <input
            placeholder='eg 1000/day, 2k/week tour etc'
            type='text'
            name='priceType'
            onChange={(e) => setPriceType(e.target.value)}
          />
          <label htmlFor='contact'>Contact(optional)</label>

          <input
            placeholder='eg email/phone number'
            type='text'
            name='contact'
            onChange={(e) => setContact(e.target.value)}
          />
          <input type='file' onChange={imgInput} />
          {prevImgUrl && <img src={prevImgUrl} />}
        </section>
        <div className={styles.button}>
          <button onClick={submit}>Submit</button>
        </div>
      </main>
    </>
  );
};
export default Upload;

import styles from "./styles/Header.module.scss";
import Link from "next/link";
function Header() {
  return (
    <main className={styles.container}>
      <h2>
        <Link href='/'>
          <a>Tourisa</a>
        </Link>
      </h2>
      <h3>
        <Link href='/upload'>
          <a>Upload</a>
        </Link>
      </h3>
    </main>
  );
}
export default Header;

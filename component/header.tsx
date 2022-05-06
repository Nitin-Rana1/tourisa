import styles from "./styles/Header.module.scss";
import Link from "next/link";
function Header() {
  return (
    <main className={styles.container}>
      <h3>
        <Link href='/'>
          <a>Tourisa</a>
        </Link>
      </h3>
      <h4>
        <Link href='/upload'>
          <a>Upload</a>
        </Link>
      </h4>
    </main>
  );
}
export default Header;

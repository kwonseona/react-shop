import styles from "../styles/Grocery.module.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export default function Grocery() {
  return (
    <div className={styles.groceryContainer}>
      <h1 className={styles.groceryH1}>404</h1>
      <p className={styles.groceryP}>페이지를 찾을 수 없습니다.</p>
      <div className={styles.groceryText}>
        <Link to="/">
          <button>메인으로</button>
        </Link>
      </div>
    </div>
  )
}

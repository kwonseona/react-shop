import styles from "../styles/CartPopup.module.css"
import { useDarkMode } from "../DarkModeContext"

export default function Popup({
  onClose,
  onRemoveAllItems,
}: {
  onClose: () => void
  onRemoveAllItems: () => void
}) {
  const { darkMode } = useDarkMode()

  return (
    <div className={styles.popupBackdrop}>
      <div className={`${styles.popupContent} ${darkMode ? styles.dark : ""}`}>
        <h2>정말로 구매하시겠습니까?</h2>
        <span>장바구니의 모든 상품들이 삭제됩니다.</span>
        <div className={styles.CartPopupBtn}>
          <button
            className={styles.btnYes}
            onClick={() => {
              onRemoveAllItems()
              onClose()
            }}
          >
            네
          </button>
          <button
            className={`${styles.btnNo} ${darkMode ? styles.dark : ""}`}
            onClick={onClose}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  )
}

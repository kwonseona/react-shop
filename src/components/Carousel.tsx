import React, { MouseEventHandler } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import styles from "../styles/Carousel.module.css"
import { HiArrowSmRight } from "react-icons/hi"
import { useDarkMode } from "../DarkModeContext"

interface ArrowProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

function ArrowLeft(props: ArrowProps) {
  return (
    <button
      className={styles.arrow + " " + styles["arrow-left"]}
      onClick={props.onClick}
    >
      ◂
    </button>
  )
}

function ArrowRight(props: ArrowProps) {
  return (
    <button
      className={styles.arrow + " " + styles["arrow-right"]}
      onClick={props.onClick}
    >
      ▸
    </button>
  )
}

export default function CarouselSection() {
  const { darkMode } = useDarkMode()

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        className={styles.carouselWrapper}
        showArrows={true}
        autoPlay={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        infiniteLoop={true}
        centerMode={true}
        centerSlidePercentage={100}
        useKeyboardArrows={true}
        interval={3000}
        transitionTime={500}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && <ArrowLeft onClick={onClickHandler} />
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && <ArrowRight onClick={onClickHandler} />
        }
      >
        <div>
          <img src="/img/img_shop_fashion.jpeg" alt="Fashion Shop" />
          <div className={styles.slide}>
            <h2 className={styles.slideTitle}>물빠진 청바지!</h2>
            <p className={styles.slideSub}>
              이제 막 도착한 패션 청바지를 구경해 보세요.
            </p>
            <Link to="/fashion">
              <button
                className={`${styles.slideButton} ${
                  darkMode ? styles.dark : ""
                }`}
              >
                바로가기
                <HiArrowSmRight className={styles.HiArrowSmRight} />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <img src="/img/img_shop_digital.jpeg" alt="Digital Shop" />
          <div className={styles.slide}>
            <div className={styles.slideText}>
              <h2 className={styles.slideTitle}>신속한 업무처리!</h2>
              <p className={styles.slideSub}>
                다양한 디지털 상품을 둘러보세요.
              </p>
              <Link to="/digital">
                <button
                  className={`${styles.slideButton} ${
                    darkMode ? styles.dark : ""
                  }`}
                >
                  바로가기
                  <HiArrowSmRight className={styles.HiArrowSmRight} />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src="/img/img_shop_grocery.jpeg" alt="Grocery Shop" />
          <div className={styles.slide}>
            <div className={styles.slideText}>
              <h2 className={styles.slideTitle}>신선한 식품!</h2>
              <p className={styles.slideSub}>
                농장 직배송으로 더욱 신선한 식료품을 만나보세요.
              </p>
            </div>
            <Link to="/grocery">
              <button
                className={`${styles.slideButton} ${
                  darkMode ? styles.dark : ""
                }`}
              >
                바로가기
                <HiArrowSmRight className={styles.HiArrowSmRight} />
              </button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  )
}

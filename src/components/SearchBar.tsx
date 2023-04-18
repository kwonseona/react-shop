import React, { FC, useState, useEffect, useRef } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import styles from "../styles/SearchBar.module.css"
import { HiOutlineShoppingBag, HiSearch } from "react-icons/hi"
import { Product } from "../components/types"
import { useMediaQuery } from "@react-hook/media-query"
import DarkModeToggle from "./DarkModeToggle"
import { useDarkMode } from "../DarkModeContext"

interface SearchBarProps {
  darkMode: boolean
  products: Product[]
  cartItemCount: number
}

const SearchBar: React.FC<SearchBarProps> = ({
  darkMode,
  products,
  cartItemCount,
}) => {
  const { setDarkMode } = useDarkMode()
  const isSmallScreen = useMediaQuery("(max-width:479px)")
  const [isRotated, setIsRotated] = useState(false)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [focusedResultIndex, setFocusedResultIndex] = useState(-1)
  const [showInput, setShowInput] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchIconClick = () => {
    setShowInput((prevShowInput) => !prevShowInput)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSearchResults([])
    }
  }

  const handleArrowKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setFocusedResultIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex,
      )
    } else if (event.key === "ArrowUp") {
      setFocusedResultIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex,
      )
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setSearchResults(results)
  }, [searchQuery, products])

  return (
    <div className={styles.search} ref={searchRef}>
      {isSmallScreen && (
        <label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-gray-700 dark:stroke-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </label>
      )}
      <DarkModeToggle
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isRotated={isRotated}
        setIsRotated={setIsRotated}
      />
      {isSmallScreen && (
        <label className={styles.searchIcon} onClick={handleSearchIconClick}>
          <HiSearch
            className={`${styles.hiSearch} ${darkMode ? styles.dark : ""}`}
          />
        </label>
      )}
      {(showInput || !isSmallScreen) && (
        <input
          className={`${styles.searchbox} ${
            isSmallScreen && showInput ? styles.showSearch : ""
          }`}
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleSearch}
          onKeyDown={handleArrowKeys}
        />
      )}
      <Link
        to="/Cart"
        className={`${styles.bag} ${darkMode ? styles.dark : ""}`}
      >
        <label className={styles.cart}>
          <HiOutlineShoppingBag className={styles.hiBag} />
          <span className={styles.count}>{cartItemCount}</span>
        </label>
      </Link>

      {searchQuery && (
        <ul className={`${styles.results} ${darkMode ? styles.dark : ""}`}>
          {searchResults.map((product, index) => (
            <li
              key={product.id}
              className={`${
                index === focusedResultIndex ? styles.focused : ""
              } ${darkMode ? styles.dark : ""}`}
            >
              <Link to={`/product/${product.id}`}>
                <span>{product.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar

"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  // const totalLeaves = 5; testaamiseen
  const totalLeaves = 50;
  const [order, setOrder] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLeaves, setVisibleLeaves] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [displayLeaves, setDisplayLeaves] = useState([]);

  useEffect(() => {
    const leaves = Array.from({ length: totalLeaves }, (_, i) => i);
    const shuffledOrder = shuffleArray([...leaves]); // oikea järjestys
    const shuffledDisplay = shuffleArray([...leaves]); // satunnainen visuaalinen järjestys

    setOrder(shuffledOrder);
    setVisibleLeaves(leaves); // kaikki lehdet näkyviin
    setDisplayLeaves(shuffledDisplay);
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleLeafClick(id) {
    if (id === order[currentIndex]) {
      const newVisible = visibleLeaves.filter((leafId) => leafId !== id);
      setVisibleLeaves(newVisible);
      if (currentIndex + 1 === totalLeaves) {
        setCompleted(true);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      // reset jos valitaan väärä lehti
      setVisibleLeaves(Array.from({ length: totalLeaves }, (_, i) => i));
      setCurrentIndex(0);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.tree}>
        {displayLeaves.map((leafId) =>
          visibleLeaves.includes(leafId) ? (
            <div
              key={leafId}
              className={styles.leaf}
              onClick={() => handleLeafClick(leafId)}
            >
              🍃
            </div>
          ) : null
        )}
        {completed && (
          <div className={styles.code}>
            Congratulations! Your code: <strong>UNIQUE-CODE-1234</strong>
          </div>
        )}
      </main>
    </div>
  );
}
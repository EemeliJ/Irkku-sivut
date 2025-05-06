"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  // Lintujen kuvat
  const birdImages = ["/bird1.png", "/bird2.png", "/bird3.png"];

  // Lintujen asemointi
  const birdPositions = [
    { left: "34%", top: "64%" },  // bird1
    { left: "19%", top: "26.3%" },  // bird2
    { left: "69.6%", top: "13.5%" },  // bird3
  ];

  // Pelilogiikka
  const [order, setOrder] = useState([]);
  const [visible, setVisible] = useState([]);  
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const shuffled = shuffle([...birdImages]);
    setOrder(shuffled);
    setVisible([...birdImages]);
  }, []);

  // Fisher–Yates shuffle
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Click handler
  function handleClick(bird) {
    if (bird === order[current]) {
      // Oikein
      const nextVisible = visible.filter((b) => b !== bird);
      setVisible(nextVisible);
      if (current + 1 === birdImages.length) {
        setCompleted(true);
      } else {
        setCurrent(current + 1);
      }
    } else {
      // Väärin --> Reset
      setVisible([...birdImages]);
      setCurrent(0);
    }
  }

  return (
    <div className={styles.wrapper}>
      <img
        src="/ExampleTree.jpg"
        alt="Tree background"
        className={styles.background}
      />

      {visible.map((bird, i) => {
        // Pidetään linnut paikoillaan
        const idx = birdImages.indexOf(bird);
        return (
          <div
            key={bird}
            className={styles.clickable}
            style={{
              left: birdPositions[idx].left,
              top:  birdPositions[idx].top,
            }}
            onClick={() => handleClick(bird)}
          >
            <img src={bird} alt={`Bird ${idx+1}`} className={styles.birdImage} />
          </div>
        );
      })}

      {completed && (
        <div className={styles.code}>
          Onnittelut! koodisi: <strong>Prööt</strong>
        </div>
      )}
    </div>
  );
}
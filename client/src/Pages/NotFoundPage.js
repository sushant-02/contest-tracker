import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const [count, setCount] = useState(10);
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 10000);

    let i = 10;
    let secCounter = function () {
      if (i === 0) clearInterval(this);
      else {
        setCount(i--);
      }
    };

    setInterval(secCounter, 1000);
    secCounter();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`${styles.notFoundContainer} d-flex justify-content-center align-items-center`}
    >
      <div className={styles.customCard}>
        <h2 className={styles.heading}>404</h2>
        <p className="text-center fw-bold fs-4">Wrong page there mate.</p>
        <p className={styles.line}></p>
        <p className="text-center mb-0">Redirecting in {count} seconds.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;

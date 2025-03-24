"use client";
import { useEffect, useState } from "react";
import classes from "./ChatApp.module.css";

export const ChatBGAnimate = () => {
  const [heartStyles, setHeartStyles] = useState<
    { left: string; animationDuration: string; width: string; height: string }[]
  >([]);

  useEffect(() => {
    // Generate styles only on the client
    setHeartStyles(
      new Array(10).fill(0).map(() => ({
        left: `${Math.random() * 100}%`,
        animationDuration: `${4 + Math.random() * 2}s`,
        width: `${20 + Math.random() * 30}px`,
        height: `${20 + Math.random() * 30}px`,
      }))
    );
  }, []);

  return (
    <>
      {heartStyles.map((style, index) => (
        <div key={index} className={classes.heart} style={style} />
      ))}
    </>
  );
};

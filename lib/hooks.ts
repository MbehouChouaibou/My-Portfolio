"use client";

import { useEffect, useRef, useState } from "react";

export function useTypingEffect(words: string[], speed = 85, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    if (pauseRef.current) return;
    const word = words[wordIdx % words.length];
    const delay = deleting ? speed / 2 : speed;

    if (!deleting && charIdx === word.length) {
      pauseRef.current = true;
      const t = setTimeout(() => {
        pauseRef.current = false;
        setDeleting(true);
      }, pause);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      if (deleting) {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => w + 1);
        }
      } else {
        setDisplay(word.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

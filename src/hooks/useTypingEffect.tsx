import { useState, useEffect } from "react";

export const useTypingEffect = (
  texts: string[],
  typingSpeed = 65,
  deletingSpeed = 45,
  pauseTime = 1500
) => {
  const [index, setIndex] = useState(0); // which text in array
  const [subIndex, setSubIndex] = useState(0); // how many chars of current text
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[index];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    // Typing or deleting behavior
    if (!isDeleting && subIndex < currentText.length) {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev + 1);
      }, typingSpeed);
    }
    else if (isDeleting && subIndex > 0) {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev - 1);
      }, deletingSpeed);
    }
    else if (!isDeleting && subIndex === currentText.length) {
      // Finished typing — wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    }
    else if (isDeleting && subIndex === 0) {
      // Finished deleting — move to next text
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 200);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [texts, index, subIndex, isDeleting, typingSpeed, deletingSpeed, pauseTime]);

  return texts.length > 0 ? texts[index].substring(0, subIndex) : "";
};

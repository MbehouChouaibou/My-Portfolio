import { useState, useEffect } from "react";

export const useTypingEffect = (
  texts: string[],
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseTime = 1500
) => {
  const [index, setIndex] = useState(0); // which text in array
  const [subIndex, setSubIndex] = useState(0); // how many chars of current text
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[index];

    // Typing or deleting behavior
    if (!isDeleting && subIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setSubIndex(subIndex + 1);
        setTypedText(currentText.substring(0, subIndex + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex > 0) {
      const timeout = setTimeout(() => {
        setSubIndex(subIndex - 1);
        setTypedText(currentText.substring(0, subIndex - 1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    // Finished typing — wait before deleting
    if (!isDeleting && subIndex === currentText.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    // Finished deleting — move to next text
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }
  }, [texts, index, subIndex, isDeleting, typingSpeed, deletingSpeed, pauseTime]);

  return typedText;
};

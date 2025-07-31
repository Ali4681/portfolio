import { useEffect, useState } from 'react';

const TypingHeading = () => {
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Ali Al-bayati";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingDelay = 100; // Delay between each character

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, typingDelay);

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold relative">
      <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {text}
        <span 
          className={`inline-block w-[4px] h-[1em] ml-1 -mb-2 bg-purple-500 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-100`}
          style={{ verticalAlign: 'middle' }}
        />
      </span>
    </h1>
  );
};

export default TypingHeading;
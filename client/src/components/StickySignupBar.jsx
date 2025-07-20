import { useEffect, useState } from 'react';

export default function StickySignupBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show the bar after user scrolls down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white text-center p-3 z-40 shadow-lg">
      <div className="flex items-center justify-center space-x-2">
        <span>📈 Earn with Fixlo —</span>
        <a 
          href="/pro-support" 
          className="underline font-bold bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
        >
          Join Now
        </a>
      </div>
    </div>
  );
}

'use client';

export function SkipToMain() {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent-orange focus:px-4 focus:py-2 focus:text-text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2"
    >
      Przejdź do głównej treści
    </a>
  );
}

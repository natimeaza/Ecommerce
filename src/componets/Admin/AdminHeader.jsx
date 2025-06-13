import React, { useState, useCallback, useMemo, useTransition } from 'react';
import { FiGlobe, FiUser } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../redux/HabeshaSlice';

// Preload Amharic font
const preloadFont = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Abyssinica+SIL&display=swap';
  document.head.appendChild(link);
};
preloadFont();

const AdminHeader = React.memo(() => {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  // Specific selector to avoid re-renders
  const language = useSelector((state) => state.habesha.language);

  // Memoized text object
  const text = useMemo(
    () => ({
      EN: {
        accountName: 'Natnael Mulugeta',
        language: 'Language',
        english: 'English',
        amharic: 'Amharic',
      },
      AMH: {
        accountName: 'ናትናኤል ሙሉጌታ', // Amharic translation
        language: 'ቋንቋ',
        english: 'እንግሊዝኛ',
        amharic: 'አማርኛ',
      },
    }),
    [],
  );

  const currentText = text[language];

  const handleLanguageChange = useCallback(
    (lang) => {
      startTransition(() => {
        dispatch(setLanguage(lang));
        setLanguageDropdownOpen(false);
      });
    },
    [dispatch],
  );

  return (
    <header
      className={`bg-habesha_white shadow-habeshaInput h-14 xs:h-16 flex items-center justify-end px-4 xs:px-6 sm:px-8 border-b border-gray-200 sticky top-0 z-40 transition-opacity duration-200 ${
        isPending ? 'opacity-90' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      {/* Icons (Account Name with Profile Icon and Language) */}
      <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-5" key="icons">
        {/* Account Name with Profile Icon */}
        <div className="flex items-center order-1" key="account">
          <FiUser
            className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-habesha_blue me-1 xs:me-2"
            aria-hidden="true"
          />
          <span
            className="text-xs xs:text-sm font-medium text-habesha_blue"
            dir={language === 'AMH' ? 'rtl' : 'ltr'}
          >
            {currentText.accountName}
          </span>
        </div>

        {/* Language Toggle Dropdown */}
        <div className="relative order-2" key="language">
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="p-1 xs:p-1.5 rounded-full text-gray-500 hover:text-habesha_blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-habesha_blue flex items-center"
            aria-label={currentText.language}
            aria-expanded={languageDropdownOpen}
            aria-haspopup="true"
          >
            <FiGlobe className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
            <span className="hidden sm:block ms-1 text-xs xs:text-sm font-medium text-habesha_blue">
              {language}
            </span>
          </button>
          {languageDropdownOpen && (
            <div
              className="origin-top-end absolute end-0 mt-2 w-full xs:w-40 rounded-md shadow-lg py-1 bg-habesha_white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="language-menu-button"
            >
              <button
                onClick={() => handleLanguageChange('EN')}
                className={`block w-full text-start px-4 py-2 text-xs xs:text-sm ${
                  language === 'EN'
                    ? 'text-habesha_blue font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-habesha_blue'
                }`}
                role="menuitem"
                dir={language === 'AMH' ? 'rtl' : 'ltr'}
              >
                {currentText.english}
              </button>
              <button
                onClick={() => handleLanguageChange('AMH')}
                className={`block w-full text-start px-4 py-2 text-xs xs:text-sm ${
                  language === 'AMH'
                    ? 'text-habesha_blue font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-habesha_blue'
                }`}
                role="menuitem"
                dir={language === 'AMH' ? 'rtl' : 'ltr'}
              >
                {currentText.amharic}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

export default AdminHeader;
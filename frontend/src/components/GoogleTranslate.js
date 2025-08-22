// GoogleTranslate.js
import { useEffect, useRef } from "react";
import "./GoogleTranslator.css";

const GoogleTranslate = () => {
  const translateElementRef = useRef(null);

  useEffect(() => {
    // --- Google Translate Widget Initialization Logic ---
    const existingScript = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );

    // This function will hide the banner iframe
    const hideGoogleTranslateBar = (node) => {
      if (node && node.nodeType === 1 && node.classList.contains('goog-te-banner-frame')) {
        node.style.display = 'none';
        node.style.visibility = 'hidden';
        node.style.height = '0';
        node.style.minHeight = '0';
        node.style.overflow = 'hidden';
        node.style.border = 'none';
        node.style.margin = '0';
        node.style.padding = '0';
        console.log("Google Translate banner iframe hidden by MutationObserver.");
        return true;
      }
      return false;
    };

    // The MutationObserver watches the <body> for new children
    const observer = new MutationObserver((mutations, obs) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (hideGoogleTranslateBar(node)) {
              // Optionally disconnect the observer once the element is found
              // obs.disconnect(); 
            }
          }
        }
      }
    });

    // Start observing the <body> for new children
    observer.observe(document.body, { childList: true });

    // The rest of your script for initializing the dropdown
    const tryInitialize = () => {
      if (
        window.google?.translate?.TranslateElement &&
        typeof window.google.translate.TranslateElement === "function"
      ) {
        const targetElement = document.getElementById("google_translate_element");
        if (targetElement) {
          if (!targetElement.querySelector(".goog-te-combo")) {
            try {
              new window.google.translate.TranslateElement(
                {
                  pageLanguage: "en",
                  includedLanguages: "en,hi,kn",
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false,
                },
                "google_translate_element"
              );
              console.log("Google Translate dropdown initialized.");
            } catch (e) {
              console.error("Google Translate initialization error:", e);
            }
          }
        } else {
          setTimeout(tryInitialize, 500);
        }
      } else {
        setTimeout(tryInitialize, 500);
      }
    };

    window.googleTranslateElementInit = tryInitialize;

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => console.warn("Google Translate script failed to load.");
      document.body.appendChild(script);
    } else {
      tryInitialize();
    }
    
    // --- Draggable Functionality Logic ---
    const element = translateElementRef.current;
    if (!element) return;

    let isDragging = false;
    let offsetX, offsetY;

    const savedPosition = localStorage.getItem('googleTranslatePosition');
    if (savedPosition) {
      const { top, left } = JSON.parse(savedPosition);
      element.style.top = `${top}px`;
      element.style.left = `${left}px`;
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    }

    const onMouseDown = (e) => {
      if (e.target.closest('.goog-te-combo') || e.target.closest('.VIpgJd-ZVi9od-xl07Ob-LgbsSe-Bz112c')) {
        return;
      }
      isDragging = true;
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;
      element.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;
      const rect = element.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + rect.width > viewportWidth) newLeft = viewportWidth - rect.width;
      if (newTop + rect.height > viewportHeight) newTop = viewportHeight - rect.height;

      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    };

    const onMouseUp = () => {
      isDragging = false;
      element.style.cursor = 'grab';
      document.body.style.userSelect = 'auto';
      document.body.style.cursor = 'auto';
      const { top, left } = element.getBoundingClientRect();
      localStorage.setItem('googleTranslatePosition', JSON.stringify({ top, left }));
    };

    element.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Cleanup function for useEffect
    return () => {
      observer.disconnect(); // Disconnect the observer on unmount
      delete window.googleTranslateElementInit;
      element.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return <div id="google_translate_element" ref={translateElementRef} />;
};

export default GoogleTranslate;
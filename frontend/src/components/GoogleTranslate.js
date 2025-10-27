// // // import React, { useEffect } from "react";
// // // import "./GoogleTranslator.css"; // import the css

// // // const GoogleTranslate = () => {
// // //   useEffect(() => {
// // //     // Create and inject the Google Translate script
// // //     const addScript = document.createElement("script");
// // //     addScript.src =
// // //       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
// // //     document.body.appendChild(addScript);

// // //     // Define global callback for Google Translate
// // //     window.googleTranslateElementInit = () => {
// // //       new window.google.translate.TranslateElement(
// // //         {
// // //           pageLanguage: "en",
// // //           autoDisplay: false,
// // //         },
// // //         "google_translate_element"
// // //       );
// // //     };

// // //     // Remove Google banner iframe automatically
// // //     const observer = new MutationObserver(() => {
// // //       const banner = document.querySelector(".goog-te-banner-frame");
// // //       if (banner) banner.style.display = "none";
// // //       const body = document.querySelector("body");
// // //       if (body) body.style.top = "0px";
// // //     });
// // //     observer.observe(document.body, { childList: true, subtree: true });
// // //   }, []);

// // //   // Toggle dropdown visibility
// // //   const toggleTranslate = () => {
// // //     const element = document.getElementById("google_translate_element");
// // //     if (element.style.display === "none" || !element.style.display) {
// // //       element.style.display = "block";
// // //     } else {
// // //       element.style.display = "none";
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <div id="google_translate_element" style={{ display: "none" }}></div>

// // //       <div
// // //         className="translate-button"
// // //         onClick={toggleTranslate}
// // //         title="Translate this page"
// // //       >
// // //         <img
// // //           src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
// // //           alt="Google Translate"
// // //           className="translate-icon"
// // //         />
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default GoogleTranslate;
// // import React, { useEffect, useRef, useState } from "react";
// // import "./GoogleTranslator.css";

// // const GoogleTranslate = () => {
// //   const buttonRef = useRef(null);
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     // Add Google Translate script
// //     const addScript = document.createElement("script");
// //     addScript.src =
// //       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
// //     document.body.appendChild(addScript);

// //     // Define callback
// //     window.googleTranslateElementInit = () => {
// //       new window.google.translate.TranslateElement(
// //         {
// //           pageLanguage: "en",
// //           autoDisplay: false,
// //         },
// //         "google_translate_element"
// //       );
// //     };

// //     // Hide Google banner
// //     const observer = new MutationObserver(() => {
// //       const banner = document.querySelector(".goog-te-banner-frame");
// //       if (banner) banner.style.display = "none";
// //       const body = document.querySelector("body");
// //       if (body) body.style.top = "0px";
// //     });
// //     observer.observe(document.body, { childList: true, subtree: true });
// //   }, []);

// //   // Toggle visibility
// //   const toggleTranslate = () => {
// //     setIsVisible(!isVisible);
// //   };

// //   // --- Make the button draggable ---
// //   useEffect(() => {
// //     const button = buttonRef.current;
// //     if (!button) return;

// //     let isDragging = false;
// //     let offsetX, offsetY;

// //     const onMouseDown = (e) => {
// //       isDragging = true;
// //       offsetX = e.clientX - button.getBoundingClientRect().left;
// //       offsetY = e.clientY - button.getBoundingClientRect().top;
// //       button.style.cursor = "grabbing";
// //     };

// //     const onMouseMove = (e) => {
// //       if (isDragging) {
// //         button.style.left = `${e.clientX - offsetX}px`;
// //         button.style.top = `${e.clientY - offsetY}px`;
// //       }
// //     };

// //     const onMouseUp = () => {
// //       isDragging = false;
// //       button.style.cursor = "grab";
// //     };

// //     button.addEventListener("mousedown", onMouseDown);
// //     document.addEventListener("mousemove", onMouseMove);
// //     document.addEventListener("mouseup", onMouseUp);

// //     return () => {
// //       button.removeEventListener("mousedown", onMouseDown);
// //       document.removeEventListener("mousemove", onMouseMove);
// //       document.removeEventListener("mouseup", onMouseUp);
// //     };
// //   }, []);

// //   return (
// //     <>
// //       <div className="translate-container" ref={buttonRef}>
// //         <div
// //           className="translate-button"
// //           onClick={toggleTranslate}
// //           title="Translate this page"
// //         >
// //           <img
// //             src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
// //             alt="Google Translate"
// //             className="translate-icon"
// //           />
// //         </div>

// //         {/* Language box appears right beside the button */}
// //         {isVisible && (
// //           <div id="google_translate_element" className="translate-dropdown"></div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default GoogleTranslate;
// import React, { useEffect } from "react";
// import "./GoogleTranslator.css"; // import the css

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Create and inject the Google Translate script
//     const addScript = document.createElement("script");
//     addScript.src =
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     document.body.appendChild(addScript);

//     // Define global callback for Google Translate
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           autoDisplay: false,
//         },
//         "google_translate_element"
//       );
//     };

//     // Remove Google banner iframe automatically
//     const observer = new MutationObserver(() => {
//       const banner = document.querySelector(".goog-te-banner-frame");
//       if (banner) banner.style.display = "none";
//       const body = document.querySelector("body");
//       if (body) body.style.top = "0px";
//     });
//     observer.observe(document.body, { childList: true, subtree: true });
//   }, []);

//   // Toggle dropdown visibility
//   const toggleTranslate = () => {
//     const element = document.getElementById("google_translate_element");
//     if (element.style.display === "none" || !element.style.display) {
//       element.style.display = "block";
//     } else {
//       element.style.display = "none";
//     }
//   };

//   return (
//     <>
//       <div id="google_translate_element" style={{ display: "none" }}></div>

//       <div
//         className="translate-button"
//         onClick={toggleTranslate}
//         title="Translate this page"
//       >
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
//           alt="Google Translate"
//           className="translate-icon"
//         />
//       </div>
//     </>
//   );
// };

// export default GoogleTranslate;
import React, { useEffect } from "react";
import "./GoogleTranslator.css"; // import the css

const GoogleTranslate = () => {
  useEffect(() => {
    // ✅ Suppress Google Translate internal script errors
    const handleScriptError = (event) => {
      if (event.filename && event.filename.includes("translate")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        console.warn("Suppressed Google Translate script error:", event.message);
      }
    };
    window.addEventListener("error", handleScriptError);

    // ✅ Create and inject the Google Translate script safely (only once)
    if (!document.querySelector("#google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.onerror = () => console.warn("Google Translate script failed to load");
      document.body.appendChild(addScript);
    }

    // ✅ Define global callback for Google Translate safely
    window.googleTranslateElementInit = () => {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      } catch (err) {
        console.warn("Google Translate init failed:", err);
      }
    };

    // ✅ Remove Google banner iframe automatically, wrapped safely
    try {
      const observer = new MutationObserver(() => {
        const banner = document.querySelector(".goog-te-banner-frame");
        if (banner) banner.style.display = "none";
        const body = document.querySelector("body");
        if (body) body.style.top = "0px";
      });
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (err) {
      console.warn("MutationObserver issue:", err);
    }

    // ✅ Cleanup on unmount
    return () => {
      window.removeEventListener("error", handleScriptError);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleTranslate = () => {
    const element = document.getElementById("google_translate_element");
    if (element.style.display === "none" || !element.style.display) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <div
        className="translate-button"
        onClick={toggleTranslate}
        title="Translate this page"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
          alt="Google Translate"
          className="translate-icon"
        />
      </div>
    </>
  );
};

export default GoogleTranslate;

import React, { useEffect } from 'react';

function GoogleTranslate() {
    useEffect(() => {
        if (!window.googleTranslateElementInit) {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,es,fr,de,zh',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                }, 'google_translate_element');

                setTimeout(styleGoogleTranslate, 500); // Apply styles after load
            };

            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        } else {
            window.googleTranslateElementInit();
            styleGoogleTranslate();
        }
    }, []);

    // Apply inline styles to the dropdown itself (inside the iframe)
    function styleGoogleTranslate() {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
            select.style.width = '18px';
            // select.style.borderRadius = '8px';
            // select.style.border = '1px solid #ddd';
            // select.style.backgroundColor = '#f9fafb';
            // select.style.fontSize = '14px';
            // select.style.cursor = 'pointer';
        }
    
        // Optional: Hide Google branding
        const branding = document.querySelector('.goog-logo-link') as HTMLElement;
        if (branding) {
            branding.style.display = 'none';
        }
    }
    

    return (
        <div className="">
            {/* Tailwind styles applied to the outer wrapper */}
            <div id="google_translate_element" className="" />
        </div>
    );
}

export default GoogleTranslate;



import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from './i18n.js';

const LangContext = createContext();

export function LangProvider({ children }) {
  // Default: French. Persist choice in localStorage.
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lavorama-lang') || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('lavorama-lang', lang);
    // Update html lang attribute for accessibility & SEO
    document.documentElement.lang = lang;

    // Dynamic SEO titles & descriptions based on route and language
    const path = window.location.pathname;
    let title = lang === 'fr'
      ? 'Laverie automatique à Genève | Pâquis & Plainpalais | Lavorama'
      : 'Self-Service Laundromat in Geneva | Lavorama';
    let desc = lang === 'fr'
      ? 'Lavorama, votre laverie automatique à Genève. Deux laveries ouvertes à Pâquis et Plainpalais, machines libre-service, sèche-linge et machine grande capacité de 30 kg. Ouvert 7j/7 de 7h à 23h.'
      : 'Visit Lavorama in Pâquis and Plainpalais, Geneva. Self-service washing machines, tumble dryers and a large-capacity 30 kg machine. Open daily from 7 AM to 11 PM.';

    if (path === '/about') {
      title = lang === 'fr' ? 'À propos | Laverie Lavorama Genève' : 'About Us | Lavorama Laundromat Geneva';
      desc = lang === 'fr' ? 'Découvrez Lavorama, votre laverie moderne avec deux emplacements ouverts à Pâquis et Plainpalais, Genève.' : 'Learn more about Lavorama, your modern self-service laundromat with two open locations in Pâquis and Plainpalais, Geneva.';
    } else if (path === '/self-service-laundromat-geneva') {
      title = lang === 'fr' ? 'Laverie Libre-Service à Genève | Lavorama' : 'Self-Service Laundromat in Geneva | Open Daily 7-23 | Lavorama';
      desc = lang === 'fr' ? 'Machines à laver de 7 à 30 kg et sèche-linge à Pâquis et Plainpalais. Détergent inclus, ouvert 7j/7.' : 'Industrial washers from 7-30 kg and dryers in Pâquis and Plainpalais. Detergent included, open 7 days a week.';
    } else if (path === '/laundry-prices-geneva') {
      title = lang === 'fr' ? 'Tarifs Laverie Genève | Dès CHF 6 | Lavorama' : 'Laundromat Prices Geneva | From CHF 6 | Lavorama';
      desc = lang === 'fr' ? 'Tarifs clairs dès CHF 6 avec lessive incluse. Machines de 7 kg à 30 kg et sèche-linge à Genève.' : 'Clear pricing from CHF 6 with detergent included. Washers from 7 kg to 30 kg and tumble dryers in Geneva.';
    } else if (path === '/contact') {
      title = lang === 'fr' ? 'Contact & Accès | Pâquis & Plainpalais | Lavorama' : 'Contact & Locations | Pâquis & Plainpalais | Lavorama';
      desc = lang === 'fr' ? 'Contactez Lavorama ou venez à nos laveries Rue des Pâquis 43 et Rue Dancet 2 à Genève. Ouvert 7j/7 de 7h à 23h.' : 'Contact Lavorama or visit our laundromats at Rue des Pâquis 43 and Rue Dancet 2 in Geneva. Open daily 7 AM to 11 PM.';
    } else if (path === '/faq') {
      title = lang === 'fr' ? 'FAQ Laverie Genève | Questions Fréquentes | Lavorama' : 'Laundromat FAQ Geneva | Frequently Asked Questions | Lavorama';
      desc = lang === 'fr' ? 'Toutes les réponses à vos questions sur les laveries automatiques Lavorama à Genève (Pâquis et Plainpalais).' : 'All answers to your questions about Lavorama self-service laundromats in Geneva (Pâquis and Plainpalais).';
    } else if (path === '/terms') {
      title = lang === 'fr' ? 'Conditions Générales | Lavorama Genève' : 'Terms & Conditions | Lavorama Geneva';
    } else if (path === '/privacy') {
      title = lang === 'fr' ? 'Politique de Confidentialité | Lavorama Genève' : 'Privacy Policy | Lavorama Geneva';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);
  }, [lang]);

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/* ── Language Switcher Component ── */
export function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '2px',
      background: '#F1F5F9', borderRadius: '50px',
      padding: '4px', border: '1px solid #E2E8F0',
    }}>
      {[
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' },
      ].map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={code === 'fr' ? 'Passer en Français' : 'Switch to English'}
          aria-label={code === 'fr' ? 'Passer en Français' : 'Switch to English'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '4px 12px', borderRadius: '50px', border: 'none',
            background: lang === code ? 'var(--primary)' : 'transparent',
            color: lang === code ? 'white' : '#64748B',
            fontFamily: 'Fredoka', fontSize: '0.85rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.22s ease',
            boxShadow: lang === code ? '0 2px 8px rgba(108,191,191,0.35)' : 'none',
            minWidth: '40px'
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

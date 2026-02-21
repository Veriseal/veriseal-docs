import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function Home() {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;

  return (
    <Layout
      description="Deterministic cryptographic integrity layer for institutions and regulated markets"
    >
      <main className={styles.main}>

        <section className={`${styles.heroCompact} vs-hero`}>
          <div className={styles.heroInner}>

            <div className="vs-logo-container">
              <img src="/img/logo.png" alt="VeriSeal" />
            </div>

            <h1 className={styles.brand}>
              VeriSeal
            </h1>

            <h2 className={styles.punchline}>
              {currentLocale === 'fr'
                ? 'La couche d’intégrité manquante de l’économie numérique'
                : 'The Missing Integrity Layer of the Digital Economy'}
            </h2>

            <p className={styles.heroSub}>
              {currentLocale === 'fr'
                ? 'Infrastructure cryptographique déterministe sécurisant les preuves numériques et les registres institutionnels.'
                : 'Deterministic cryptographic infrastructure securing digital evidence and institutional records.'}
            </p>

            <div className={styles.ctaGroup}>
              <Link
                className="vs-btn-primary"
                to="/docs/whitepaper/core-thesis"
              >
                {currentLocale === 'fr'
                  ? 'Lire la Thèse Centrale'
                  : 'Read the Core Thesis'}
              </Link>

              <Link
                className="vs-btn-secondary"
                to="/docs/sectors/industries-overview"
              >
                {currentLocale === 'fr'
                  ? 'Explorer les Cas d’Usage'
                  : 'Explore Use Cases'}
              </Link>
            </div>

          </div>
        </section>

      </main>
    </Layout>
  );
}
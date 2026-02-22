import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title={translate({ id: 'homepage.title', message: 'VeriSeal — Global Integrity Infrastructure' })}
      description={translate({ id: 'homepage.description', message: 'Deterministic cryptographic integrity layer for institutions and regulated markets' })}
    >
      <main className={styles.main}>

        {/* HERO */}
        <section className={`${styles.heroCompact} vs-hero`}>
          <div className={styles.heroInner}>

            <div className="vs-logo-container">
              <img src="/img/logo.png" alt="VeriSeal" />
            </div>

            <h1 className={styles.brand}>
              VeriSeal
            </h1>

            <h2 className={styles.punchline}>
              <Translate id="homepage.hero.punchline">
                The Missing Integrity Layer of the Digital Economy
              </Translate>
            </h2>

            <p className={styles.heroSub}>
              <Translate id="homepage.hero.subtitle">
                Deterministic cryptographic infrastructure securing digital evidence, transactions, and institutional records across jurisdictions.
              </Translate>
            </p>

            <div className={styles.ctaGroup}>
              <Link className="vs-btn-primary" to="/docs/whitepaper/core-thesis">
                <Translate id="homepage.cta.primary">Read the Core Thesis</Translate>
              </Link>
              <Link className="vs-btn-secondary" to="/docs/sectors/industries-overview">
                <Translate id="homepage.cta.secondary">Explore Use Cases</Translate>
              </Link>
            </div>

          </div>
        </section>

        {/* SEPARATOR */}
        <section className="vs-separator">
          <div className="vs-separator-line"></div>
        </section>

        {/* STRUCTURAL GAP */}
        <section className="vs-section">
          <h2 className="vs-section-title">
            <Translate id="homepage.gap.title">The Structural Integrity Gap</Translate>
          </h2>

          <div className="vs-problem-grid">
            <div><Translate id="homepage.gap.item1">Digital evidence depends on system-level trust.</Translate></div>
            <div><Translate id="homepage.gap.item2">Timestamping does not ensure structural immutability.</Translate></div>
            <div><Translate id="homepage.gap.item3">Signatures validate identity — not architecture.</Translate></div>
            <div><Translate id="homepage.gap.item4">Blockchain anchoring does not replace governance.</Translate></div>
            <div><Translate id="homepage.gap.item5">AI-generated content increases evidentiary ambiguity.</Translate></div>
          </div>

          <p className="vs-section-sub">
            <Translate id="homepage.gap.conclusion">
              The digital economy operates without a deterministic integrity standard.
            </Translate>
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="vs-section-highlight">
          <h2 className="vs-section-title">
            <Translate id="homepage.how.title">How VeriSeal Works</Translate>
          </h2>

          <div className="vs-steps">
            <div className="vs-step">
              <span className="vs-step-number">1</span>
              <h3><Translate id="homepage.how.step1.title">Canonicalize</Translate></h3>
              <p><Translate id="homepage.how.step1.desc">Normalize data into a deterministic format eliminating structural ambiguity.</Translate></p>
            </div>

            <div className="vs-step">
              <span className="vs-step-number">2</span>
              <h3><Translate id="homepage.how.step2.title">Seal</Translate></h3>
              <p><Translate id="homepage.how.step2.desc">Generate a cryptographic hash and append-only ledger entry creating an immutable proof structure.</Translate></p>
            </div>

            <div className="vs-step">
              <span className="vs-step-number">3</span>
              <h3><Translate id="homepage.how.step3.title">Verify</Translate></h3>
              <p><Translate id="homepage.how.step3.desc">Independent verification across jurisdictions and over time.</Translate></p>
            </div>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="vs-section">
          <h2 className="vs-section-title">
            <Translate id="homepage.positioning.title">Dual Strategic Positioning</Translate>
          </h2>

          <div className="vs-positioning-grid">
            <div className="vs-card">
              <h3><Translate id="homepage.positioning.card1.title">Commercial Infrastructure</Translate></h3>
              <ul>
                <li><Translate id="homepage.positioning.card1.item1">API-native architecture</Translate></li>
                <li><Translate id="homepage.positioning.card1.item2">Enterprise deployment ready</Translate></li>
                <li><Translate id="homepage.positioning.card1.item3">Cross-sector scalability</Translate></li>
                <li><Translate id="homepage.positioning.card1.item4">Global interoperability</Translate></li>
              </ul>
            </div>

            <div className="vs-card">
              <h3><Translate id="homepage.positioning.card2.title">Emerging Global Standard</Translate></h3>
              <ul>
                <li><Translate id="homepage.positioning.card2.item1">Governance & conformance framework</Translate></li>
                <li><Translate id="homepage.positioning.card2.item2">Certification-ready model</Translate></li>
                <li><Translate id="homepage.positioning.card2.item3">Sovereignty-compatible design</Translate></li>
                <li><Translate id="homepage.positioning.card2.item4">Long-term archival resilience</Translate></li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTORS */}
        <section className="vs-section">
          <h2 className="vs-section-title">
            <Translate id="homepage.sectors.title">Immediate Applications</Translate>
          </h2>

          <div className="vs-sector-grid">
            <div><Translate id="homepage.sectors.item1">Banking & Financial Infrastructure</Translate></div>
            <div><Translate id="homepage.sectors.item2">Legal & Notarial Systems</Translate></div>
            <div><Translate id="homepage.sectors.item3">Public Sector & Procurement</Translate></div>
            <div><Translate id="homepage.sectors.item4">Insurance & Claims</Translate></div>
            <div><Translate id="homepage.sectors.item5">Digital Identity</Translate></div>
            <div><Translate id="homepage.sectors.item6">Supply Chain & Platforms</Translate></div>
          </div>
        </section>

        {/* FINAL STATEMENT */}
        <section className="vs-section-final">
          <h2><Translate id="homepage.final.title">VeriSeal Is Infrastructure</Translate></h2>

          <p className="vs-final-claim">
            <Translate id="homepage.final.claim">
              Not a workflow SaaS. Not a signature tool. Not a blockchain wrapper.
            </Translate>
          </p>

          <p>
            <Translate id="homepage.final.desc">
              VeriSeal is a structural cryptographic integrity layer designed to reduce digital uncertainty and anchor institutional trust in deterministic verification.
            </Translate>
          </p>
        </section>

      </main>
    </Layout>
  );
}
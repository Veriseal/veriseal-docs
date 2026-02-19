import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="VeriSeal — Global Integrity Infrastructure"
      description="Deterministic cryptographic integrity layer for institutions and regulated markets"
    >
      <main className={styles.main}>

        {/* HERO */}
        <section className={`${styles.heroCompact} vs-hero`}>
          <div className={styles.heroInner}>
            
            {/* Logo Container Premium - NOUVEAU */}
            <div className="vs-logo-container">
              <img src="/img/logo.png" alt="VeriSeal" />
            </div>

            <h1 className={styles.brand}>
              VeriSeal
            </h1>

            <h2 className={styles.punchline}>
              The Missing Integrity Layer<br />
              of the Digital Economy
            </h2>

            <p className={styles.heroSub}>
              Deterministic cryptographic infrastructure securing digital evidence,
              transactions, and institutional records across jurisdictions.
            </p>

            <div className={styles.ctaGroup}>
              <Link
                className="vs-btn-primary"
                to="/docs/whitepaper/core-thesis"
              >
                Read the Core Thesis
              </Link>

              <Link
                className="vs-btn-secondary"
                to="/docs/sectors/industries-overview"
              >
                Explore Use Cases
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
            The Structural Integrity Gap
          </h2>

          <div className="vs-problem-grid">
            <div>Digital evidence depends on system-level trust.</div>
            <div>Timestamping does not ensure structural immutability.</div>
            <div>Signatures validate identity — not architecture.</div>
            <div>Blockchain anchoring does not replace governance.</div>
            <div>AI-generated content increases evidentiary ambiguity.</div>
          </div>

          <p className="vs-section-sub">
            The digital economy operates without a deterministic integrity standard.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="vs-section-highlight">
          <h2 className="vs-section-title">
            How VeriSeal Works
          </h2>

          <div className="vs-steps">
            <div className="vs-step">
              <span className="vs-step-number">1</span>
              <h3>Canonicalize</h3>
              <p>
                Normalize data into a deterministic format
                eliminating structural ambiguity.
              </p>
            </div>

            <div className="vs-step">
              <span className="vs-step-number">2</span>
              <h3>Seal</h3>
              <p>
                Generate a cryptographic hash and append-only ledger entry
                creating an immutable proof structure.
              </p>
            </div>

            <div className="vs-step">
              <span className="vs-step-number">3</span>
              <h3>Verify</h3>
              <p>
                Independent verification across jurisdictions
                and over time.
              </p>
            </div>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="vs-section">
          <h2 className="vs-section-title">
            Dual Strategic Positioning
          </h2>

          <div className="vs-positioning-grid">
            <div className="vs-card">
              <h3>Commercial Infrastructure</h3>
              <ul>
                <li>API-native architecture</li>
                <li>Enterprise deployment ready</li>
                <li>Cross-sector scalability</li>
                <li>Global interoperability</li>
              </ul>
            </div>

            <div className="vs-card">
              <h3>Emerging Global Standard</h3>
              <ul>
                <li>Governance & conformance framework</li>
                <li>Certification-ready model</li>
                <li>Sovereignty-compatible design</li>
                <li>Long-term archival resilience</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTORS */}
        <section className="vs-section">
          <h2 className="vs-section-title">
            Immediate Applications
          </h2>

          <div className="vs-sector-grid">
            <div>Banking & Financial Infrastructure</div>
            <div>Legal & Notarial Systems</div>
            <div>Public Sector & Procurement</div>
            <div>Insurance & Claims</div>
            <div>Digital Identity</div>
            <div>Supply Chain & Platforms</div>
          </div>
        </section>

        {/* FINAL STATEMENT */}
        <section className="vs-section-final">
          <h2>VeriSeal Is Infrastructure</h2>

          <p className="vs-final-claim">
            Not a workflow SaaS.  
            Not a signature tool.  
            Not a blockchain wrapper.
          </p>

          <p>
            VeriSeal is a structural cryptographic integrity layer
            designed to reduce digital uncertainty
            and anchor institutional trust in deterministic verification.
          </p>
        </section>

      </main>
    </Layout>
  );
}

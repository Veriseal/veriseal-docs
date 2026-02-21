import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'VeriSeal — Global Integrity Infrastructure',
        description: 'Homepage title'
      })}
      description={translate({
        id: 'homepage.description',
        message: 'Deterministic cryptographic integrity layer for institutions and regulated markets',
        description: 'Homepage description'
      })}
    >
      <main className={styles.main}>

        {/* HERO - Autorité > Produit */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            
            {/* Logo Container - Style normatif */}
            <div className={styles.logoContainer}>
              <img src="/img/logo.png" alt="VeriSeal" />
            </div>

            {/* H1 Massif - Accent uniquement sur "Integrity" */}
            <h1 className={styles.heroTitle}>
              <Translate id="homepage.hero.title.part1">
                The Missing
              </Translate>{' '}
              <span className={styles.accentWord}>
                <Translate id="homepage.hero.title.accent">
                  Integrity
                </Translate>
              </span>{' '}
              <Translate id="homepage.hero.title.part2">
                Layer of the Digital Economy
              </Translate>
            </h1>

            {/* Sous-titre sobre */}
            <p className={styles.heroSubtitle}>
              <Translate id="homepage.hero.subtitle">
                Deterministic cryptographic infrastructure securing digital evidence,
                transactions, and institutional records across jurisdictions.
              </Translate>
            </p>

            {/* CTA Normatifs - Moins arrondis, plus plats */}
            <div className={styles.ctaGroup}>
              <Link
                className={styles.ctaPrimary}
                to="/docs/whitepaper/core-thesis"
              >
                <Translate id="homepage.cta.whitepaper">
                  Read the Core Thesis
                </Translate>
              </Link>

              <Link
                className={styles.ctaSecondary}
                to="/docs/standard/vip-framework-001"
              >
                <Translate id="homepage.cta.standard">
                  View the Standard
                </Translate>
              </Link>
            </div>

          </div>
        </section>

        {/* Separator Line */}
        <div className={styles.separator} />

        {/* STRUCTURAL INTEGRITY GAP - Plus normatif */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Translate id="homepage.gap.title">
              The Structural Integrity Gap
            </Translate>
          </h2>

          <div className={styles.gapGrid}>
            <div className={styles.gapCard}>
              <span className={styles.gapLabel}>
                <Translate id="homepage.gap.card1.label">SYSTEM RISK</Translate>
              </span>
              <h3 className={styles.gapCardTitle}>
                <Translate id="homepage.gap.card1.title">
                  System-Level Trust Dependence
                </Translate>
              </h3>
              <p className={styles.gapCardDesc}>
                <Translate id="homepage.gap.card1.desc">
                  Digital evidence depends on system-level trust, not cryptographic proof.
                </Translate>
              </p>
            </div>

            <div className={styles.gapCard}>
              <span className={styles.gapLabel}>
                <Translate id="homepage.gap.card2.label">TEMPORAL AMBIGUITY</Translate>
              </span>
              <h3 className={styles.gapCardTitle}>
                <Translate id="homepage.gap.card2.title">
                  Timestamping Without Immutability
                </Translate>
              </h3>
              <p className={styles.gapCardDesc}>
                <Translate id="homepage.gap.card2.desc">
                  Timestamping does not ensure structural immutability or verifiable integrity.
                </Translate>
              </p>
            </div>

            <div className={styles.gapCard}>
              <span className={styles.gapLabel}>
                <Translate id="homepage.gap.card3.label">IDENTITY LIMITATION</Translate>
              </span>
              <h3 className={styles.gapCardTitle}>
                <Translate id="homepage.gap.card3.title">
                  Signature Validates Identity Only
                </Translate>
              </h3>
              <p className={styles.gapCardDesc}>
                <Translate id="homepage.gap.card3.desc">
                  Signatures validate identity — not architectural integrity.
                </Translate>
              </p>
            </div>

            <div className={styles.gapCard}>
              <span className={styles.gapLabel}>
                <Translate id="homepage.gap.card4.label">GOVERNANCE VOID</Translate>
              </span>
              <h3 className={styles.gapCardTitle}>
                <Translate id="homepage.gap.card4.title">
                  Blockchain Without Governance
                </Translate>
              </h3>
              <p className={styles.gapCardDesc}>
                <Translate id="homepage.gap.card4.desc">
                  Blockchain anchoring does not replace deterministic governance.
                </Translate>
              </p>
            </div>

            <div className={styles.gapCard}>
              <span className={styles.gapLabel}>
                <Translate id="homepage.gap.card5.label">EVIDENTIARY CRISIS</Translate>
              </span>
              <h3 className={styles.gapCardTitle}>
                <Translate id="homepage.gap.card5.title">
                  AI-Generated Content Ambiguity
                </Translate>
              </h3>
              <p className={styles.gapCardDesc}>
                <Translate id="homepage.gap.card5.desc">
                  AI-generated content increases evidentiary ambiguity exponentially.
                </Translate>
              </p>
            </div>
          </div>

          <p className={styles.sectionConclusion}>
            <Translate id="homepage.gap.conclusion">
              The digital economy operates without a deterministic integrity standard.
            </Translate>
          </p>
        </section>

        {/* Separator */}
        <div className={styles.separator} />

        {/* HOW VERISEAL WORKS - Architecture Layers */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Translate id="homepage.architecture.title">
              VeriSeal Architecture
            </Translate>
          </h2>

          <div className={styles.architectureGrid}>
            <div className={styles.architectureLayer}>
              <div className={styles.layerHeader}>
                <span className={styles.layerNumber}>LAYER 1</span>
              </div>
              <h3 className={styles.layerTitle}>
                <Translate id="homepage.architecture.layer1.title">
                  Canonicalization Layer
                </Translate>
              </h3>
              <p className={styles.layerDesc}>
                <Translate id="homepage.architecture.layer1.desc">
                  Normalize data into a deterministic format eliminating structural ambiguity and ensuring reproducibility.
                </Translate>
              </p>
            </div>

            <div className={styles.architectureLayer}>
              <div className={styles.layerHeader}>
                <span className={styles.layerNumber}>LAYER 2</span>
              </div>
              <h3 className={styles.layerTitle}>
                <Translate id="homepage.architecture.layer2.title">
                  Ledger Commitment Layer
                </Translate>
              </h3>
              <p className={styles.layerDesc}>
                <Translate id="homepage.architecture.layer2.desc">
                  Generate a cryptographic hash and append-only ledger entry creating an immutable proof structure.
                </Translate>
              </p>
            </div>

            <div className={styles.architectureLayer}>
              <div className={styles.layerHeader}>
                <span className={styles.layerNumber}>LAYER 3</span>
              </div>
              <h3 className={styles.layerTitle}>
                <Translate id="homepage.architecture.layer3.title">
                  Independent Verification Layer
                </Translate>
              </h3>
              <p className={styles.layerDesc}>
                <Translate id="homepage.architecture.layer3.desc">
                  Independent verification across jurisdictions and over time without system dependence.
                </Translate>
              </p>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className={styles.separator} />

        {/* DUAL STRATEGIC POSITIONING - Executive Brief Style */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Translate id="homepage.positioning.title">
              Dual Strategic Positioning
            </Translate>
          </h2>

          <div className={styles.positioningGrid}>
            <div className={styles.positioningBlock}>
              <h3 className={styles.positioningTitle}>
                <Translate id="homepage.positioning.commercial.title">
                  Commercial Infrastructure
                </Translate>
              </h3>
              <div className={styles.positioningContent}>
                <div className={styles.positioningItem}>
                  <span className={styles.positioningLabel}>Architecture</span>
                  <span className={styles.positioningValue}>
                    <Translate id="homepage.positioning.commercial.item1">
                      API-native architecture
                    </Translate>
                  </span>
                </div>
                <div className={styles.positioningItem}>
                  <span className={styles.positioningLabel}>Deployment</span>
                  <span className={styles.positioningValue}>
                    <Translate id="homepage.positioning.commercial.item2">
                      Enterprise deployment ready
                    </Translate>
                  </span>
                </div>
                <div className={styles.positioningItem}>
                  <span className={styles.positioningLabel}>Scalability</span>
                  <span className={styles.positioningValue}>
                    <Translate id="homepage.positioning.commercial.item3">
                      Cross-sector scalability
                    </Translate>
                  </span>
                </div>
                <div className={styles.positioningItem}>
                  <span className={styles.positioningLabel}>Interoperability</span>
                  <span className={styles.positioningValue}>
                    <Translate id="homepage.positioning.commercial.item4">
                      Global interoperability
                    </Translate>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.positioningBlock}>
              <h3 className={styles.positioningTitle}>
                <Translate id="homepage.positioning.standard.title">
                  Emerging Global Standard
                </Translate>
              </h3>
              <div className={styles.positioningContent}>
                <div className={styles.positioningItem}>
                  <span className={styles.positioningLabel}>Governance</span>
                  <span className={styles.positioningValue}>
                    <Translate id="homepage.positioning.standard.item1">
                      Governance & conformance framework
                    </Translate>
                  </span>
                </div>
                <div className={styles.positioningItem}>
                  <span className={styles.positioningLabel}>Certification</span>
                  <span className={styles.positioningValue}>
                    <Translate id="homepage.positioning.standard.item2">
                      Certification-ready model
                    </Translate>
                  </span>
                </div>
                <div className={styles.positioningItem}>
                  <span className={styles.positioningLabel}>Sovereignty</span>
                  <span className={styles.positioningValue}>
                    <Translate id="homepage.positioning.standard.item3">
                      Sovereignty-compatible design
                    </Translate>
                  </span>
                </div>
                <div className={styles.positioningItem}>
                  <span className={styles.positioningLabel}>Archival</span>
                  <span className={styles.positioningValue}>
                    <Translate id="homepage.positioning.standard.item4">
                      Long-term archival resilience
                    </Translate>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className={styles.separator} />

        {/* IMMEDIATE APPLICATIONS - Standard Reference Style */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Translate id="homepage.applications.title">
              Regulated Sector Applications
            </Translate>
          </h2>

          <div className={styles.applicationsGrid}>
            <div className={styles.applicationRow}>
              <span className={styles.applicationLabel}>Financial Infrastructure</span>
              <span className={styles.applicationValue}>
                <Translate id="homepage.applications.financial">
                  Banking & Financial Infrastructure
                </Translate>
              </span>
            </div>
            <div className={styles.applicationRow}>
              <span className={styles.applicationLabel}>Legal Systems</span>
              <span className={styles.applicationValue}>
                <Translate id="homepage.applications.legal">
                  Legal & Notarial Systems
                </Translate>
              </span>
            </div>
            <div className={styles.applicationRow}>
              <span className={styles.applicationLabel}>Public Sector</span>
              <span className={styles.applicationValue}>
                <Translate id="homepage.applications.public">
                  Public Sector & Procurement
                </Translate>
              </span>
            </div>
            <div className={styles.applicationRow}>
              <span className={styles.applicationLabel}>Insurance</span>
              <span className={styles.applicationValue}>
                <Translate id="homepage.applications.insurance">
                  Insurance & Claims
                </Translate>
              </span>
            </div>
            <div className={styles.applicationRow}>
              <span className={styles.applicationLabel}>Identity</span>
              <span className={styles.applicationValue}>
                <Translate id="homepage.applications.identity">
                  Digital Identity
                </Translate>
              </span>
            </div>
            <div className={styles.applicationRow}>
              <span className={styles.applicationLabel}>Supply Chain</span>
              <span className={styles.applicationValue}>
                <Translate id="homepage.applications.supply">
                  Supply Chain & Platforms
                </Translate>
              </span>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className={styles.separator} />

        {/* FINAL STATEMENT */}
        <section className={styles.sectionFinal}>
          <h2 className={styles.finalTitle}>
            <Translate id="homepage.final.title">
              VeriSeal Is Infrastructure
            </Translate>
          </h2>

          <p className={styles.finalClaim}>
            <Translate id="homepage.final.claim">
              Not a workflow SaaS. Not a signature tool. Not a blockchain wrapper.
            </Translate>
          </p>

          <p className={styles.finalDesc}>
            <Translate id="homepage.final.desc">
              VeriSeal is a structural cryptographic integrity layer designed to reduce digital uncertainty and anchor institutional trust in deterministic verification.
            </Translate>
          </p>
        </section>

        {/* Separator */}
        <div className={styles.separator} />

        {/* FOOTER NORMATIVE BLOCK */}
        <section className={styles.footerNormative}>
          <div className={styles.normativeBlock}>
            <h3 className={styles.normativeTitle}>VeriSeal Integrity Standard</h3>
            <div className={styles.normativeInfo}>
              <span className={styles.normativeItem}>Version 1.0</span>
              <span className={styles.normativeSep}>·</span>
              <span className={styles.normativeItem}>
                <Translate id="homepage.footer.type">
                  Deterministic Evidence Infrastructure
                </Translate>
              </span>
            </div>
          </div>

          <div className={styles.normativeLinks}>
            <Link to="/docs/foundation/conformance-governance-model" className={styles.normativeLink}>
              <Translate id="homepage.footer.governance">Governance Framework</Translate>
            </Link>
            <Link to="/docs/standard/vip-framework-001" className={styles.normativeLink}>
              <Translate id="homepage.footer.conformance">Conformance Model</Translate>
            </Link>
            <Link to="/docs/strategy/standardization-strategy" className={styles.normativeLink}>
              <Translate id="homepage.footer.roadmap">Standardization Roadmap</Translate>
            </Link>
          </div>

          <div className={styles.normativeLegal}>
            <p>© {new Date().getFullYear()} VeriSeal</p>
            <p className={styles.normativeJurisdiction}>
              <Translate id="homepage.footer.jurisdiction">
                Standard Reference — Multi-Jurisdictional Framework
              </Translate>
            </p>
          </div>
        </section>

      </main>
    </Layout>
  );
}

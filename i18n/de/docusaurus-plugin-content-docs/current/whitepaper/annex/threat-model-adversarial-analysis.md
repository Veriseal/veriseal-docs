---
title: Bedrohungsmodell & Analyse von Angreifern
sidebar_label: Bedrohungsmodell (Anhang)
---

# Bedrohungsmodell & Analyse von Angreifern

## 1. Zweck und Umfang

Dieser Anhang bietet eine sicherheitsorientierte Analyse der VeriSeal-Beweis-Infrastruktur unter feindlichen Bedingungen.

Er definiert:

- Bedrohungsakteure und Fähigkeiten
- Vertrauensgrenzen
- Angriffsflächen
- Sicherheitsannahmen
- Erkennungs- und Abwehrmechanismen
- Restrisiken und Governance-Anforderungen

Dieser Anhang ist für institutionelle Interessengruppen (CISO, Risiko, Audit, Compliance) verfasst.

---

## 2. Zu schützende Systemressourcen

VeriSeal ist darauf ausgelegt, die **Integrität und Überprüfbarkeit** von Beweisartefakten und Beweisaufzeichnungen zu schützen.

Primäre Ressourcen:

1. **Artefakt-Integrität**
   Das versiegelte Artefakt muss über die Zeit hinweg überprüfbar und manipulationssicher bleiben.

2. **Integrität des Beweisobjekts**
   Beweisaufzeichnungen (kanonisches JSON) dürfen nicht ohne Erkennung verändert werden.

3. **Kontinuität des Ledgers**
   Die nur anhängbare Kette muss strukturell unveränderlich und chronologisch konsistent bleiben.

4. **Unabhängigkeit der Verifizierung**
   Dritte müssen in der Lage sein, Beweise ohne Vertrauen in den Betreiber zu überprüfen.

5. **Integrität des Zeitstempels (optionale externe Verankerung)**
   Wenn eine externe Verankerung existiert, muss der Anker die Zeitgenauigkeit stärken.

6. **Schlüsselintegrität (Signaturschlüssel)**
   Private Schlüssel, die zur Signierung verwendet werden, müssen vertraulich und verwaltet bleiben.

---

## 3. Bedrohungsakteure

### 3.1 Externer Angreifer
Fähigkeiten:
- Versuche der Netzwerkebenen-Abfangung
- Abtasten öffentlicher Endpunkte
- Versuche der Artefakt-Substitution
- Wiederholungsversuche für Erfassungsflüsse (falls zutreffend)

Einschränkungen:
- Kein direkter Zugriff auf Signaturschlüssel oder internen Speicher (angenommen)

### 3.2 Insider-Bedrohung (Betreiber oder privilegierter Administrator)
Fähigkeiten:
- Potenzieller Zugriff auf Infrastruktur
- Versuche, Aufzeichnungen zu ändern
- Versuche, Beweise zu löschen oder selektiv zu verbergen
- Versuche, PDF- oder Präsentationsausgaben zu manipulieren

### 3.3 Böswilliger Beweismittelsubmitter
Fähigkeiten:
- Einreichen falscher oder irreführender Inhalte
- Einreichen manipulierter Artefakte
- Versuch, Workflow-Mehrdeutigkeiten auszunutzen
- Versuch der Leugnung nach der Versiegelung ("Ich habe das nie gesendet")

### 3.4 Kompromittiertes Client-Gerät
Fähigkeiten:
- Malware verändert Artefakt vor der Versiegelung
- Kompromittierung von Anmeldedaten
- Abfangen oder Ändern lokaler Daten vor dem Hochladen

### 3.5 Lieferketten- / Abhängigkeitsangreifer
Fähigkeiten:
- Kompromittierung von Abhängigkeiten
- Kompromittierung der Build-Pipeline
- Versuche der Laufzeiteinschleusung

---

## 4. Vertrauensgrenzen

VeriSeal erzwingt explizite Vertrauensgrenzen:

Innerhalb der VeriSeal-Vertrauensgrenze:
- Hash-Berechnung
- Kanonische Beweisobjekterstellung
- Ledger-Anhängeoperation
- Signaturerstellung (kontrollierte Schlüssel-Domäne)
- Optionale Ankerübermittlung

Außerhalb der Vertrauensgrenze:
- Artefakterstellungstools
- Sicherheit des Benutzergeräts
- Semantische Wahrheit des Inhalts
- Rechtliche Interpretation
- Menschliche Absicht und Kontext

Hauptprinzip: **VeriSeal sichert die Struktur, nicht die Bedeutung.**

---

## 5. Überblick über die Angriffsfläche

Primäre Angriffsflächen:

1. **Eingangsartefaktaufnahme** (Upload / Nutzlastgenerierung)
2. **Beweiserstellungspipeline** (Hashing + Kanonisierung + Signierung)
3. **Ledger-Speicherung** (Integrität der nur anhängbaren Kette)
4. **Verifizierungsendpunkte** (öffentliches JSON, PDF-Rendering, HTML-Verifizierungsseite)
5. **Schlüsselverwaltung** (Vertraulichkeit und Nutzungsrichtlinie des privaten Schlüssels)
6. **Build/CI und Abhängigkeitskette** (Integrität der Lieferkette)

---

## 6. Bedrohungsszenarien und Abwehrmaßnahmen

### 6.1 Manipulation des Artefakts nach der Versiegelung
Angriff: Artefakt wird nach der Versiegelung verändert.

Erkennung:
- Neu berechneter SHA-256-Digest weicht ab.

Abwehrmaßnahme:
- Deterministisches Hashing
- Beweisvalidierung erfordert Neuberechnung

Restrisiko:
- Keines für die Erkennung (Integrität erkennt immer Änderungen)
- Semantische Streitigkeiten bleiben möglich

---

### 6.2 Manipulation des Beweisobjekts (JSON)
Angriff: Beweis-JSON-Felder (Zeitstempel, Identifikatoren, Flags) ändern.

Erkennung:
- Signaturüberprüfung schlägt fehl
- Hash-Abweichung bei kanonischer Neuberechnung

Abwehrmaßnahme:
- Kanonisches JSON als Wahrheitsquelle
- Signatur über kanonische Nutzlast

Restrisiko:
- Wenn der Signaturschlüssel kompromittiert ist (siehe Szenario Schlüsselkompromittierung)

---

### 6.3 Ledger-Mutation / -Löschung
Angriff: Eintrag löschen oder historische Kette umschreiben.

Erkennung:
- Kettenunterbrechung (previous_entry_hash-Abweichung)
- entry_hash-Neuberechnung weicht ab

Abwehrmaßnahme:
- Nur anhängbare Architektur
- Kettenhash-Abhängigkeit
- Regelmäßige externe Verankerung wird für hohe Sicherheit empfohlen

Restrisiko:
- Angriffe auf Speicherebene können das gesamte Ledger löschen, wenn die Governance schwach ist
  (Verfügbarkeitsrisiko; Integritätserkennung bleibt, aber Beweise könnten fehlen)

---

### 6.4 Selektive Beweisunterdrückung ("Beweisverbergen")
Angriff: Betreiber versteckt oder verweigert den Zugriff auf einen Beweisendpunkt.

Erkennung:
- Öffentliche Referenz existiert, aber Endpunkt antwortet nicht
- Externe Kopien von JSON beweisen frühere Existenz

Abwehrmaßnahme:
- Institutionelle Archivierung von Beweisbündeln fördern
- Externe Verankerung stärkt Existenzansprüche
- Governance-Richtlinien für Verfügbarkeit

Restrisiko:
- Verfügbarkeit bleibt operativ gesteuert

---

### 6.5 Manipulation der Präsentationsschicht (PDF/HTML)
Angriff: PDF-Rendering oder HTML-Ansicht ändern, um falschen Status anzuzeigen.

Erkennung:
- Kanonisches JSON bleibt Wahrheitsquelle
- Prüfer berechnet Hashes neu und validiert Signatur

Abwehrmaßnahme:
- Nur-Rendering-Regel
- Verifizierungslogik hängt nie von Präsentationsausgabe ab

Restrisiko:
- Risiko der sozialen Manipulation bleibt (Benutzer vertrauen visuellen Darstellungen ohne Verifizierung)

---

### 6.6 Wiederholungsangriffe (Erfassungsbasierte Beweise)
Angriff: Eine frühere Video-/Audioaufnahme wiederholen, um Lebendigkeit vorzutäuschen.

Erkennung/Abwehrmaßnahme (wenn Erfassungsflüsse existieren):
- Challenge-Response-Bindung (dynamische Aufforderungen)
- Laufzeit-Ereignisprotokoll-Hashing
- Medienbindung an Laufzeit-Nutzlast

Restrisiko:
- Abhängig von der Qualität des Erfassungsworkflows
- Nicht anwendbar auf statische Artefaktversiegelungsanwendungsfälle

---

### 6.7 Man-in-the-Middle / Transportebenenangriff
Angriff: Verkehr während des Uploads oder der Verifizierung abfangen oder ändern.

Abwehrmaßnahme:
- TLS erzwungen (HTTPS)
- Hash-Neuberechnung und Signaturvalidierung verhindern stilles Manipulieren

Restrisiko:
- Diebstahl von Anmeldedaten liegt außerhalb des kryptografischen Modells
- Netzwerk-Downgrade-Angriffe werden durch striktes HTTPS und HSTS gemindert (empfohlen)

---

### 6.8 Kompromittierung des privaten Schlüssels
Angriff: Signaturschlüssel gestohlen.

Auswirkung:
- Angreifer kann gefälschte Beweise ausstellen, die gültig erscheinen
- Historische Beweise bleiben überprüfbar, aber das Vertrauen in den Unterzeichner ist beeinträchtigt

Abwehrmaßnahme:
- HSM / KMS-gestützte Signierung
- Schlüsselrotationsrichtlinie
- Audit-Protokolle für Signaturoperationen
- Trennung der Aufgaben (Doppelkontrolle)

Restrisiko:
- Szenario mit höchster Auswirkung; Governance ist zwingend erforderlich

---

### 6.9 Schwächung der Hash-Funktion (Kryptografischer Durchbruch)
Angriff: Praktische Kollision oder zweites Präimage gegen SHA-256.

Auswirkung:
- Integritätsannahmen verschlechtern sich

Abwehrmaßnahme:
- Algorithmus-Agilität (hash_version-Feld)
- Fähigkeit, Beweise mit stärkeren Primitiven neu zu verankern
- Unterstützung für Dual-Hash-Strategien in zukünftigen Versionen

Restrisiko:
- Langfristiges kryptografisches Evolutionsrisiko besteht für alle Systeme

---

### 6.10 Kompromittierung der Lieferkette
Angriff: Build-Abhängigkeiten injizieren bösartigen Code.

Abwehrmaßnahme:
- Abhängigkeiten fixieren
- Reproduzierbare Builds
- Code-Signierung
- SBOM-Generierung
- CI-Integritätskontrollen

Restrisiko:
- Erfordert disziplinierte Software-Governance

---

## 7. Sicherheitsannahmen

VeriSeal Sicherheitsannahmen:

- SHA-256 bleibt sicher (keine praktikablen Kollisionen)
- Signaturschema bleibt sicher (keine praktikable Fälschung ohne privaten Schlüssel)
- Kanonische Serialisierung ist deterministisch und kontrolliert
- Nur anhängbare Durchsetzung ist operativ geschützt
- Private Schlüssel werden durch institutionelles Schlüsselmanagement geschützt

---

## 8. Sicherheitsgarantien (Was VeriSeal tatsächlich garantiert)

VeriSeal garantiert:

- Erkennung jeder nach der Versiegelung erfolgten Artefaktänderung
- Deterministische Verifizierungsreproduzierbarkeit
- Strukturelle Integrität und Kettenkontinuität (wenn Ledger verfügbar)
- Manipulationssicherheit des Beweisobjekts durch Signatur
- Optionale Verstärkung der externen Zeitverankerung

VeriSeal garantiert nicht:

- Wahrheit des Inhalts
- Identitätslegitimität standardmäßig
- Schutz vor kompromittierten Client-Geräten
- Verfügbarkeit von Beweisendpunkten ohne Governance

---

## 9. Restrisiko und Governance-Anforderungen

VeriSeal ist am stärksten, wenn die Governance Folgendes durchsetzt:

- Schlüsselmanagementrichtlinie (HSM/KMS, Rotation, Audit)
- Verfügbarkeitsrichtlinie (Archivbündel, Redundanz)
- Rollentrennung (Versiegelung vs. Verifizierung vs. Verwaltung)
- Verfahren zur Vorfallreaktion
- Externe Verankerungsrichtlinie für Hochsicherheitsanwendungsfälle

Ohne Governance bleibt die Integrität erkennbar, aber die operative Widerstandsfähigkeit kann abnehmen.

---

## 10. Zusammenfassung der institutionellen Sicherheitslage

VeriSeal ist konzipiert als:

- Ein deterministisches Integritätsprotokoll
- Eine auditkompatible Beweisschicht
- Ein System zur Minimierung von Vertrauensabhängigkeiten
- Ein manipulationssicheres Ledger + Beweisobjektmodell

Es bietet überprüfbare Integritätsgarantien unter feindlichen Bedingungen, vorausgesetzt, dass Schlüssel-Governance und operative Kontrollen durchgesetzt werden.

---

## 11. Risikoklassifikationsmatrix

Dieser Abschnitt formalisiert die Bedrohungsschwere nach Auswirkung und Wahrscheinlichkeit.

Risikoklassifikationsmodell:

- Wahrscheinlichkeit: Niedrig / Mittel / Hoch
- Auswirkung: Moderat / Signifikant / Kritisch
- Restrisiko: Nach Abwehrmaßnahmen
- Risiko-Eigentümer: Verantwortungsbereich der Governance

| Bedrohungsszenario | Wahrscheinlichkeit | Auswirkung | Stärke der Abwehrmaßnahme | Restrisiko | Risiko-Eigentümer |
|--------------------|--------------------|------------|--------------------------|------------|-------------------|
| Manipulation des Artefakts nach der Versiegelung | Mittel | Signifikant | Kryptografische Erkennung | Niedrig | Verifizierungsschicht |
| Änderung des Beweis-JSON | Niedrig | Signifikant | Signatur + Kanonisierung | Niedrig | Kryptografische Schicht |
| Ledger-Mutation | Niedrig | Kritisch | Hash-Verkettung + Erkennung | Niedrig | Infrastruktur-Governance |
| Beweisunterdrückung | Mittel | Signifikant | Archivierung + Verankerung | Mittel | Operative Governance |
| Manipulation der Präsentation | Mittel | Moderat | JSON als Wahrheitsquelle | Niedrig | Verifizierungsdisziplin |
| Kompromittierung des privaten Schlüssels | Niedrig | Kritisch | HSM/KMS + Rotation | Mittel | Schlüssel-Governance |
| Schwächung des Hash-Algorithmus | Sehr niedrig | Kritisch | Algorithmus-Agilität | Niedrig | Kryptografische Governance |
| Kompromittierung der Lieferkette | Mittel | Signifikant | CI-Kontrollen + SBOM | Mittel | DevSecOps-Governance |

Zusammenfassung der Risikolage:

- Strukturelle Integritätsrisiken sind stark gemindert.
- Schlüsselkompromittierung bleibt das Szenario mit der höchsten Auswirkung.
- Die Reife der Governance beeinflusst direkt das Restrisiko.

---

## 12. Governance- und Rollentrennungsmodell

VeriSeal-Sicherheit setzt institutionelle Aufgabentrennung voraus.

### 12.1 Funktionale Rollen

**Versiegelungsoperator**
- Initiert die Beweiserstellung.
- Kann historische Ledger-Einträge nicht ändern.

**Verifizierungsbehörde**
- Führt unabhängige Validierung durch.
- Hat keinen Zugriff auf Signaturschlüssel.

**Schlüsselverwalter**
- Verwaltert Signaturschlüssel.
- Arbeitet unter einer Doppelkontrollrichtlinie.

**Infrastrukturadministrator**
- Verwaltet Systemverfügbarkeit.
- Kann signierte Beweisnutzlasten nicht ändern.

**Auditfunktion**
- Überprüft Protokolle und Kettenkontinuität.
- Unabhängig vom Betrieb.

---

### 12.2 RACI-Übersicht

| Funktion | Versiegeln | Verifizieren | Signieren | Warten | Audit |
|----------|------------|--------------|-----------|--------|-------|
| Versiegelungsoperator | R | C | - | - | - |
| Verifizierungsbehörde | - | R | - | - | C |
| Schlüsselverwalter | - | - | R | - | C |
| Infrastrukturadministrator | - | - | - | R | C |
| Audit | - | C | C | C | R |

R = Verantwortlich
C = Kontrolle / Aufsicht

---

### 12.3 Governance-Prinzip

Integrität wird durch Kryptografie durchgesetzt.
Vertrauen wird durch Governance-Trennung durchgesetzt.

Kryptografische Garantien reduzieren die Abhängigkeit vom menschlichen Vertrauen,
aber institutionelle Governance stellt die Widerstandsfähigkeit sicher.

---

## 13. Vorfallreaktion & Verfahren bei Schlüsselkompromittierung

Dieser Abschnitt definiert die minimale institutionelle Reaktionshaltung.

### 13.1 Szenario Schlüsselkompromittierung

Wenn der Verdacht auf eine Kompromittierung des Signaturschlüssels besteht:

1. Sofortige Schlüsselrücknahme.
2. Einstellung der Ausstellung neuer Beweise.
3. Generierung eines neuen Signaturschlüsselpaares.
4. Veröffentlichung einer öffentlichen Vorfallmitteilung.
5. Neuverankerung des Systemzustands (falls zutreffend).
6. Durchführung einer forensischen Prüfung.

Historische Beweise bleiben strukturell überprüfbar.
Das Vertrauensdomäne verschiebt sich auf die Gültigkeitsdauer des Schlüssels.

---

### 13.2 Vorfall der Beweisintegrität

Wenn Ledger-Korruption festgestellt wird:

- Kettenkontinuität neu berechnen.
- Abweichungspunkt identifizieren.
- Aus validierter Sicherung wiederherstellen.
- Integritätserklärung veröffentlichen.

---

### 13.3 Öffentliches Transparenzprinzip

Für institutionelle Implementierungen:

- Offenlegungspolitik für Vorfälle erforderlich.
- Zeitgestempelte Vorfallsprotokolle empfohlen.
- Unabhängige Prüfung ratsam für Hochsicherheitsbereiche.

---

### 13.4 Langfristige kryptografische Evolution

Wenn Hash- oder Signatur-Primitiven schwächer werden:

- Versioniertes Hash-Feld einführen.
- Bestehende Beweise neu verankern.
- Unterstützung für Dual-Hash-Strategie während der Migration.

Algorithmus-Agilität muss in die Governance-Roadmap integriert werden.
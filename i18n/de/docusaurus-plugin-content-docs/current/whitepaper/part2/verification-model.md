---
title: Verifikationsmodell
sidebar_label: 2.3 Verifikationsmodell
slug: /whitepaper/part2/verification-model
sidebar_position: 2.3
---

# 2.3 Verifikationsmodell

Eine Vertrauensinfrastruktur darf nicht von der Behauptung des Betreibers abhängen.

Die Verifikation muss unabhängig ausführbar sein.

---

## Verifikationsschritte

1. Kanonische Nutzlast neu berechnen  
2. SHA-256-Digest neu berechnen  
3. Merkle-Einschluss validieren (falls zutreffend)  
4. Ledger-Verkettung validieren  
5. Optionale OTS-Verankerung validieren  
6. Optionale PDF-Signatur validieren  

Es ist keine proprietäre Serverlogik erforderlich.

---

## Prinzip des öffentlichen JSON

Öffentliches JSON ist die Quelle der Wahrheit.

PDF dient nur der Darstellung.

Die Verifikation muss auch dann möglich bleiben, wenn:

- Der Betreiber seine Tätigkeit einstellt
- Die kommerzielle Einheit sich ändert
- Die Infrastruktur migriert

---

## Transparenz ohne Datenleck

Öffentliche Verifikation offenbart:

- Verpflichtungen  
- Hashes  
- Integritätsfakten  

Sie offenbart nicht:

- Private Inhalte  
- Vertrauliche Nutzlasten  
- Sensible Metadaten  

Diese Trennung ist strukturell.

---

## Institutionelles Vertrauen

Unabhängige Reproduzierbarkeit ermöglicht:

- Regulatorische Überprüfung  
- Forensische Prüfung  
- Grenzüberschreitende Verifikation  
- Langfristige Archivvalidierung  

VeriSeal minimiert Vertrauen.
Es maximiert die Reproduzierbarkeit.
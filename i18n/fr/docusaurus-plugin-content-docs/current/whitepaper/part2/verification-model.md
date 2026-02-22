---
title: Modèle de Vérification
sidebar_label: 2.3 Modèle de Vérification
slug: /whitepaper/part2/verification-model
sidebar_position: 2.3
---

# 2.3 Modèle de Vérification

Une infrastructure de confiance ne peut pas dépendre de l'affirmation de l'opérateur.

La vérification doit être exécutable de manière indépendante.

---

## Étapes de Vérification

1. Recalculer la charge utile canonique  
2. Recalculer le digest SHA-256  
3. Valider l'inclusion Merkle (si applicable)  
4. Valider l'enchaînement du registre  
5. Valider l'ancrage OTS optionnel  
6. Valider la signature PDF optionnelle  

Aucune logique serveur propriétaire n'est requise.

---

## Principe du JSON Public

Le JSON public est la source de vérité.

Le PDF est uniquement pour l'affichage.

La vérification doit rester possible même si :

- L'opérateur cesse son activité
- L'entité commerciale change
- L'infrastructure migre

---

## Transparence Sans Fuite de Données

La vérification publique expose :

- Engagements  
- Hashes  
- Faits d'intégrité  

Elle n'expose pas :

- Contenu privé  
- Charges utiles confidentielles  
- Métadonnées sensibles  

Cette séparation est structurelle.

---

## Confiance Institutionnelle

La reproductibilité indépendante permet :

- Examen réglementaire  
- Audit judiciaire  
- Vérification transfrontalière  
- Validation d'archivage à long terme  

VeriSeal minimise la confiance.
Il maximise la reproductibilité.
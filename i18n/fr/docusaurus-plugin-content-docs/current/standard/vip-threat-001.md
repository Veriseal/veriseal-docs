---
title: VIP-THREAT-001 - Modèle de Menace et d'Adversaire VeriSeal
sidebar_label: VIP-THREAT-001
---

# VIP-THREAT-001  
## Modèle de Menace et d'Adversaire VeriSeal

Version : 2.0  
Statut : Profil de Sécurité Normatif  
Classification : Spécification de Sécurité Publique  

---

# 1. Portée

Ce document définit le modèle formel de menace et d'adversaire applicable à :

- VIP-STD-001 (Noyau d'Intégrité)
- VIP-STD-002 (Profil de Registre)
- VIP-STD-003 (Profil de Signature)
- VIP-STD-004 (Profil d'Ancrage Temporel)
- VIP-STF-005 (Cadre de Vérification et de Conformité)

Ce document définit :

- Objectifs de sécurité
- Classification des actifs
- Capacités de l'adversaire
- Surfaces d'attaque
- Revendications de sécurité formelles
- Risques résiduels

---

# 2. Objectifs de Sécurité

Le Cadre d'Intégrité VeriSeal vise à garantir :

1. Intégrité déterministe
2. Détection de falsification
3. Immutabilité structurelle
4. Authenticité cryptographique (si le profil de signature est utilisé)
5. Continuité du registre
6. Corroboration temporelle indépendante (si le profil d'ancrage est utilisé)

Le cadre ne garantit explicitement PAS :

- Véracité du contenu
- Validation d'identité (sauf si un système externe est utilisé)
- Force exécutoire légale
- Exactitude sémantique
- Légitimité du contenu

VeriSeal est un cadre d'intégrité, pas un système de vérité.

---

# 3. Actifs

Les actifs suivants sont critiques pour la sécurité :

- Objet de preuve canonique
- proof_hash déterministe
- Entrée de registre
- Continuité de previous_entry_hash
- Matériel de signature
- Référence d'ancrage
- Métadonnées de vérification

L'intégrité de ces actifs DOIT être préservée.

---

# 4. Classes d'Adversaires

## 4.1 Observateur Passif

Capacités :
- Accès en lecture complète
- Observation du trafic

Ne peut pas :
- Modifier les données stockées

---

## 4.2 Modificateur Actif

Capacités :
- Tenter de modifier les enregistrements
- Tenter de substituer les enregistrements
- Tenter de réorganiser le registre

---

## 4.3 Attaquant Cryptographique

Capacités :
- Tenter une collision de hash
- Tenter une falsification de signature
- Tenter une falsification d'ancrage
- Tenter une réutilisation

Limité par les hypothèses cryptographiques classiques.

---

## 4.4 Adversaire Interne

Capacités :
- Modifier les enregistrements avant scellement
- Compromettre les clés privées
- Manipuler la couche de stockage

La mitigation est opérationnelle, non au niveau du protocole.

---

# 5. Catégories de Menaces

## 5.1 Attaques de Sérialisation

Attaque :
Manipulation de l'ordre des champs ou de l'encodage pour changer le hash.

Mitigation :
- Canonicalisation stricte (VIP-STD-001)
- Déterminisme au niveau des octets
- Hachage déterministe

---

## 5.2 Substitution de Hash

Attaque :
Remplacement de proof_hash par une valeur alternative.

Mitigation :
- Recalcul déterministe
- Liaison de signature (VIP-STD-003)

---

## 5.3 Réorganisation du Registre

Attaque :
Réorganisation des entrées pour manipuler la chronologie.

Mitigation :
- Chaînage de previous_entry_hash
- Vérification déterministe du registre

---

## 5.4 Attaques de Réutilisation

Attaque :
Réutilisation d'une preuve valide dans un contexte non prévu.

Mitigation :
- proof_id unique
- Liaison contextuelle
- Ancrage temporel (optionnel)

---

## 5.5 Attaques de Signature

Inclut :
- Falsification
- Malléabilité
- Faible aléa

Mitigation :
- Signature déterministe (RFC 6979)
- Normalisation Low-S (ECDSA)
- Ed25519 préféré
- Gestion sécurisée des clés (exigence de mise en œuvre)

---

## 5.6 Falsification d'Ancrage

Attaque :
Fournir des références temporelles externes fabriquées.

Mitigation :
- Systèmes d'ancrage vérifiables publiquement
- Recalcul indépendant
- Stratégies multi-ancrage (optionnel)

---

# 6. Limites de Confiance

Les limites de confiance existent entre :

1. Génération de preuve
2. Stockage du registre
3. Autorité de signature
4. Autorité d'ancrage
5. Acteur de vérification

Le protocole suppose :

- Vérificateur indépendant
- Transparence publique de l'ancrage
- Garde sécurisée des clés

---

# 7. Revendications de Sécurité Formelles

Sous les hypothèses cryptographiques classiques :

Si :
- SHA-256 reste résistant aux collisions
- ECDSA / Ed25519 restent sécurisés
- Le facteur RSA reste computationnellement infaisable

Alors :

- La falsification est détectable
- La réécriture du registre est détectable
- La falsification de signature est infaisable
- La falsification d'ancrage est détectable

Ces garanties se dégradent proportionnellement si les hypothèses échouent.

---

# 8. Risques Résiduels

Le cadre n'élimine pas :

- Compromission de clé privée
- Faible entropie dans la génération de signature
- Bugs d'implémentation
- Corruption de stockage
- Manipulation interne avant scellement
- Attaques par déni de service

Ceux-ci sont en dehors des garanties du protocole.

---

# 9. Déni de Service

Le protocole ne fournit pas :

- Protection contre l'épuisement du stockage
- Garanties de disponibilité du point d'ancrage
- Résistance aux inondations réseau

Une mitigation opérationnelle est requise.

---

# 10. Considérations Post-Quantiques

La version 2.0 ne fournit pas de sécurité post-quantique.

Les révisions futures POURRAIENT inclure :

- Agilité de hash
- Algorithmes de signature PQ
- Modes de signature hybrides

---

# 11. Conclusion

Le cadre VeriSeal fournit une détection déterministe de falsification sous les hypothèses cryptographiques classiques.

Les garanties de sécurité dépendent de :

- Canonicalisation stricte
- Hachage déterministe
- Chaînage correct du registre
- Gestion sécurisée des clés
- Ancrage vérifiable publiquement

La discipline d'implémentation est obligatoire.

VeriSeal définit des garanties d'intégrité — pas des garanties de confiance.
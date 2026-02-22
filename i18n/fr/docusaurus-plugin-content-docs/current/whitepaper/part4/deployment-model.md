---
id: deployment-model
title: Modèle de Déploiement
sidebar_position: 4.2
---

# Modèle de Déploiement

## Pile de Référence

L'architecture typique peut inclure :

- Couche d'application (par exemple, FastAPI)
- Génération de preuve déterministe
- Base de données de registre en en ajout seul
- Sortie JSON canonique
- Ancrage d'horodatage optionnel
- Couche de passerelle sécurisée par TLS

La pile spécifique peut évoluer.

Le modèle de preuve déterministe doit rester stable.

---

## Configurations Souveraines

Les institutions peuvent exiger :

- Garanties de résidence des données
- Infrastructure isolée
- Points de terminaison de vérification privés
- Contrôles de gouvernance internes

La logique de vérification doit rester interopérable entre les déploiements.

---

## Séparation de la Vérification Publique

Les points de terminaison de vérification peuvent fonctionner indépendamment de :

- Systèmes d'authentification
- Logique métier
- Stockage de données

Cela garantit la vérifiabilité à long terme même en cas de changement organisationnel.
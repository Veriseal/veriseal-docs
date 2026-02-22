---
title: Modèle de Menace & Analyse Adversariale
sidebar_label: Modèle de Menace (Annexe)
---

# Modèle de Menace & Analyse Adversariale

## 1. Objectif et Portée

Cette annexe fournit une analyse axée sur la sécurité de l'infrastructure de preuve VeriSeal dans des conditions adverses.

Elle définit :

- Acteurs de menace et capacités
- Limites de confiance
- Surfaces d'attaque
- Hypothèses de sécurité
- Mécanismes de détection et de mitigation
- Risques résiduels et exigences de gouvernance

Cette annexe est rédigée pour les parties prenantes institutionnelles (RSSI, Risque, Audit, Conformité).

---

## 2. Actifs du Système à Protéger

VeriSeal est conçu pour protéger l'**intégrité et la vérifiabilité** des artefacts de preuve et des enregistrements de preuve.

Actifs principaux :

1. **Intégrité de l'Artefact**
   L'artefact scellé doit rester vérifiable et indiquer toute altération au fil du temps.

2. **Intégrité de l'Objet de Preuve**
   Les enregistrements de preuve (JSON canonique) ne doivent pas être modifiables sans détection.

3. **Continuité du Registre**
   La chaîne en en ajout seul doit rester structurellement immuable et chronologiquement cohérente.

4. **Indépendance de la Vérification**
   Les tiers doivent pouvoir vérifier les preuves sans avoir à faire confiance à l'opérateur.

5. **Intégrité des Horodatages (ancrage externe optionnel)**
   Lorsqu'un ancrage externe existe, l'ancre doit renforcer la certitude temporelle.

6. **Intégrité des Clés (clés de signature)**
   Les clés privées utilisées pour la signature doivent rester confidentielles et régies.

---

## 3. Acteurs de Menace

### 3.1 Adversaire Externe
Capacités :
- Tentatives d'interception au niveau du réseau
- Sondage des points d'accès publics
- Tentatives de substitution d'artefacts
- Tentatives de relecture pour capturer des flux (le cas échéant)

Contraintes :
- Pas d'accès direct aux clés de signature ou au stockage interne (supposé)

### 3.2 Menace Interne (Opérateur ou Administrateur Privilégié)
Capacités :
- Accès potentiel à l'infrastructure
- Tentatives de modification des enregistrements
- Tentatives de suppression ou de dissimulation sélective de preuves
- Tentatives de manipulation des sorties PDF ou de présentation

### 3.3 Soumissionnaire de Preuves Malveillant
Capacités :
- Soumettre du contenu faux ou trompeur
- Soumettre des artefacts manipulés
- Tenter d'exploiter l'ambiguïté des flux de travail
- Tenter de se rétracter après le scellement ("Je n'ai jamais envoyé cela")

### 3.4 Appareil Client Compromis
Capacités :
- Malware modifie l'artefact avant le scellement
- Compromission des identifiants
- Intercepte ou altère les données locales avant le téléchargement

### 3.5 Adversaire de la Chaîne d'Approvisionnement / Dépendance
Capacités :
- Compromission de dépendance
- Compromission de la chaîne de construction
- Tentatives d'injection à l'exécution

---

## 4. Limites de Confiance

VeriSeal impose des limites de confiance explicites :

À l'intérieur de la limite de confiance de VeriSeal :
- Calcul de hachage
- Génération d'objet de preuve canonique
- Opération d'ajout au registre
- Génération de signature (domaine de clé contrôlé)
- Soumission d'ancre optionnelle

En dehors de la limite de confiance :
- Outils de création d'artefacts
- Sécurité des appareils utilisateurs
- Vérité sémantique du contenu
- Interprétation légale
- Intention et contexte humains

Principe clé : **VeriSeal sécurise la structure, pas le sens.**

---

## 5. Aperçu de la Surface d'Attaque

Surfaces d'attaque principales :

1. **Ingestion d'artefact d'entrée** (téléchargement / génération de charge utile)
2. **Pipeline de génération de preuve** (hachage + canonisation + signature)
3. **Stockage du registre** (intégrité de la chaîne en en ajout seul)
4. **Points de vérification** (JSON public, rendu PDF, page de vérification HTML)
5. **Gestion des clés** (confidentialité des clés privées et politique d'utilisation)
6. **Chaîne de construction/CI et de dépendance** (intégrité de la chaîne d'approvisionnement)

---

## 6. Scénarios de Menace et Mitigations

### 6.1 Altération de l'Artefact après Scellement
Attaque : Artefact modifié après scellement.

Détection :
- Le digest SHA-256 recalculé diffère.

Mitigation :
- Hachage déterministe
- La validation de la preuve nécessite une recalcul

Risque résiduel :
- Aucun pour la détection (l'intégrité détecte toujours le changement)
- Les différends sémantiques restent possibles

---

### 6.2 Altération de l'Objet de Preuve (JSON)
Attaque : Modifier les champs JSON de preuve (horodatages, identifiants, indicateurs).

Détection :
- La vérification de la signature échoue
- Discordance de hachage dans la recalcul canonique

Mitigation :
- JSON canonique comme source de vérité
- Signature sur la charge utile canonique

Risque résiduel :
- Si la clé de signature est compromise (voir scénario de compromission de clé)

---

### 6.3 Mutation / Suppression du Registre
Attaque : Supprimer une entrée ou réécrire la chaîne historique.

Détection :
- Discontinuité de la chaîne (discordance de previous_entry_hash)
- Discordance de recalcul de entry_hash

Mitigation :
- Architecture en en ajout seul
- Dépendance de hachage de chaîne
- Ancrage externe régulier recommandé pour une haute assurance

Risque résiduel :
- Les attaques au niveau du stockage peuvent supprimer l'ensemble du registre si la gouvernance est faible
  (risque de disponibilité ; la détection de l'intégrité reste, mais les preuves peuvent manquer)

---

### 6.4 Suppression Sélective de Preuves ("Cacher des Preuves")
Attaque : L'opérateur cache ou refuse de servir un point de preuve.

Détection :
- La référence publique existe mais le point de terminaison ne répond pas
- Des copies externes de JSON prouvent l'existence antérieure

Mitigation :
- Encourager l'archivage institutionnel des ensembles de preuves
- L'ancrage externe renforce les revendications d'existence
- Politiques de gouvernance pour la disponibilité

Risque résiduel :
- La disponibilité reste régie opérationnellement

---

### 6.5 Manipulation de la Couche de Présentation (PDF/HTML)
Attaque : Modifier le rendu PDF ou la vue HTML pour afficher un statut faux.

Détection :
- JSON canonique reste la source de vérité
- Le vérificateur recalcule les hachages et valide la signature

Mitigation :
- Règle de rendu uniquement
- La logique de vérification ne dépend jamais de la sortie de présentation

Risque résiduel :
- Le risque d'ingénierie sociale demeure (utilisateurs faisant confiance aux visuels sans vérifier)

---

### 6.6 Attaques par Relecture (Preuves Basées sur la Capture)
Attaque : Rejouer une capture vidéo/audio antérieure pour simuler la vivacité.

Détection/Mitigation (lorsque des flux de capture existent) :
- Liaison défi-réponse (incitations dynamiques)
- Hachage du journal d'événements d'exécution
- Liaison des médias à la charge utile d'exécution

Risque résiduel :
- Dépend de la qualité du flux de capture
- Non applicable aux cas d'utilisation de scellement d'artefacts statiques

---

### 6.7 Attaque de l'Homme du Milieu / Couche de Transport
Attaque : Intercepter ou altérer le trafic lors du téléchargement ou de la vérification.

Mitigation :
- TLS appliqué (HTTPS)
- La recalcul de hachage et la validation de signature empêchent toute altération silencieuse

Risque résiduel :
- Le vol d'identifiants est en dehors du modèle cryptographique
- Les attaques de rétrogradation réseau sont atténuées via HTTPS strict et HSTS (recommandé)

---

### 6.8 Compromission de Clé Privée
Attaque : Clé de signature volée.

Impact :
- L'attaquant peut émettre des preuves falsifiées qui semblent valides
- Les preuves historiques restent vérifiables mais la confiance dans le signataire est impactée

Mitigation :
- Signature soutenue par HSM / KMS
- Politique de rotation des clés
- Journaux d'audit pour les opérations de signature
- Séparation des tâches (contrôle double)

Risque résiduel :
- Scénario à impact le plus élevé ; la gouvernance est obligatoire

---

### 6.9 Affaiblissement de la Fonction de Hachage (Percée Cryptographique)
Attaque : Collision pratique ou seconde préimage contre SHA-256.

Impact :
- Les hypothèses d'intégrité se dégradent

Mitigation :
- Agilité algorithmique (champ hash_version)
- Capacité à réancrer les preuves en utilisant des primitives plus fortes
- Support pour des stratégies de double hachage dans les futures versions

Risque résiduel :
- Le risque d'évolution cryptographique à long terme existe pour tous les systèmes

---

### 6.10 Compromission de la Chaîne d'Approvisionnement
Attaque : Les dépendances de construction injectent une logique malveillante.

Mitigation :
- Épingler les dépendances
- Constructions reproductibles
- Signature de code
- Génération de SBOM
- Contrôles d'intégrité CI

Risque résiduel :
- Nécessite une gouvernance logicielle disciplinée

---

## 7. Hypothèses de Sécurité

Hypothèses de sécurité de VeriSeal :

- SHA-256 reste sécurisé (pas de collisions réalisables)
- Le schéma de signature reste sécurisé (pas de falsification réalisable sans clé privée)
- La sérialisation canonique est déterministe et contrôlée
- L'application en en ajout seul est protégée opérationnellement
- Les clés privées sont protégées par la gestion institutionnelle des clés

---

## 8. Garanties de Sécurité (Ce que VeriSeal Garantit Réellement)

VeriSeal garantit :

- Détection de toute modification d'artefact après scellement
- Reproductibilité de la vérification déterministe
- Intégrité structurelle et continuité de la chaîne (si le registre est disponible)
- Preuve d'altération de l'objet de preuve via signature
- Renforcement optionnel de l'ancrage temporel externe

VeriSeal ne garantit pas :

- Vérité du contenu
- Légitimité de l'identité par défaut
- Protection contre les appareils clients compromis
- Disponibilité des points de preuve sans gouvernance

---

## 9. Risque Résiduel et Exigences de Gouvernance

VeriSeal est le plus fort lorsque la gouvernance impose :

- Politique de gestion des clés (HSM/KMS, rotation, audit)
- Politique de disponibilité (ensembles d'archivage, redondance)
- Ségrégation des rôles (scellement vs vérification vs administration)
- Procédures de réponse aux incidents
- Politique d'ancrage externe pour les cas d'utilisation à haute assurance

Sans gouvernance, l'intégrité reste détectable, mais la résilience opérationnelle peut se dégrader.

---

## 10. Résumé de la Posture de Sécurité Institutionnelle

VeriSeal est conçu comme :

- Un protocole d'intégrité déterministe
- Une couche de preuve compatible avec l'audit
- Un système minimisant la dépendance à la confiance
- Un modèle de registre + objet de preuve à preuve d'altération

Il fournit des garanties d'intégrité vérifiables dans des conditions adverses, à condition que les contrôles de gouvernance et opérationnels clés soient appliqués.

---

## 11. Matrice de Classification des Risques

Cette section formalise la gravité des menaces selon l'impact et la probabilité.

Modèle de classification des risques :

- Probabilité : Faible / Moyenne / Élevée
- Impact : Modéré / Significatif / Critique
- Risque Résiduel : Après les contrôles de mitigation
- Propriétaire du Risque : Domaine de responsabilité de la gouvernance

| Scénario de Menace | Probabilité | Impact | Force de Mitigation | Risque Résiduel | Propriétaire du Risque |
|--------------------|-------------|--------|---------------------|-----------------|------------------------|
| Altération d'artefact après scellement | Moyenne | Significatif | Détection cryptographique | Faible | Couche de vérification |
| Altération du JSON de preuve | Faible | Significatif | Signature + canonisation | Faible | Couche cryptographique |
| Mutation du registre | Faible | Critique | Chaînage de hachage + détection | Faible | Gouvernance de l'infrastructure |
| Suppression de preuves | Moyenne | Significatif | Archivage + ancrage | Moyenne | Gouvernance opérationnelle |
| Manipulation de présentation | Moyenne | Modéré | Source de vérité JSON | Faible | Discipline de vérification |
| Compromission de clé privée | Faible | Critique | HSM/KMS + rotation | Moyenne | Gouvernance des clés |
| Affaiblissement de l'algorithme de hachage | Très Faible | Critique | Agilité algorithmique | Faible | Gouvernance cryptographique |
| Compromission de la chaîne d'approvisionnement | Moyenne | Significatif | Contrôles CI + SBOM | Moyenne | Gouvernance DevSecOps |

Résumé de la posture de risque :

- Les risques d'intégrité structurelle sont fortement atténués.
- La compromission de clé reste le scénario à impact le plus élevé.
- La maturité de la gouvernance influence directement le risque résiduel.

---

## 12. Modèle de Gouvernance & Ségrégation des Rôles

La sécurité de VeriSeal suppose une séparation institutionnelle des tâches.

### 12.1 Rôles Fonctionnels

**Opérateur de Scellement**
- Initie la génération de preuve.
- Ne peut pas modifier les entrées historiques du registre.

**Autorité de Vérification**
- Effectue une validation indépendante.
- N'a pas accès aux clés de signature.

**Gardien des Clés**
- Gère les clés de signature.
- Opère sous une politique de contrôle double.

**Administrateur de l'Infrastructure**
- Gère la disponibilité du système.
- Ne peut pas altérer les données de preuve signées.

**Fonction d'Audit**
- Examine les journaux et la continuité de la chaîne.
- Indépendant des opérations.

---

### 12.2 Aperçu RACI

| Fonction | Sceller | Vérifier | Signer | Maintenir | Auditer |
|----------|---------|----------|--------|-----------|---------|
| Opérateur de Scellement | R | C | - | - | - |
| Autorité de Vérification | - | R | - | - | C |
| Gardien des Clés | - | - | R | - | C |
| Administrateur de l'Infrastructure | - | - | - | R | C |
| Audit | - | C | C | C | R |

R = Responsable
C = Contrôle / Supervision

---

### 12.3 Principe de Gouvernance

L'intégrité est appliquée par la cryptographie.
La confiance est appliquée par la séparation de la gouvernance.

Les garanties cryptographiques réduisent la dépendance à la confiance humaine,
mais la gouvernance institutionnelle assure la résilience.

---

## 13. Procédure de Réponse aux Incidents & Compromission de Clé

Cette section définit la posture minimale de réponse institutionnelle.

### 13.1 Scénario de Compromission de Clé

Si la compromission de la clé de signature est suspectée :

1. Révocation immédiate de la clé.
2. Arrêt de l'émission de nouvelles preuves.
3. Génération d'une nouvelle paire de clés de signature.
4. Publication d'un avis public d'incident.
5. Réancrage de l'état du système (le cas échéant).
6. Réalisation d'un audit judiciaire.

Les preuves historiques restent structurellement vérifiables.
Le domaine de confiance se déplace vers la chronologie de validité de la clé.

---

### 13.2 Incident d'Intégrité de Preuve

Si une corruption du registre est détectée :

- Recompute la continuité de la chaîne.
- Identifier le point de divergence.
- Restaurer à partir d'une sauvegarde validée.
- Publier une déclaration d'intégrité.

---

### 13.3 Principe de Transparence Publique

Pour les déploiements institutionnels :

- Politique de divulgation d'incident requise.
- Journaux d'incidents horodatés recommandés.
- Audit indépendant conseillé pour les domaines à haute assurance.

---

### 13.4 Évolution Cryptographique à Long Terme

Si les primitives de hachage ou de signature s'affaiblissent :

- Introduire un champ de hachage versionné.
- Réancrer les preuves existantes.
- Supporter une stratégie de double hachage pendant la migration.

L'agilité algorithmique doit être intégrée dans la feuille de route de gouvernance.
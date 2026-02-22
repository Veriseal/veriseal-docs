---
id: verification-procedure
title: Procédure de Vérification
---

﻿---
title: Procédure de Vérification Indépendante
sidebar_label: Procédure de Vérification
---

# Procédure de Vérification Indépendante

La vérification d'une preuve nécessite :

1. La charge utile JSON canonique
2. L'artéfact (le cas échéant)
3. Le point de terminaison de vérification

Étapes de vérification :

1. Recalculer le SHA-256 de l'artéfact
2. Comparer le digest avec le JSON canonique
3. Vérifier la signature
4. Confirmer la continuité du registre (previous_entry_hash)
5. Si ancré, vérifier l'horodatage externe

La vérification est reproductible et déterministe.
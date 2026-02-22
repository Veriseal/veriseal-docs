---
id: verification-procedure
title: Procedimiento de Verificación
---

﻿---
title: Procedimiento de Verificación Independiente
sidebar_label: Procedimiento de Verificación
---

# Procedimiento de Verificación Independiente

La verificación de una prueba requiere:

1. La carga útil JSON canónica
2. El artefacto (si aplica)
3. El punto final de verificación

Pasos de verificación:

1. Recalcular SHA-256 del artefacto
2. Comparar el resumen con el JSON canónico
3. Verificar la firma
4. Confirmar la continuidad del libro mayor (previous_entry_hash)
5. Si está anclado, verificar la marca de tiempo externa

La verificación es reproducible y determinista.
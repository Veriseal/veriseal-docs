---
id: verification
title: Verificación
---

﻿---
title: Verificación
sidebar_position: 3
---

# Verificación

La verificación es determinista y no depende de confiar en VeriSeal.

## Orden de la fuente de verdad

1) Entrada en el libro mayor
2) JSON público
3) PDF (solo presentación)

## Procedimiento

1) Obtener JSON canónico:
   - /public/verify/`{merkle_root}`/json

2) Verificar hashes:
   - calcular SHA-256 para artefactos (o paquete ZIP),
   - comparar con los hashes en JSON.

3) Recomponer la raíz de Merkle:
   - a partir de las hojas y reglas declaradas,
   - confirmar que coincide con merkle_root.

4) Verificar encadenamiento del libro mayor (cuando esté disponible):
   - validar la consistencia de entry_hash y prev_hash.

5) Verificar firmas (si están presentes):
   - verificación de firma PDF,
   - verificación opcional de firma JSON.

6) Verificar OpenTimestamps (si están presentes):
   - confirmar que el resumen estampado es igual a la raíz de Merkle/hash del paquete,
   - actualizar/verificar y registrar el estado.

## Qué retener (contextos regulados)

- JSON público obtenido,
- artefactos (o paquete ZIP),
- hashes calculados,
- resultados de verificación de firmas,
- archivo .ots y resultado de verificación (si se utiliza).
---
id: cryptography
title: Criptografía
slug: /technical/cryptography
sidebar_position: 1
---

# Criptografía

VeriSeal utiliza primitivas conservadoras y ampliamente desplegadas para hacer que la evidencia sea verificable de manera independiente.

## Hashing (SHA-256)

Las huellas digitales SHA-256:
- archivos (video, imagen, PDFs),
- cargas útiles JSON canónicas,
- manifiestos de paquetes,
- entradas de libro mayor.

Los hashes se representan como hexadecimales en minúsculas.

## Canonicalización

Para datos estructurados (JSON/mensajes), VeriSeal aplica una canonicalización determinista para que las partes independientes puedan reproducir el mismo resumen.

## Compromisos de Merkle

Cuando se deben comprometer múltiples componentes (hash de medios, hash de registro UX, hash de metadatos), VeriSeal construye un árbol de Merkle:
- las hojas son resúmenes de componentes,
- los nodos internos son SHA-256(left || right),
- la raíz de Merkle es el identificador de prueba pública.

## Encadenamiento de libro mayor solo de anexión

Cada entrada incluye entry_hash, prev_hash y created_at_utc (UTC). Cualquier modificación rompe la cadena.

## Firmas (opcional)

- La evidencia en PDF puede ser firmada (RSA-3072).
- Las exportaciones JSON pueden ser firmadas para verificación sin conexión.

El PDF es solo de renderizado; la verificación siempre debe validarse contra el JSON público.

## OpenTimestamps (opcional)

OpenTimestamps ancla un resumen externamente y puede convertirse en VERIFICADO en la blockchain de Bitcoin.

## Modelo de amenazas (resumen)

Mitiga: modificación post-hoc, sustitución de evidencia, marcas de tiempo discutibles, conflicto de intereses de la plataforma.  
Fuera del alcance: dispositivo de captura comprometido, malware antes de la captura, coerción/suplantación sin flujos de identidad.
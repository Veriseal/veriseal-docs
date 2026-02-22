---
id: timestamping
title: Sellado de Tiempo
---

﻿---
title: Sellado de Tiempo
sidebar_position: 2
---

# Sellado de Tiempo

VeriSeal soporta:
1) sellos de tiempo internos UTC (orden operativo),
2) anclaje externo opcional (OpenTimestamps) para independencia.

## Sellos de tiempo internos

Registrados en UTC para entradas del libro mayor y pasos vinculantes. Útiles para rastros de auditoría, pero no son una garantía externa.

## Anclaje OpenTimestamps

Flujo de trabajo:
1) seleccionar un resumen estable (raíz de Merkle o hash de paquete),
2) ots stamp -> crea un archivo .ots,
3) ots upgrade -> recoge atestaciones,
4) ots verify -> confirma cuando está completo (VERIFICADO).

Lenguaje de estado:
- PENDIENTE: aceptado por calendarios, aún no en la cadena,
- VERIFICADO: anclado en Bitcoin (garantía más fuerte).

Mejor práctica: sellar un resumen estable por prueba.
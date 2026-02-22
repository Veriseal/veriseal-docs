---
title: Modelo de Libro Mayor y Prueba
sidebar_label: 2.2 Modelo de Libro Mayor y Prueba
slug: /whitepaper/part2/ledger-and-proof-model
sidebar_position: 2.2
---

# 2.2 Modelo de Libro Mayor y Prueba

El libro mayor es la columna vertebral estructural de VeriSeal.

No es una blockchain.
Es un diario de integridad determinista de solo anexado.

---

## Estructura de Entrada de Prueba

Cada entrada de prueba contiene:

- proof_identifier (hash o merkle_root)
- referencia de metadatos
- marca de tiempo (UTC)
- hash de la entrada anterior

Esto crea continuidad en la cadena.

---

## Principio de Inmutabilidad

El libro mayor es:

- Solo anexado  
- Vinculado por hash  
- Determinista  

Cualquier alteración histórica invalida la continuidad hacia adelante.

---

## Estabilidad del Identificador Público

El identificador de prueba:

`{merkle_root}`

Funciona como:

- Referencia pública permanente
- Ancla de integridad entre sistemas
- Identificador estable para auditorías

Debe permanecer estable a lo largo del tiempo.

---

## Ventaja Institucional

A diferencia de los sistemas basados en blockchain:

- Sin consenso probabilístico
- Sin inestabilidad de bifurcación
- Sin dependencia de mineros externos

La integridad es matemática.
No política.
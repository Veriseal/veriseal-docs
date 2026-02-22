---
title: Modelo de Verificación
sidebar_label: 2.3 Modelo de Verificación
slug: /whitepaper/part2/verification-model
sidebar_position: 2.3
---

# 2.3 Modelo de Verificación

Una infraestructura de confianza no puede depender de la afirmación del operador.

La verificación debe ser ejecutable de manera independiente.

---

## Pasos de Verificación

1. Recalcular la carga útil canónica  
2. Recalcular el resumen SHA-256  
3. Validar la inclusión de Merkle (si aplica)  
4. Validar el encadenamiento del libro mayor  
5. Validar el anclaje opcional de OTS  
6. Validar la firma PDF opcional  

No se requiere lógica de servidor propietaria.

---

## Principio de JSON Público

El JSON público es la fuente de verdad.

El PDF es solo para visualización.

La verificación debe seguir siendo posible incluso si:

- El operador cesa su actividad
- La entidad comercial cambia
- La infraestructura se migra

---

## Transparencia Sin Fuga de Datos

La verificación pública expone:

- Compromisos  
- Hashes  
- Hechos de integridad  

No expone:

- Contenido privado  
- Cargas útiles confidenciales  
- Metadatos sensibles  

Esta separación es estructural.

---

## Confianza Institucional

La reproducibilidad independiente permite:

- Revisión regulatoria  
- Auditoría forense  
- Verificación transfronteriza  
- Validación de archivo a largo plazo  

VeriSeal minimiza la confianza.
Maximiza la reproducibilidad.
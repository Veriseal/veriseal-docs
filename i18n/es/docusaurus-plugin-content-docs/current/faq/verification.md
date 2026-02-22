Translate the following Markdown document to Spanish.
File: verification.md

---
id: verification
title: Verificación
---

﻿---
title: Preguntas Frecuentes sobre Verificación y Auditoría
sidebar_label: Verificación y Auditoría
---

# Preguntas Frecuentes sobre Verificación y Auditoría

Esta sección explica cómo funciona la verificación de integridad dentro del marco de VeriSeal.

La verificación es determinista.

No depende de la confianza.

---

## 1. ¿Qué significa verificación en VeriSeal?

Verificación significa:

Recalcular el hash de un objeto de prueba canónico
y confirmar que coincide con el valor de integridad registrado.

Si los valores coinciden:

El registro no ha sido alterado desde su sellado.

---

## 2. ¿La verificación requiere infraestructura propietaria?

No.

La verificación solo requiere:

- El objeto de prueba canónico
- El algoritmo de hash (SHA-256)
- Las reglas del protocolo documentadas

No se requiere una red propietaria ni permiso del proveedor.

---

## 3. ¿Puede realizarse la verificación de manera independiente?

Sí.

Partes independientes pueden:

- Reconstruir el objeto canónico
- Recalcular el hash SHA-256
- Validar la consistencia de la integridad
- Validar la continuidad de la cadena opcional
- Validar la vinculación de firmas opcional

La verificación es neutral respecto al proveedor.

---

## 4. ¿Pueden los reguladores verificar las pruebas por sí mismos?

Sí.

Los reguladores no requieren:

- Membresía en la red
- Acceso a tokens
- Aprobación del proveedor
- Acceso a bases de datos centralizadas

La verificación puede realizarse utilizando las reglas documentadas.

---

## 5. ¿Qué sucede si la verificación falla?

Si el hash recalculado difiere:

- El registro ha cambiado
- La estructura canónica ha sido alterada
- La integridad está comprometida

La falla en la verificación indica inconsistencia estructural.

No determina automáticamente la intención.

---

## 6. ¿Puede la verificación detectar manipulación parcial de datos?

Sí.

Cualquier cambio en:

- Contenido
- Metadatos incluidos en el objeto canónico
- Campo de marca de tiempo
- Ordenamiento estructural

Producirá un hash diferente.

Incluso los cambios mínimos son detectables.

---

## 7. ¿La verificación confirma autenticidad?

No.

La verificación confirma integridad.

La autenticidad (vinculación de identidad) requiere:

- Firma digital
- Mecanismos de aseguramiento de identidad
- Esquemas de firma calificada (donde sea aplicable)

La integridad y la autenticidad son propiedades distintas.

---

## 8. ¿Puede la verificación confirmar la cronología?

La cronología puede reforzarse cuando:

- Se incluyen campos de marca de tiempo
- Se habilita el encadenamiento de eventos
- Se utiliza anclaje externo

La verificación puede confirmar la consistencia estructural de las afirmaciones cronológicas.

No crea autoridad de tiempo estatutaria.

---

## 9. ¿La verificación depende de mecanismos de consenso?

No.

La verificación es local y determinista.

No requiere:

- Acuerdo de validadores
- Sincronización de red
- Consenso de tokens

La integridad es matemática, no social.

---

## 10. ¿Puede la verificación ser automatizada?

Sí.

La verificación puede ser:

- Escrita en scripts
- Integrada en flujos de auditoría
- Incorporada en flujos de trabajo de cumplimiento
- Utilizada en sistemas de reconciliación automatizados

Soporta validación basada en máquinas.

---

## 11. ¿Es la verificación escalable?

Sí.

El hashing SHA-256 es computacionalmente eficiente.

La verificación puede escalar a través de:

- Sistemas de transacciones de alto volumen
- Registros empresariales
- Implementaciones a nivel sectorial

La escalabilidad depende del diseño de integración.

---

## 12. ¿Puede la verificación operar en entornos aislados?

Sí.

La verificación requiere:

- Objeto canónico
- Algoritmo de hash
- Reglas documentadas

No se requiere conectividad a internet.

---

## 13. ¿Qué sucede si el libro mayor está corrupto?

La verificación de pruebas individuales sigue siendo posible.

La corrupción del libro mayor afecta:

- Validación de continuidad de la cadena
- Reconstrucción de la secuencia de eventos

No invalida la recomputación de hashes de pruebas individuales.

---

## 14. ¿Pueden múltiples partes verificar la misma prueba?

Sí.

Cualquier parte con acceso a:

- El objeto canónico
- El hash de la prueba

Puede verificar la integridad de manera independiente.

La verificación es reproducible en diferentes entornos.

---

## 15. ¿La verificación prueba que el contenido es verdadero?

No.

La verificación prueba:

Que el contenido no ha cambiado desde su sellado.

No prueba:

- Corrección factual
- Validez legal
- Autenticidad de identidad (a menos que esté firmado)

La integridad no es validación de la verdad.

---

## 16. ¿Puede la verificación apoyar el análisis judicial experto?

Sí.

Porque la verificación es:

- Determinista
- Reproducible
- Basada en hash
- Neutral respecto a la tecnología

Los expertos pueden independientemente:

- Recalcular hashes
- Validar estructura
- Confirmar consistencia de la cadena (si se usa)

La interpretación judicial sigue siendo dependiente de la jurisdicción.

---

## 17. ¿Puede la verificación integrarse en procesos de auditoría?

Sí.

La verificación puede apoyar:

- Revisión de auditoría interna
- Validación de cumplimiento
- Inspecciones regulatorias
- Investigaciones forenses

Fortalece la defensibilidad estructural de la auditoría.

---

## 18. ¿Qué riesgo reduce la verificación?

La verificación reduce:

- Riesgo de manipulación no detectada
- Riesgo de manipulación de registros
- Riesgo de disputas cronológicas
- Exposición a alteraciones internas
- Fragilidad probatoria post-incidente

Fortalece la defensibilidad institucional.

---

## 19. ¿La verificación requiere acceso a largo plazo al proveedor?

No.

La verificación se basa en:

- Algoritmo de hashing documentado públicamente
- Reglas de canonicalización documentadas
- Recomputación matemática

La continuidad del proveedor no es necesaria para la validación.

---

## 20. ¿Qué es la verificación en una frase?

La verificación confirma que un registro digital permanece
exactamente en el mismo estado estructural
que cuando fue sellado.

Nada más.

Nada menos.
---
title: VIP-THREAT-001 - Modelo de Amenazas y Adversarios de VeriSeal
sidebar_label: VIP-THREAT-001
---

# VIP-THREAT-001  
## Modelo de Amenazas y Adversarios de VeriSeal

Versión: 2.0  
Estado: Perfil de Seguridad Normativo  
Clasificación: Especificación de Seguridad Pública  

---

# 1. Alcance

Este documento define el modelo formal de amenazas y adversarios aplicable a:

- VIP-STD-001 (Núcleo de Integridad)
- VIP-STD-002 (Perfil de Libro Mayor)
- VIP-STD-003 (Perfil de Firma)
- VIP-STD-004 (Perfil de Anclaje Temporal)
- VIP-STF-005 (Marco de Verificación y Conformidad)

Este documento define:

- Objetivos de seguridad
- Clasificación de activos
- Capacidades del adversario
- Superficies de ataque
- Declaraciones formales de seguridad
- Riesgos residuales

---

# 2. Objetivos de Seguridad

El Marco de Integridad VeriSeal tiene como objetivo garantizar:

1. Integridad determinista
2. Detección de manipulación
3. Inmutabilidad estructural
4. Autenticidad criptográfica (si se utiliza el perfil de firma)
5. Continuidad del libro mayor
6. Corroboración temporal independiente (si se utiliza el perfil de anclaje)

El marco explícitamente NO garantiza:

- Veracidad del contenido
- Validación de identidad (a menos que se utilice un sistema externo)
- Ejecución legal
- Corrección semántica
- Legitimidad del contenido

VeriSeal es un marco de integridad, no un sistema de verdad.

---

# 3. Activos

Los siguientes activos son críticos para la seguridad:

- Objeto de prueba canónico
- proof_hash determinista
- Entrada del libro mayor
- Continuidad de previous_entry_hash
- Material de firma
- Referencia de anclaje
- Metadatos de verificación

La integridad de estos activos DEBE ser preservada.

---

# 4. Clases de Adversarios

## 4.1 Observador Pasivo

Capacidades:
- Acceso de lectura completo
- Observación de tráfico

No puede:
- Modificar datos almacenados

---

## 4.2 Modificador Activo

Capacidades:
- Intentar modificación de registros
- Intentar sustitución de registros
- Intentar reordenamiento del libro mayor

---

## 4.3 Atacante Criptográfico

Capacidades:
- Intentar colisión de hash
- Intentar falsificación de firma
- Intentar falsificación de anclaje
- Intentar repetición

Limitado por suposiciones criptográficas clásicas.

---

## 4.4 Adversario Interno

Capacidades:
- Modificar registros antes del sellado
- Comprometer claves privadas
- Manipular la capa de almacenamiento

La mitigación es operativa, no a nivel de protocolo.

---

# 5. Categorías de Amenazas

## 5.1 Ataques de Serialización

Ataque:
Manipulación del orden de los campos o codificación para cambiar el hash.

Mitigación:
- Canonicalización estricta (VIP-STD-001)
- Determinismo a nivel de byte
- Hashing determinista

---

## 5.2 Sustitución de Hash

Ataque:
Reemplazo de proof_hash con un valor alternativo.

Mitigación:
- Recomputación determinista
- Vinculación de firma (VIP-STD-003)

---

## 5.3 Reordenamiento del Libro Mayor

Ataque:
Reordenamiento de entradas para manipular la cronología.

Mitigación:
- Encadenamiento de previous_entry_hash
- Verificación determinista del libro mayor

---

## 5.4 Ataques de Repetición

Ataque:
Reutilización de prueba válida en un contexto no intencionado.

Mitigación:
- proof_id único
- Vinculación de contexto
- Anclaje temporal (opcional)

---

## 5.5 Ataques de Firma

Incluye:
- Falsificación
- Maleabilidad
- Aleatoriedad débil

Mitigación:
- Firma determinista (RFC 6979)
- Normalización Low-S (ECDSA)
- Ed25519 preferido
- Gestión segura de claves (requisito de implementación)

---

## 5.6 Falsificación de Anclaje

Ataque:
Provisión de referencias temporales externas fabricadas.

Mitigación:
- Sistemas de anclaje verificables públicamente
- Recomputación independiente
- Estrategias de anclaje múltiple (opcional)

---

# 6. Límites de Confianza

Existen límites de confianza entre:

1. Generación de prueba
2. Almacenamiento del libro mayor
3. Autoridad de firma
4. Autoridad de anclaje
5. Actor de verificación

El protocolo asume:

- Verificador independiente
- Transparencia de anclaje público
- Custodia segura de claves

---

# 7. Declaraciones Formales de Seguridad

Bajo suposiciones criptográficas clásicas:

Si:
- SHA-256 permanece resistente a colisiones
- ECDSA / Ed25519 permanecen seguros
- La factorización RSA sigue siendo computacionalmente inviable

Entonces:

- La manipulación es detectable
- La reescritura del libro mayor es detectable
- La falsificación de firmas es inviable
- La falsificación de anclajes es detectable

Estas garantías se degradan proporcionalmente si las suposiciones fallan.

---

# 8. Riesgos Residuales

El marco no elimina:

- Compromiso de claves privadas
- Entropía débil en la generación de firmas
- Errores de implementación
- Corrupción de almacenamiento
- Manipulación interna antes del sellado
- Ataques de denegación de servicio

Estos están fuera de las garantías del protocolo.

---

# 9. Denegación de Servicio

El protocolo no proporciona:

- Protección contra agotamiento de almacenamiento
- Garantías de disponibilidad de puntos de anclaje
- Resistencia a inundaciones de red

Se requiere mitigación operativa.

---

# 10. Consideraciones Post-Cuánticas

La versión 2.0 no proporciona seguridad post-cuántica.

Las revisiones futuras PUEDEN incluir:

- Agilidad de hash
- Algoritmos de firma PQ
- Modos de firma híbridos

---

# 11. Conclusión

El marco VeriSeal proporciona detección determinista de manipulación bajo suposiciones criptográficas clásicas.

Las garantías de seguridad dependen de:

- Canonicalización estricta
- Hashing determinista
- Encadenamiento correcto del libro mayor
- Gestión segura de claves
- Anclaje verificable públicamente

La disciplina de implementación es obligatoria.

VeriSeal define garantías de integridad — no garantías de confianza.
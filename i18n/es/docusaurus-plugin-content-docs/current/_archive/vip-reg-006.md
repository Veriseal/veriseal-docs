Archivo: vip-reg-006.md

---
title: VIP-REG-006 - Marco de Registro de Claves Públicas Institucionales
sidebar_label: VIP-REG-006
---

# VIP-REG-006 - Marco de Registro de Claves Públicas Institucionales

Versión: 1.0  
Estado: Borrador Público  
Clasificación: Marco de Infraestructura de Confianza Pública

---

## 1. Alcance

VIP-REG-006 define el marco para la publicación, descubrimiento y validación de claves de verificación públicas institucionales.

Complementa:

- VIP-STD-001 (Núcleo de Integridad)
- VIP-STD-002 (Capa de Firma)
- VIP-STF-005 (Marco de Firma de Documentos Institucionales)

Este marco establece un modelo de registro neutral que permite:

- Transparencia de claves públicas
- Verificación entre instituciones
- Acceso de reguladores
- Validación independiente

VIP-REG-006 no define la verificación de identidad.  
Define la estructura de descubrimiento y validación de claves públicas.

---

## 2. Objetivos

El marco de registro asegura:

- Verificabilidad pública de claves institucionales
- Descubrimiento de confianza determinista
- Transparencia del ciclo de vida de las claves
- Contención de compromisos
- Continuidad de verificación histórica

El registro previene la dependencia de acuerdos bilaterales de API.

La verificación debe permanecer neutral a la infraestructura.

---

## 3. Modelos de Registro

VIP-REG-006 admite múltiples arquitecturas de registro.

## 3.1 Registro Centralizado

Una autoridad central mantiene:

- Identificador institucional
- Clave de verificación pública
- Tipo de algoritmo
- Fecha de vigencia
- Fecha de expiración
- Estado de revocación

Adecuado para:

- Ecosistemas bancarios nacionales
- Entornos supervisados por reguladores
- Consorcios industriales

---

## 3.2 Registro Federado

Múltiples registros confiables interoperan mediante:

- Firmas cruzadas
- Anclaje de registros
- Reconocimiento mutuo

Adecuado para:

- Entornos transfronterizos
- Marcos interbancarios
- Sistemas de comercio internacional

---

## 3.3 Registro de Transparencia Distribuida

Las claves públicas se anclan mediante:

- Compromisos en blockchain pública
- Registros de transparencia de árboles de Merkle
- Registros públicos de solo anexado

Adecuado para:

- Ecosistemas abiertos
- Neutralidad transjurisdiccional
- Independencia de infraestructura

---

## 4. Requisitos de Registro Institucional

Para registrarse bajo VIP-REG-006, una institución DEBE proporcionar:

- Identificador de entidad legal
- Nombre institucional
- Jurisdicción
- Clave de verificación pública
- Algoritmo de firma
- Fecha de vigencia
- Referencia de contacto de gobernanza

Opcional:

- Referencia regulatoria
- Declaración de certificación
- Vinculación entre registros

---

## 5. Gestión del Ciclo de Vida de Claves

## 5.1 Activación de Claves

Tras la publicación:

- La clave se vuelve verificable públicamente
- DEBE registrarse la fecha de vigencia
- La entrada en el registro DEBE ser inmutable

---

## 5.2 Rotación de Claves

El registro DEBE admitir:

- Períodos de claves superpuestas
- Retención de claves heredadas
- Búsqueda histórica

Las firmas históricas DEBEN seguir siendo verificables.

---

## 5.3 Revocación de Claves

Si ocurre un compromiso:

- DEBE publicarse la marca de tiempo de revocación
- El estado DEBE ser visible públicamente
- La validez histórica antes de la revocación DEBE seguir siendo demostrable

La revocación no invalida firmas pasadas a menos que se declare legalmente.

---

## 6. Flujo de Verificación

La verificación independiente DEBE permitir:

1. Recuperación del identificador de la institución
2. Recuperación de la clave actual o histórica
3. Recomputación de hash (VIP-STD-001)
4. Validación de firma (VIP-STD-002)
5. Confirmación de validez de la clave en el momento de emisión

La verificación NO DEBE requerir acceso privilegiado al sistema.

---

## 7. Modelo de Confianza

VIP-REG-006 separa:

- Verificación criptográfica
- Responsabilidad institucional
- Supervisión regulatoria

El registro no:

- Garantiza la honestidad institucional
- Garantiza la veracidad de documentos
- Reemplaza la aplicación legal

Garantiza la transparencia estructural de las claves de verificación.

---

## 8. Consideraciones de Seguridad

Los riesgos incluyen:

- Compromiso del registro
- Inserción no autorizada de claves
- Suplantación de claves
- Fallo de gobernanza

La mitigación puede incluir:

- Gobernanza de registro multipartita
- Registros de transparencia
- Anclaje externo
- Mecanismos de auditoría pública

---

## 9. Implicaciones Transversales

Cuando se combina con VIP-STF-005:

- Los bancos pueden verificar otros bancos
- Los notarios pueden verificar instituciones
- Los reguladores pueden validar firmas independientemente
- La autenticidad de documentos transfronterizos se vuelve determinista

La interoperabilidad del registro reduce:

- Verificación manual
- Acuerdos de validación bilaterales
- Fraude por modificación
- Fricción de confianza entre instituciones

---

## 10. Impacto Estratégico

La adopción generalizada permite:

- Infraestructura neutral de verificación de documentos
- Reducción del fraude documental mediante falsificación
- Reducción de verificaciones manuales de autenticidad
- Ecosistema estandarizado de prueba institucional
- Interoperabilidad transversal

VIP-REG-006 transforma la publicación de claves públicas de una práctica ad-hoc a una infraestructura institucional estructurada.

---

## 11. Requisitos de Cumplimiento

Para reclamar cumplimiento con VIP-REG-006, un registro DEBE:

- Mantener transparencia de solo anexado
- Publicar eventos de revocación
- Preservar estados históricos de claves
- Permitir búsqueda pública independiente
- Documentar el modelo de gobernanza

El incumplimiento de estos invalida las reclamaciones de cumplimiento.

---

## 12. Conclusión

VIP-REG-006 define la capa de registro de claves públicas institucionales requerida para la interoperabilidad global de verificación de documentos.

Fortalece:

- Transparencia
- Determinismo
- Confianza entre instituciones
- Neutralidad estructural

No centraliza la confianza.

Hace la verificación reproducible.

Cuando se combina con VIP-STF-005, permite una red global de autenticidad de documentos institucionales.
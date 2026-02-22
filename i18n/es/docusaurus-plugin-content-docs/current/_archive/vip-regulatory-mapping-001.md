---
title: VIP-REG-001 - Mapeo Regulatorio de VeriSeal
sidebar_label: VIP-REG-001
---

# VIP-REG-001 - Mapeo Regulatorio de VeriSeal

Versión: 1.0  
Estado: Informativo  
Clasificación: Posicionamiento Regulatorio

---

## 1. Introducción

Este documento proporciona un mapeo regulatorio no vinculante del Marco de Integridad VeriSeal frente a instrumentos regulatorios europeos seleccionados.

Está destinado a:

- Discusiones regulatorias
- Presentaciones institucionales
- Análisis de arquitectura de cumplimiento
- Planificación de integración

Este documento NO constituye asesoramiento legal.

---

## 2. Alcance del Mapeo

El mapeo hace referencia a:

- Reglamento eIDAS (UE) No 910/2014
- Evolución del marco eIDAS 2.0
- ISO/IEC 27001
- ISO/IEC 27002
- Directiva NIS2
- Normas ETSI para firmas electrónicas y sellado de tiempo

Este mapeo se centra en la alineación técnica, no en el estado de certificación.

---

## 3. Mapeo eIDAS

## 3.1 Integridad de la Evidencia Electrónica

VIP-STD-001 asegura:

- Integridad determinista
- Detección de manipulación
- Inmutabilidad estructural

Esto se alinea con:

- Artículo 41 (Integridad de documentos electrónicos)
- Principios de preservación de evidencia electrónica

VeriSeal NO proporciona:

- Estado de firma electrónica cualificada
- Estado de proveedor de servicios de confianza cualificado

---

## 3.2 Firmas Electrónicas

VIP-STD-003 proporciona:

- Autenticidad criptográfica
- Verificación determinista

Sin embargo:

- La verificación de identidad está fuera del alcance
- La certificación de firma cualificada no está incluida
- La validación de la cadena de confianza de certificados no está definida en la versión actual

---

## 3.3 Sellado de Tiempo

VIP-STD-004 proporciona:

- Anclaje temporal externo
- Verificabilidad pública
- Vinculación determinista del hash de anclaje

Esto se alinea conceptualmente con:

- ETSI EN 319 421 (Política de Sellado de Tiempo y Requisitos de Seguridad)

No reclama el estado de autoridad de sellado de tiempo cualificada.

---

## 4. Alineación ISO/IEC 27001

El marco contribuye a:

- A.8 - Integridad de Activos
- A.12 - Registro y Monitoreo
- A.14 - Controles de Integridad del Sistema
- A.18 - Preservación de Evidencia de Cumplimiento

El marco en sí no es un SGSI.

Puede servir como un componente de control técnico dentro de un SGSI.

---

## 5. Alineación con la Directiva NIS2

VIP-STD-002 y VIP-STD-004 contribuyen a:

- Rastreabilidad de incidentes
- Preservación de evidencia
- Integridad determinista de eventos

Sin embargo, NIS2 requiere:

- Gobernanza organizacional
- Procedimientos de gestión de riesgos
- Marcos de reporte de incidentes

Estos son externos al protocolo.

---

## 6. Posicionamiento de Soberanía

El marco es:

- Neutral en infraestructura
- Neutral en proveedores
- Determinista criptográficamente
- Verificable abiertamente

No requiere:

- Dependencia de nube extranjera
- Servicios de validación propietarios
- Infraestructura de verificación cerrada

Esto apoya los objetivos de soberanía digital.

---

## 7. Límites de Cumplimiento

El Marco de Integridad VeriSeal:

- Proporciona garantías de integridad técnica
- NO proporciona certificación legal
- NO proporciona aseguramiento de identidad
- NO reemplaza a los proveedores de servicios de confianza

Puede complementar servicios de confianza regulados.

---

## 8. Implicaciones de Estrategia Regulatoria

El marco puede posicionarse como:

- Infraestructura de evidencia criptográfica
- Capa de integridad para sistemas regulados
- Infraestructura de soporte de auditoría
- Complementario a servicios de confianza cualificados

NO está posicionado como un reemplazo para:

- Proveedores de Firmas Electrónicas Cualificadas
- Autoridades de Sellado de Tiempo Cualificadas
- Infraestructuras PKI nacionales

---

## 9. Alineación Regulatoria Futura

Las extensiones futuras PUEDEN incluir:

- Perfil de sellado de tiempo cualificado
- Integración de billetera eIDAS 2.0
- Perfil de vinculación de identidad
- Alineación de conformidad ETSI
- Perfil de soporte de certificación

---

## 10. Conclusión

El Marco de Integridad VeriSeal se alinea técnicamente con los principios de integridad regulatoria europea.

Proporciona:

- Detección determinista de manipulación
- Integridad estructural criptográfica
- Corroboración temporal externa
- Integración modular de cumplimiento

La certificación regulatoria requiere capas adicionales organizacionales, legales y operativas.
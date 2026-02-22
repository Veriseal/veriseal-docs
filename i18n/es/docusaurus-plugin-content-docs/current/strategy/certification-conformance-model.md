---
title: Modelo de Certificación y Conformidad
sidebar_label: Modelo de Certificación y Conformidad
---

# VeriSeal - Modelo de Certificación y Conformidad

## Por qué la Certificación es Importante

Para la adopción institucional, la infraestructura criptográfica no solo debe ser funcional.

Debe ser:

- Verificable
- Reproducible
- Auditada
- Certificable

VeriSeal está diseñado para apoyar un marco estructurado de conformidad y certificación.

Esto asegura que las implementaciones:

- Sigan el protocolo de manera determinista
- No introduzcan desviaciones silenciosas
- Preserven la validez de la prueba a largo plazo

---

## Conformidad vs Certificación

### Conformidad

Conformidad significa:

Una implementación respeta la especificación del protocolo VeriSeal.

Esto incluye:

- Serialización JSON canónica
- Hashing determinista SHA-256
- Integridad del libro mayor de solo anexado
- Encadenamiento adecuado de `prev_hash`
- Integridad de la construcción de la raíz de Merkle
- Reglas de validación de firmas
- Formato de anclaje de marca de tiempo

La conformidad es técnica.

---

### Certificación

Certificación significa:

Una implementación ha sido evaluada formalmente según criterios definidos.

La certificación es institucional.

Puede incluir:

- Evaluación de seguridad
- Revisión de procesos
- Disciplina operativa
- Validación de gestión de claves
- Integridad del punto de verificación
- Controles de segregación de infraestructura

La certificación proporciona seguridad a terceros.

---

## Niveles de Conformidad

VeriSeal apoya la conformidad por niveles.

### Nivel 1 - Conforme al Protocolo

- Canonización correcta
- Hashing determinista
- Encadenamiento del libro mayor válido
- Punto de verificación funcional

Adecuado para implementaciones empresariales internas.

---

### Nivel 2 - Conforme a la Verificación Pública

Incluye el Nivel 1 más:

- Punto de verificación pública
- Reproducibilidad de la carga JSON
- Instrucciones de verificación independiente
- Pruebas de reproducibilidad de hash

Adecuado para entornos regulados.

---

### Nivel 3 - Grado Institucional

Incluye el Nivel 2 más:

- Anclaje de marca de tiempo externo
- Disciplina en la gestión operativa de claves
- Segregación de funciones
- Retención de la pista de auditoría
- Revisión formal de seguridad

Diseñado para:

- Instituciones financieras
- Registros legales
- Autoridades públicas
- Infraestructura transfronteriza

---

## Modelo de Pruebas de Verificación

Cada implementación certificada debe pasar:

### 1) Pruebas de Reproducción Determinista

Dado:

- Artefacto original
- JSON público
- Raíz de Merkle

El proceso de verificación debe producir hashes idénticos.

No se tolera desviación.

---

### 2) Pruebas de Integridad de la Cadena

El libro mayor debe demostrar:

- Enlace correcto de `prev_hash`
- Sin interrupciones en la secuencia
- Sin inserciones duplicadas

La disciplina de solo anexado debe ser demostrable.

---

### 3) Pruebas de Integridad de la Firma

- La firma debe coincidir con la clave pública publicada
- La firma debe validar sobre la carga canónica
- Sin envoltorios de firma opacos

---

### 4) Validación de Anclaje de Marca de Tiempo

Si el anclaje está habilitado:

- El hash de anclaje debe coincidir con el hash del libro mayor
- La prueba OTS debe validar
- La prueba de marca de tiempo debe ser reproducible de manera independiente

---

## Controles Operativos (Vía Institucional)

Para niveles de certificación más altos:

### Gestión de Claves

- Se recomiendan claves respaldadas por hardware
- Política de rotación de claves definida
- Restricciones de acceso documentadas

### Gobernanza del Libro Mayor

- Responsabilidad clara del operador
- Sin capacidad de mutación retroactiva
- Procedimientos de respaldo y redundancia

### Separación de Roles

- Generación de pruebas
- Custodia de claves
- Administración de infraestructura

No deben colapsar en un solo actor no controlado.

---

## Requisitos de Transparencia Pública

Las implementaciones de grado institucional deben proporcionar:

- Documentación de verificación
- Divulgación de primitivas criptográficas
- Declaración del algoritmo de hash
- Identificación de versión

Los sistemas opacos no pueden ser certificados.

---

## Principio de Verificación Independiente

Una prueba VeriSeal certificada debe ser:

Verificable sin contactar a VeriSeal.

La verificación debe ser posible usando:

- El JSON público
- La especificación del protocolo publicada
- La cadena de hash del libro mayor
- La clave pública

Esto asegura la independencia del proveedor.

---

## Compatibilidad con Marcos Existentes

El modelo de conformidad es compatible con:

- Marcos de auditoría interna
- Revisión de cumplimiento financiero
- Procedimientos de forense digital
- Evaluación de admisibilidad de evidencia

No reemplaza los regímenes regulatorios.

Fortalece su base técnica.

---

## Objetivo a Largo Plazo

El Modelo de Certificación y Conformidad está diseñado para:

- Fomentar implementaciones del ecosistema
- Prevenir la fragmentación del protocolo
- Permitir auditores externos
- Construir confianza institucional

Con el tiempo, la certificación puede evolucionar hacia:

- Cuerpos acreditados independientes
- Vías de conformidad específicas del sector
- Reconocimiento global formalizado

---

## Principio Fundamental

Un sistema de prueba que no puede ser probado de manera independiente
no es infraestructura.

VeriSeal está diseñado para ser comprobable, reproducible y certificable.
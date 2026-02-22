Archivo: threat-model-adversarial-analysis.md

---
title: Modelo de Amenazas y Análisis Adversarial
sidebar_label: Modelo de Amenazas (Anexo)
---

# Modelo de Amenazas y Análisis Adversarial

## 1. Propósito y Alcance

Este anexo proporciona un análisis orientado a la seguridad de la infraestructura de prueba VeriSeal bajo condiciones adversas.

Define:

- Actores de amenaza y capacidades
- Límites de confianza
- Superficies de ataque
- Supuestos de seguridad
- Mecanismos de detección y mitigación
- Riesgos residuales y requisitos de gobernanza

Este anexo está dirigido a partes interesadas institucionales (CISO, Riesgo, Auditoría, Cumplimiento).

---

## 2. Activos del Sistema a Proteger

VeriSeal está diseñado para proteger la **integridad y verificabilidad** de los artefactos de evidencia y los registros de prueba.

Activos principales:

1. **Integridad del Artefacto**
   El artefacto sellado debe permanecer verificable y con evidencia de manipulación a lo largo del tiempo.

2. **Integridad del Objeto de Prueba**
   Los registros de prueba (JSON canónico) no deben ser alterables sin detección.

3. **Continuidad del Libro Mayor**
   La cadena de solo adición debe permanecer estructuralmente inmutable y cronológicamente consistente.

4. **Independencia de Verificación**
   Terceros deben poder verificar pruebas sin confiar en el operador.

5. **Integridad de la Marca de Tiempo (anclaje externo opcional)**
   Cuando existe anclaje externo, el ancla debe fortalecer la certeza temporal.

6. **Integridad de Claves (claves de firma)**
   Las claves privadas utilizadas para firmar deben permanecer confidenciales y gobernadas.

---

## 3. Actores de Amenaza

### 3.1 Adversario Externo
Capacidades:
- Intentos de interceptación a nivel de red
- Sondeo de puntos finales públicos
- Intentos de sustitución de artefactos
- Intentos de repetición para flujos de captura (cuando sea aplicable)

Restricciones:
- Sin acceso directo a claves de firma o almacenamiento interno (asumido)

### 3.2 Amenaza Interna (Operador o Administrador Privilegiado)
Capacidades:
- Acceso potencial a la infraestructura
- Intentos de alterar registros
- Intentos de eliminar o ocultar selectivamente evidencia
- Intentos de manipular salidas en PDF o presentaciones

### 3.3 Remitente de Evidencia Malicioso
Capacidades:
- Enviar contenido falso o engañoso
- Enviar artefactos manipulados
- Intentar explotar ambigüedad en el flujo de trabajo
- Intentar repudiación después del sellado ("Nunca envié esto")

### 3.4 Dispositivo Cliente Comprometido
Capacidades:
- Malware modifica el artefacto antes del sellado
- Compromiso de credenciales
- Intercepta o altera datos locales antes de la carga

### 3.5 Adversario de la Cadena de Suministro / Dependencia
Capacidades:
- Compromiso de dependencia
- Compromiso de la línea de construcción
- Intentos de inyección en tiempo de ejecución

---

## 4. Límites de Confianza

VeriSeal aplica límites de confianza explícitos:

Dentro del límite de confianza de VeriSeal:
- Cálculo de hash
- Generación de objeto de prueba canónico
- Operación de adición al libro mayor
- Generación de firma (dominio de clave controlado)
- Envío de ancla opcional

Fuera del límite de confianza:
- Herramientas de creación de artefactos
- Seguridad del dispositivo del usuario
- Veracidad semántica del contenido
- Interpretación legal
- Intención y contexto humano

Principio clave: **VeriSeal asegura la estructura, no el significado.**

---

## 5. Resumen de la Superficie de Ataque

Superficies de ataque principales:

1. **Ingesta de artefactos de entrada** (carga / generación de carga útil)
2. **Pipeline de generación de pruebas** (hashing + canonicalización + firma)
3. **Almacenamiento del libro mayor** (integridad de la cadena de solo adición)
4. **Puntos finales de verificación** (JSON público, renderizado PDF, página de verificación HTML)
5. **Gestión de claves** (confidencialidad de claves privadas y política de uso)
6. **Cadena de construcción/CI y dependencia** (integridad de la cadena de suministro)

---

## 6. Escenarios de Amenaza y Mitigaciones

### 6.1 Manipulación de Artefactos Post-Sellado
Ataque: Artefacto modificado después del sellado.

Detección:
- El digest SHA-256 recomputado difiere.

Mitigación:
- Hashing determinista
- La validación de pruebas requiere recomputación

Riesgo residual:
- Ninguno para detección (la integridad siempre detecta cambios)
- Las disputas semánticas siguen siendo posibles

---

### 6.2 Manipulación del Objeto de Prueba (JSON)
Ataque: Alterar campos JSON de prueba (marcas de tiempo, identificadores, banderas).

Detección:
- Falla en la verificación de la firma
- Desajuste de hash en la recomputación canónica

Mitigación:
- JSON canónico como fuente de verdad
- Firma sobre carga útil canónica

Riesgo residual:
- Si la clave de firma está comprometida (ver escenario de compromiso de clave)

---

### 6.3 Mutación / Eliminación del Libro Mayor
Ataque: Eliminar una entrada o reescribir la cadena histórica.

Detección:
- Discontinuidad de la cadena (desajuste de previous_entry_hash)
- Desajuste en la recomputación de entry_hash

Mitigación:
- Arquitectura de solo adición
- Dependencia de hash de cadena
- Se recomienda anclaje externo regular para alta seguridad

Riesgo residual:
- Los ataques a nivel de almacenamiento pueden eliminar todo el libro mayor si la gobernanza es débil
  (riesgo de disponibilidad; la detección de integridad permanece, pero la evidencia puede faltar)

---

### 6.4 Supresión Selectiva de Evidencia ("Ocultamiento de Evidencia")
Ataque: El operador oculta o se niega a servir un punto final de prueba.

Detección:
- La referencia pública existe pero el punto final no responde
- Copias externas de JSON prueban existencia previa

Mitigación:
- Fomentar el archivo institucional de paquetes de prueba
- El anclaje externo fortalece las afirmaciones de existencia
- Políticas de gobernanza para disponibilidad

Riesgo residual:
- La disponibilidad sigue siendo gobernada operativamente

---

### 6.5 Manipulación de la Capa de Presentación (PDF/HTML)
Ataque: Modificar el renderizado PDF o la vista HTML para mostrar un estado falso.

Detección:
- JSON canónico sigue siendo la fuente de verdad
- El verificador recomputa hashes y valida la firma

Mitigación:
- Regla de solo renderizado
- La lógica de verificación nunca depende de la salida de presentación

Riesgo residual:
- El riesgo de ingeniería social permanece (usuarios confiando en visuales sin verificar)

---

### 6.6 Ataques de Repetición (Pruebas Basadas en Captura)
Ataque: Repetir una captura de video/audio previa para simular actividad en vivo.

Detección/Mitigación (cuando existen flujos de captura):
- Vinculación de desafío-respuesta (indicaciones dinámicas)
- Hashing de registro de eventos en tiempo de ejecución
- Vinculación de medios a carga útil en tiempo de ejecución

Riesgo residual:
- Dependiente de la calidad del flujo de trabajo de captura
- No aplicable a casos de uso de sellado de artefactos estáticos

---

### 6.7 Ataque de Hombre en el Medio / Capa de Transporte
Ataque: Interceptar o alterar el tráfico durante la carga o verificación.

Mitigación:
- TLS aplicado (HTTPS)
- La recomputación de hash y la validación de firma previenen la manipulación silenciosa

Riesgo residual:
- El robo de credenciales está fuera del modelo criptográfico
- Los ataques de degradación de red se mitigan mediante HTTPS estricto y HSTS (recomendado)

---

### 6.8 Compromiso de Clave Privada
Ataque: Robo de clave de firma.

Impacto:
- El atacante puede emitir pruebas falsificadas que parecen válidas
- Las pruebas históricas siguen siendo verificables pero la confianza en el firmante se ve afectada

Mitigación:
- Firma respaldada por HSM / KMS
- Política de rotación de claves
- Registros de auditoría para operaciones de firma
- Separación de funciones (control dual)

Riesgo residual:
- Escenario de mayor impacto; la gobernanza es obligatoria

---

### 6.9 Debilitamiento de Función Hash (Avance Criptográfico)
Ataque: Colisión práctica o segunda preimagen contra SHA-256.

Impacto:
- Las suposiciones de integridad se degradan

Mitigación:
- Agilidad de algoritmo (campo hash_version)
- Capacidad para reanclar pruebas utilizando primitivas más fuertes
- Soporte para estrategias de doble hash en futuras versiones

Riesgo residual:
- Existe riesgo de evolución criptográfica a largo plazo para todos los sistemas

---

### 6.10 Compromiso de la Cadena de Suministro
Ataque: Dependencias de construcción inyectan lógica maliciosa.

Mitigación:
- Fijar dependencias
- Construcciones reproducibles
- Firma de código
- Generación de SBOM
- Controles de integridad de CI

Riesgo residual:
- Requiere gobernanza disciplinada de software

---

## 7. Supuestos de Seguridad

Supuestos de seguridad de VeriSeal:

- SHA-256 sigue siendo seguro (sin colisiones factibles)
- El esquema de firma sigue siendo seguro (sin falsificación factible sin clave privada)
- La serialización canónica es determinista y controlada
- La aplicación de solo adición está protegida operativamente
- Las claves privadas están protegidas por la gestión de claves institucional

---

## 8. Garantías de Seguridad (Lo que VeriSeal Realmente Garantiza)

VeriSeal garantiza:

- Detección de cualquier modificación de artefacto post-sellado
- Reproducibilidad de verificación determinista
- Integridad estructural y continuidad de la cadena (si el libro mayor está disponible)
- Evidencia de manipulación del objeto de prueba mediante firma
- Refuerzo opcional de anclaje temporal externo

VeriSeal no garantiza:

- Veracidad del contenido
- Legitimidad de identidad por defecto
- Protección contra dispositivos cliente comprometidos
- Disponibilidad de puntos finales de prueba sin gobernanza

---

## 9. Riesgo Residual y Requisitos de Gobernanza

VeriSeal es más fuerte cuando la gobernanza aplica:

- Política de gestión de claves (HSM/KMS, rotación, auditoría)
- Política de disponibilidad (paquetes de archivo, redundancia)
- Segregación de roles (sellado vs verificación vs administración)
- Procedimientos de respuesta a incidentes
- Política de anclaje externo para casos de uso de alta seguridad

Sin gobernanza, la integridad sigue siendo detectable, pero la resiliencia operativa puede degradarse.

---

## 10. Resumen de la Postura de Seguridad Institucional

VeriSeal está diseñado como:

- Un protocolo de integridad determinista
- Una capa de evidencia compatible con auditoría
- Un sistema que minimiza la dependencia de confianza
- Un modelo de libro mayor + objeto de prueba con evidencia de manipulación

Proporciona garantías de integridad verificables bajo condiciones adversas, siempre que se apliquen controles clave de gobernanza y operativos.

---

## 11. Matriz de Clasificación de Riesgos

Esta sección formaliza la gravedad de las amenazas según el impacto y la probabilidad.

Modelo de clasificación de riesgos:

- Probabilidad: Baja / Media / Alta
- Impacto: Moderado / Significativo / Crítico
- Riesgo Residual: Después de los controles de mitigación
- Propietario del Riesgo: Dominio de responsabilidad de gobernanza

| Escenario de Amenaza | Probabilidad | Impacto | Fuerza de Mitigación | Riesgo Residual | Propietario del Riesgo |
|----------------------|--------------|--------|----------------------|-----------------|------------------------|
| Manipulación de artefactos post-sellado | Media | Significativo | Detección criptográfica | Bajo | Capa de verificación |
| Alteración de JSON de prueba | Baja | Significativo | Firma + canonicalización | Bajo | Capa criptográfica |
| Mutación del libro mayor | Baja | Crítico | Encadenamiento de hash + detección | Bajo | Gobernanza de infraestructura |
| Supresión de evidencia | Media | Significativo | Archivo + anclaje | Medio | Gobernanza operativa |
| Manipulación de presentación | Media | Moderado | JSON fuente de verdad | Bajo | Disciplina de verificación |
| Compromiso de clave privada | Baja | Crítico | HSM/KMS + rotación | Medio | Gobernanza de claves |
| Debilitamiento del algoritmo hash | Muy Baja | Crítico | Agilidad de algoritmo | Bajo | Gobernanza criptográfica |
| Compromiso de la cadena de suministro | Media | Significativo | Controles de CI + SBOM | Medio | Gobernanza DevSecOps |

Resumen de postura de riesgo:

- Los riesgos de integridad estructural están fuertemente mitigados.
- El compromiso de claves sigue siendo el escenario de mayor impacto.
- La madurez de la gobernanza influye directamente en el riesgo residual.

---

## 12. Modelo de Gobernanza y Segregación de Roles

La seguridad de VeriSeal asume la separación institucional de funciones.

### 12.1 Roles Funcionales

**Operador de Sellado**
- Inicia la generación de pruebas.
- No puede modificar entradas históricas del libro mayor.

**Autoridad de Verificación**
- Realiza validación independiente.
- No tiene acceso a claves de firma.

**Custodio de Claves**
- Gestiona claves de firma.
- Opera bajo política de control dual.

**Administrador de Infraestructura**
- Gestiona la disponibilidad del sistema.
- No puede alterar cargas útiles de prueba firmadas.

**Función de Auditoría**
- Revisa registros y continuidad de la cadena.
- Independiente de operaciones.

---

### 12.2 Resumen RACI

| Función | Sellar | Verificar | Firmar | Mantener | Auditar |
|---------|--------|-----------|--------|----------|---------|
| Operador de Sellado | R | C | - | - | - |
| Autoridad de Verificación | - | R | - | - | C |
| Custodio de Claves | - | - | R | - | C |
| Administrador de Infraestructura | - | - | - | R | C |
| Auditoría | - | C | C | C | R |

R = Responsable
C = Control / Supervisión

---

### 12.3 Principio de Gobernanza

La integridad se aplica mediante criptografía.
La confianza se aplica mediante separación de gobernanza.

Las garantías criptográficas reducen la dependencia de la confianza humana,
pero la gobernanza institucional asegura la resiliencia.

---

## 13. Respuesta a Incidentes y Procedimiento de Compromiso de Clave

Esta sección define la postura mínima de respuesta institucional.

### 13.1 Escenario de Compromiso de Clave

Si se sospecha compromiso de clave de firma:

1. Revocación inmediata de la clave.
2. Detener la emisión de nuevas pruebas.
3. Generar un nuevo par de claves de firma.
4. Publicar aviso público de incidente.
5. Reanclar el estado del sistema (si aplica).
6. Realizar auditoría forense.

Las pruebas históricas siguen siendo estructuralmente verificables.
El dominio de confianza se desplaza a la línea de tiempo de validez de la clave.

---

### 13.2 Incidente de Integridad de Prueba

Si se detecta corrupción del libro mayor:

- Recomponer la continuidad de la cadena.
- Identificar el punto de divergencia.
- Restaurar desde una copia de seguridad validada.
- Publicar declaración de integridad.

---

### 13.3 Principio de Transparencia Pública

Para implementaciones institucionales:

- Se requiere política de divulgación de incidentes.
- Se recomiendan registros de incidentes con marca de tiempo.
- Se aconseja auditoría independiente para dominios de alta seguridad.

---

### 13.4 Evolución Criptográfica a Largo Plazo

Si las primitivas de hash o firma se debilitan:

- Introducir campo de hash versionado.
- Reanclar pruebas existentes.
- Soportar estrategia de doble hash durante la migración.

La agilidad del algoritmo debe estar integrada en la hoja de ruta de gobernanza.
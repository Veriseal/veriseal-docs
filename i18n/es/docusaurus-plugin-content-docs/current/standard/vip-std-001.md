---
id: vip-std-001
title: VIP-STD-001 — Estándar de Integridad Central
sidebar_position: 3
---

# VIP-STD-001  
## Estándar de Integridad Central

---

# 1. Alcance

Este documento define el modelo de integridad central obligatorio del Protocolo de Integridad VeriSeal (VIP).

Especifica las reglas determinísticas para:

- Canonicalización de datos
- Cálculo de hash
- Formación de objeto de prueba
- Verificación determinística

Este estándar no define el comportamiento del libro mayor, firmas digitales o mecanismos de anclaje.  
Tales elementos se especifican en perfiles de extensión separados.

---

# 2. Lenguaje Normativo

Las palabras clave:

- DEBE
- NO DEBE
- DEBERÍA
- PUEDE

deben interpretarse como se describe en RFC 2119.

---

# 3. Definiciones

**Datos Canónicos**  
Una representación de bytes normalizada de datos de entrada estructurados.

**Hash de Integridad**  
Un resumen SHA-256 calculado sobre datos canónicos.

**Objeto de Prueba**  
Un objeto JSON estructurado que contiene datos canónicos y su hash de integridad.

**Evento de Verificación**  
La recomputación determinística del hash de integridad a partir de datos canónicos.

---

# 4. Reglas de Canonicalización

4.1 Formato de Datos  
Los datos de entrada DEBEN ser JSON estructurado.

4.2 Orden de Campos  
Todas las claves de objeto DEBEN estar ordenadas lexicográficamente.

4.3 Espacios en Blanco  
Los espacios en blanco DEBEN eliminarse excepto donde lo requiera la sintaxis JSON.

4.4 Codificación  
DEBE usarse la codificación UTF-8.

4.5 Determinismo  
La canonicalización DEBE producir una salida de bytes idéntica para una entrada lógica idéntica.

---

# 5. Algoritmo de Hash

5.1 Algoritmo  
El hash de integridad DEBE usar SHA-256.

5.2 Entrada  
El hash DEBE calcularse sobre la secuencia de bytes canónica.

5.3 Salida  
El hash DEBE codificarse como hexadecimal en minúsculas.

---

# 6. Estructura del Objeto de Prueba

Un objeto de prueba conforme DEBE incluir:

```json
{
  "v": 1,
  "type": "PROOF",
  "data": { ... },
  "hash": "<sha256-hex>"
}

Donde:

- `v` = versión del protocolo  
- `type` = cadena fija "PROOF"  
- `data` = carga útil JSON canónica  
- `hash` = resumen SHA-256 de `data` canónica

Los campos adicionales NO DEBEN alterar la canonicalización de `data`.

---

# 7. Verificación Determinística

La verificación DEBE seguir estos pasos:

1. Extraer `data`
2. Canonicalizar `data`
3. Calcular hash SHA-256
4. Comparar el hash calculado con el `hash` almacenado
5. Devolver VÁLIDO si son iguales; INVÁLIDO de lo contrario

La verificación NO DEBE depender de:

- Estado externo
- Acceso a la red
- Presencia del libro mayor
- Presencia de firma
- Estado de anclaje

La verificación central es autónoma.

---

# 8. Principio de Independencia

VIP-STD-001 define solo integridad.

No garantiza:

- Autenticidad de datos
- Verificación de identidad
- Admisibilidad legal
- Validez de marca de tiempo

Garantiza integridad determinística bajo supuestos criptográficos definidos.

---

# 9. Compatibilidad Retroactiva

Las futuras revisiones menores DEBEN preservar:

- Determinismo de canonicalización
- Compatibilidad con SHA-256
- Reproducibilidad de verificación

Los cambios disruptivos requieren incremento de versión.

---

# 10. Conformidad

Un sistema es conforme con VIP-STD-001 si:

1. Implementa la canonicalización según la Sección 4  
2. Calcula SHA-256 según la Sección 5  
3. Produce objetos de prueba según la Sección 6  
4. Verifica de manera determinística según la Sección 7  

La conformidad con perfiles de extensión es opcional.

---

# 11. Consideraciones de Seguridad

La seguridad de VIP-STD-001 depende de:

- La fortaleza criptográfica de SHA-256
- Implementación correcta de canonicalización
- Protección contra vulnerabilidades de colisión de hash

Las suposiciones de amenazas se definen en VIP-THREAT-001.

---

# 12. Conclusión

VIP-STD-001 define el modelo de integridad central obligatorio del Protocolo de Integridad VeriSeal.

Proporciona verificación de integridad digital determinística, reproducible y agnóstica a la implementación.
---
id: vip-std-002
title: VIP-STD-002 — Perfil de Libro Mayor
sidebar_position: 4
---

# VIP-STD-002  
## Perfil de Libro Mayor (Extensión a VIP-STD-001)

---

# 1. Alcance

Este documento define el Perfil de Libro Mayor opcional del Protocolo de Integridad VeriSeal (VIP).

Especifica la estructura de registro de solo anexado para la persistencia de pruebas.

Este perfil extiende VIP-STD-001 pero no modifica el modelo de integridad central.

---

# 2. Relación con VIP-STD-001

VIP-STD-002:

- DEBE usar objetos de prueba conformes con VIP-STD-001  
- NO DEBE alterar la canonización o el cálculo de hash  
- DEBE preservar la verificación determinista  

La capa de libro mayor registra pruebas; no las redefine.

---

# 3. Definiciones

**Entrada de Libro Mayor**  
Un registro estructurado que contiene un objeto de prueba y su referencia de encadenamiento.

**Hash Anterior (prev_hash)**  
El hash de integridad de la entrada de libro mayor anterior.

**Cabeza de Cadena**  
La entrada de libro mayor válida más reciente en una secuencia.

---

# 4. Estructura de la Entrada de Libro Mayor

Una entrada de libro mayor conforme DEBE seguir:

```json
{
  "v": 1,
  "type": "LEDGER_ENTRY",
  "proof": { ...objeto conforme a VIP-STD-001... },
  "prev_hash": "<sha256-hex o null>",
  "entry_hash": "<sha256-hex>"
}

Donde:

- `proof` DEBE ser un objeto de prueba válido conforme a VIP-STD-001  
- `prev_hash` DEBE referenciar el hash de la entrada anterior o ser null para la primera entrada  
- `entry_hash` DEBE ser el hash SHA-256 de la entrada de libro mayor canonizada excluyendo `entry_hash` en sí mismo  

---

# 5. Reglas de Cálculo de Hash

5.1 Canonización  
Las entradas de libro mayor DEBEN ser canonizadas usando las reglas de VIP-STD-001.

5.2 Hash de Entrada  
El `entry_hash` DEBE ser calculado sobre:

{
  "v",
  "type",
  "proof",
  "prev_hash"
}

5.3 Determinismo  
Dos entradas de libro mayor idénticas DEBEN producir valores de `entry_hash` idénticos.

---

# 6. Requisito de Solo Anexado

6.1 Inmutabilidad  
Las entradas de libro mayor NO DEBEN ser modificadas después de la inserción.

6.2 Orden  
Cada entrada DEBE referenciar exactamente un predecesor, excepto la entrada génesis.

6.3 Entrada Génesis  
La primera entrada de libro mayor DEBE establecer `prev_hash` a null.

---

# 7. Validación de Cadena

Un proceso de validación de libro mayor conforme DEBE:

1. Validar cada prueba incrustada según VIP-STD-001  
2. Recomponer cada `entry_hash`  
3. Verificar la consistencia del encadenamiento de `prev_hash`  
4. Confirmar la ausencia de enlaces rotos  

Una cadena es VÁLIDA si todas las entradas satisfacen estas condiciones.

---

# 8. Independencia de Almacenamiento

El Perfil de Libro Mayor:

- No exige un backend de almacenamiento
- No exige consenso distribuido
- No requiere implementación de blockchain
- No define reglas de replicación

Define solo el encadenamiento estructural.

---

# 9. Conformidad

Un sistema que reclame conformidad con VIP-STD-002 DEBE:

1. Aceptar objetos de prueba VIP-STD-001  
2. Implementar una estructura de libro mayor de solo anexado  
3. Hacer cumplir la integridad del encadenamiento de hash  
4. Proporcionar validación de cadena determinista  

Los detalles de implementación del libro mayor PUEDEN variar siempre que se preserve el determinismo estructural.

---

# 10. Consideraciones de Seguridad

La seguridad de este perfil depende de:

- La integridad del entorno de almacenamiento  
- Protección contra modificaciones no autorizadas  
- Canonización correcta  

Este perfil no previene ataques de eliminación a menos que se combine con mecanismos de anclaje definidos en VIP-STD-004.

---

# 11. Conclusión

VIP-STD-002 define la capa de persistencia estructural del Protocolo de Integridad VeriSeal.

Asegura el encadenamiento de solo anexado y la consistencia de pruebas a largo plazo sin alterar el modelo de integridad central.
---
id: cryptographic-model
title: Arquitectura Criptográfica y de Pruebas
sidebar_position: 2.1
---

# 2.1 Arquitectura Criptográfica y de Pruebas

VeriSeal se basa exclusivamente en primitivas criptográficas conservadoras y probadas en batalla.

Sin capa de consenso experimental.  
Sin algoritmo de hash propietario.  
Sin construcción criptográfica opaca.

El modelo es determinista, reproducible y defendible institucionalmente.

---

## Objetivos de Diseño

La capa criptográfica debe asegurar:

- Integridad estructural  
- Reproducibilidad determinista  
- Auditabilidad a largo plazo  
- Verificabilidad externa  
- Anclaje de marca de tiempo descentralizado opcional  

---

## Canonicalización

Los datos de entrada en bruto deben transformarse primero en una representación determinista.

Sea:

E = evidencia en bruto  
C(E) = representación canónica  

La canonicalización garantiza:

- Codificación JSON estable  
- Ordenación determinista de campos  
- Normalización UTF-8  
- Sin ambigüedad en espacios en blanco  

La carga útil canónica:

P = C(E)

---

## Hashing

Primitiva de integridad primaria:

H = SHA-256(P)

Propiedades:

- Resistencia a colisiones (suposiciones criptográficas actuales)
- Salida determinista
- Universalmente reproducible

El hash se convierte en el identificador de prueba principal cuando es de un solo artefacto.

---

## Agregación Merkle

Para pruebas de múltiples artefactos:

h1, h2, ..., hn

Se construye un árbol de Merkle.

El resultante:

merkle_root

Propiedades:

- Cualquier modificación de hoja invalida la raíz
- Posibilidad de pruebas de inclusión eficientes
- Vinculación determinista de múltiples artefactos

El merkle_root se convierte en la referencia pública canónica.

---

## Libro Mayor de Solo Anexar

Cada prueba se inserta en un libro mayor de solo anexar.

Cada entrada contiene:

- proof_identifier  
- metadata  
- UTC timestamp  
- prev_hash  

Regla de encadenamiento:

entry_hash_i = SHA256(entry_data_i || entry_hash_(i-1))

Esto crea inmutabilidad estructural.

Alterar entradas históricas rompe la integridad de la cadena.

---

## Modo de Vinculación Fuerte

VeriSeal impone coherencia estructural entre:

- Registros de UX  
- Artefactos de medios  
- JSON canónico  
- Entrada en el libro mayor  
- PDF opcional  
- Anclaje OTS opcional  

La vinculación previene la modificación selectiva o sustitución de componentes.

---

## Firma PDF (Capa Opcional)

El PDF es solo de renderizado.

Cuando está habilitado:

- Firma RSA-3072  
- Hash del documento incrustado  
- Verificable independientemente  

Importante:

El PDF no es la fuente de verdad.  
La entrada en el libro mayor y el JSON público lo son.

---

## OpenTimestamps (Opcional)

Cuando está habilitado:

- El hash de la prueba se envía a OTS
- Se genera un archivo .ots
- La confirmación de Bitcoin ancla la existencia en el tiempo

OTS fortalece el anclaje temporal pero no es necesario para la validación estructural.

---

## Minimización de Confianza

La verificación requiere confianza solo en:

- SHA-256  
- Cálculo determinista  
- Estándares criptográficos públicos  

No en:

- Servidores propietarios  
- Declaraciones de operadores  
- Representaciones visuales  

VeriSeal no afirma la verdad.  
Garantiza la integridad estructural.
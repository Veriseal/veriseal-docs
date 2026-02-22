---
title: VIP-STD-003 - Perfil de Firma VeriSeal
sidebar_label: VIP-STD-003
---

# VIP-STD-003 - Especificación del Perfil de Firma VeriSeal

Versión: 1.0  
Estado: Borrador Público  
Clasificación: Estándar de Integridad Abierta

---

## 1. Alcance

Este documento define el perfil de firma para el Protocolo de Integridad VeriSeal.

VIP-STD-003 especifica:

- Requisitos de cobertura de firma
- Algoritmos de firma permitidos
- Reglas de verificación determinista
- Estructura del objeto de firma
- Restricciones de cumplimiento

Esta especificación se basa en VIP-STD-001 y VIP-STD-002.

---

## 2. Resumen del Modelo de Firma

Las firmas son OPCIONALES en VIP-STD-001 pero se definen formalmente en este perfil.

Una firma DEBE vincular criptográficamente:

- El objeto de prueba canónico (VIP-STD-001)
- El hash de la prueba
- Opcionalmente la entrada en el libro mayor (VIP-STD-002)

La cobertura de la firma DEBE ser determinista.

---

## 3. Reglas de Cobertura de Firma

La firma DEBE calcularse sobre:

SHA-256(canonical_proof_object)

Debe utilizarse la representación exacta de bytes definida en el Apéndice C de VIP-STD-001.

No se permite la reserialización durante la verificación.

---

## 4. Estructura del Objeto de Firma

Si está presente, un objeto de firma DEBE incluir:

- signature_algorithm
- public_key
- signature_value

No se permiten campos adicionales en la versión 1.0.

---

## 5. Definiciones de Campos

signature_algorithm  
DEBE ser uno de:

- Ed25519
- ECDSA-secp256k1
- RSA-3072

public_key  
DEBE codificarse en hexadecimal o base64, dependiendo de la especificación del algoritmo.

signature_value  
DEBE representar los bytes de la firma en bruto codificados en hexadecimal.

---

## 6. Verificación Determinista

La verificación DEBE:

1. Recomponer el hash de la prueba
2. Reconstruir la representación de bytes canónica
3. Verificar la firma contra la public_key proporcionada
4. Rechazar firmas que no coincidan

La verificación de la firma DEBE ser determinista.

---

## 7. Requisitos del Algoritmo

## 7.1 Ed25519

- Determinista por diseño
- Firma de 64 bytes
- Clave pública de 32 bytes

## 7.2 ECDSA-secp256k1

- La firma DEBE estar normalizada en low-S
- Se REQUIERE firma determinista RFC 6979

## 7.3 RSA-3072

- El relleno DEBE usar PKCS#1 v1.5 o PSS
- Tamaño mínimo del módulo de 3072 bits

---

## 8. Consideraciones de Seguridad

Las implementaciones DEBEN proteger contra:

- Maleabilidad de la firma
- Ataques de eliminación de firma
- Ataques de sustitución de clave
- Aleatoriedad débil en ECDSA
- Ataques de repetición

Si una firma está presente y es inválida, la prueba DEBE considerarse inválida.

---

## 9. Requisitos de Cumplimiento

Para reclamar cumplimiento con VIP-STD-003:

- La cobertura de la firma DEBE coincidir con la Sección 3
- El algoritmo DEBE ser uno de los permitidos
- La verificación DEBE ser determinista
- Las firmas inválidas DEBEN causar rechazo

La validación parcial de la firma NO DEBE reclamar cumplimiento.

---

## 10. Relación con Otros Estándares

VIP-STD-003 extiende:

- VIP-STD-001 (integridad de prueba canónica)
- VIP-STD-002 (integridad del libro mayor)

El cumplimiento total requiere adherirse a todos los perfiles aplicables.

---

## 11. Extensiones Futuras

Las versiones futuras PUEDEN introducir:

- Algoritmos de firma post-cuánticos
- Soporte de multi-firma
- Firmas umbral
- Integración de cadena de certificados
- Extensiones de vinculación de identidad

Se DEBE mantener la compatibilidad hacia atrás.

---

## 12. Conclusión

VIP-STD-003 define la capa de firma determinista de VeriSeal.

Asegura:

- Autenticidad criptográfica
- Verificación determinista
- Restricciones de algoritmo
- Validación de firma interoperable

Completa la pila de integridad criptográfica de VeriSeal.
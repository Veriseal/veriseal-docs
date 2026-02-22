---
id: deployment-model
title: Modelo de Despliegue
sidebar_position: 4.2
---

# Modelo de Despliegue

## Pila de Referencia

La arquitectura típica puede incluir:

- Capa de aplicación (por ejemplo, FastAPI)
- Generación de pruebas determinísticas
- Base de datos de libro mayor de solo anexado
- Salida JSON canónica
- Anclaje de marca de tiempo opcional
- Capa de puerta de enlace asegurada con TLS

La pila específica puede evolucionar.

El modelo de prueba determinística debe permanecer estable.

---

## Configuraciones Soberanas

Las instituciones pueden requerir:

- Garantías de residencia de datos
- Infraestructura aislada
- Puntos finales de verificación privados
- Controles de gobernanza interna

La lógica de verificación debe seguir siendo interoperable entre los despliegues.

---

## Separación de Verificación Pública

Los puntos finales de verificación pueden operar independientemente de:

- Sistemas de autenticación
- Lógica de negocio
- Almacenamiento de datos

Esto asegura la verificabilidad a largo plazo incluso bajo cambios organizacionales.
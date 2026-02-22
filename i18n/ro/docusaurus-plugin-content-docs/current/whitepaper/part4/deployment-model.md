Fișier: deployment-model.md

---
id: deployment-model
title: Model de Implementare
sidebar_position: 4.2
---

# Model de Implementare

## Stivă de Referință

Arhitectura tipică poate include:

- Strat de aplicație (de exemplu, FastAPI)
- Generare deterministă de dovezi
- Bază de date jurnal doar pentru adăugare
- Ieșire JSON canonică
- Ancorare opțională a marcajului temporal
- Strat de gateway securizat TLS

Stiva specifică poate evolua.

Modelul de dovezi deterministe trebuie să rămână stabil.

---

## Configurații Suverane

Instituțiile pot necesita:

- Garanții de rezidență a datelor
- Infrastructură izolată
- Endpoint-uri de verificare private
- Controale interne de guvernanță

Logica de verificare trebuie să rămână interoperabilă între implementări.

---

## Separarea Verificării Publice

Endpoint-urile de verificare pot funcționa independent de:

- Sisteme de autentificare
- Logica de afaceri
- Stocarea datelor

Aceasta asigură verificabilitatea pe termen lung chiar și în cazul schimbărilor organizaționale.
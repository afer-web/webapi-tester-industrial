# WebAPI Tester for Industrial Devices

![Placeholder screenshot WebAPI Tester](https://via.placeholder.com/1200x700.png?text=WebAPI+Tester+for+Industrial+Devices)

## Panoramica

**WebAPI Tester for Industrial Devices** e uno strumento single-page leggero, sviluppato in HTML, CSS e JavaScript puro, pensato per testare WebAPI industriali e endpoint REST generici.

L'interfaccia e progettata con uno stile moderno da dashboard tecnica: rapida da usare, chiara nella lettura dei risultati e utile per validare endpoint durante attivita di integrazione OT/IT, commissioning e troubleshooting.

## Funzionalita principali

- Invio richieste HTTP con metodi `GET`, `POST`, `PUT`, `DELETE`
- Supporto body JSON per richieste `POST` e `PUT`
- Visualizzazione codice di stato con indicatori colore:
  - Verde per `2xx`
  - Giallo per `3xx`
  - Rosso per `4xx/5xx`
- Misurazione del tempo di risposta in millisecondi
- Formattazione automatica della risposta JSON con syntax highlighting
- Salvataggio, caricamento ed eliminazione richieste tramite `localStorage`
- Validazione URL obbligatoria e validazione JSON del body
- Messaggi di errore chiari in caso di input non valido o errore rete
- Layout responsive per desktop e dispositivi mobili

## Tecnologie utilizzate

- **HTML5** per la struttura semantica
- **CSS3** per il design industrial/futuristico responsive
- **JavaScript Vanilla (ES6+)** per logica applicativa e gestione stato locale
- **Fetch API** per la comunicazione HTTP
- **localStorage** per la persistenza delle richieste salvate

## Struttura del progetto

```text
/webapi-tester
  index.html
  style.css
  app.js
  README.md
```

## Come eseguire il progetto

1. Clona o scarica il repository.
2. Apri la cartella `webapi-tester`.
3. Avvia `index.html` nel browser (doppio click oppure tramite un server statico locale).

Non sono necessari build step, dipendenze o installazioni.

## Come salvare una richiesta

1. Inserisci l'URL dell'endpoint.
2. Seleziona il metodo HTTP.
3. (Opzionale) Inserisci il body JSON per `POST`/`PUT`.
4. Premi **Save Request**.
5. Seleziona la richiesta dalla sidebar **Saved Requests** per ricaricarla nel form.
6. Usa **Delete** per rimuoverla dall'elenco.

## Estensioni future possibili

- Editor per header custom (Authorization, API Key, token custom)
- Storico richieste con filtri e timestamp
- Gestione ambienti (Dev / Test / QA / Produzione)
- Export/Import delle richieste salvate in formato JSON
- Modalita monitoraggio periodico endpoint (health check)
- Collezioni di test preconfigurate per device industriali

---

Questo progetto puo essere evoluto in una suite completa di test API per scenari industriali, integrazione sistemi e diagnostica avanzata.

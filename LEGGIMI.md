# Allenamenti

Diario multisport che gira nel browser. I dati stanno nel `localStorage`
del dispositivo, legati al dominio da cui apri l'app.

## Metterlo online (GitHub Pages)

1. Crea un repository, per esempio `allenamenti`.
2. Carica tutti i file mantenendo la struttura:

   ```
   index.html
   manifest.webmanifest
   sw.js
   assets/
     archivo-var.woff2
     icon-192.png
     icon-512.png
     icon-maskable-512.png
     apple-touch-icon.png
   ```

3. Settings → Pages → Source: `Deploy from a branch`, branch `main`, cartella `/ (root)`.
4. Dopo un minuto il sito è su `https://<utente>.github.io/allenamenti/`.
5. Aprilo in Safari → Condividi → Aggiungi alla schermata Home.

Da lì parte a schermo intero, con la sua icona, e funziona anche offline.

## Quando modifichi qualcosa

Alza il numero di `VERSION` in `sw.js` (`allenamenti-v1` → `allenamenti-v2`).
Serve a buttare via la cache vecchia: senza, il telefono può continuare
a mostrarti la versione precedente.

## Attenzione ai dati

L'archivio è legato all'indirizzo del sito. Se cambi dominio, la nuova
pagina parte vuota. Se cancelli i dati dei siti in Safari, l'archivio se ne va.

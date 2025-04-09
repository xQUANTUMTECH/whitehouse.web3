
# Istruzioni per il Deploy su IPFS con Fleek.xyz

Questo documento spiega come eseguire il deploy del sito whitehouse.web3 sul tuo wallet usando Fleek.xyz. Ti offriamo due opzioni: deploy tramite interfaccia web o deploy tramite SDK.

## Prerequisiti

1. Possesso del dominio `whitehouse.web3` (acquistato da Unstoppable Domains o ENS)
2. Account su [Fleek.xyz](https://fleek.xyz)

## Opzione 1: Deploy tramite Interfaccia Web

### 1. Carica il sito su IPFS tramite l'interfaccia web di Fleek.xyz

1. Accedi al tuo account su [Fleek.xyz](https://fleek.xyz) o creane uno nuovo
2. Dalla dashboard, seleziona "Add new" o "Create new site"
3. Configura il sito con questi parametri:
   - Site Name: `whitehouse-web3`
   - Framework: `Other`
   - Branch: `main`
   
   ### IMPOSTAZIONI CONSIGLIATE:
   - Publish Directory: `.` (punto, significa directory corrente)
   - Build Command: [lasciare vuoto]
   - Docker Image: lasciare vuoto

   Questa è la soluzione più semplice: Fleek pubblicherà direttamente tutti i file così come sono, senza nessun processo di build che potrebbe causare errori.
6. Clicca su "Deploy site"
7. Al termine del deploy, Fleek ti fornirà:
   - Il CID (Content Identifier) IPFS
   - Un URL Fleek per visualizzare il sito (es. yoursite.on.fleek.co)

## Opzione 2: Deploy Programmatico tramite SDK di Fleek

### 1. Installazione e configurazione dell'SDK di Fleek

```bash
# Installa l'SDK di Fleek
npm install @fleek-platform/sdk
```

### 2. Autenticazione e upload

Esistono due metodi di autenticazione:
- `PersonalAccessTokenService`: Per applicazioni server-side (consigliato per il deploy)
- `ApplicationAccessTokenService`: Per applicazioni client-side

#### Esempio di script per deploy usando PersonalAccessTokenService

```javascript
// deploy.js
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import fs from 'fs';
import path from 'path';

// Configura l'autenticazione
const personalAccessTokenService = new PersonalAccessTokenService({
  personalAccessToken: process.env.FLEEK_PAT, // Token personale di accesso
  projectId: process.env.FLEEK_PROJECT_ID,    // ID del progetto
});

const fleekSdk = new FleekSdk({
  accessTokenService: personalAccessTokenService,
});

// Funzione per caricare una cartella ricorsivamente
async function uploadDirectory(directoryPath) {
  try {
    console.log(`Uploading directory: ${directoryPath}`);
    
    // Carica la directory completa su Fleek Storage
    const result = await fleekSdk.storage().uploadDirectory({
      directory: directoryPath,
      onUploadProgress: (progress) => {
        console.log(`Upload progress: ${Math.round(progress * 100)}%`);
      },
    });
    
    console.log('Upload completato con successo!');
    console.log(`CID: ${result.cid}`);
    console.log(`Visualizza il sito: https://ipfs.io/ipfs/${result.cid}`);
    
    return result.cid;
  } catch (error) {
    console.error('Errore durante l\'upload:', error);
    throw error;
  }
}

// Esegui l'upload della cartella whitehouse.web3
const directoryPath = path.resolve('./whitehouse.web3');
uploadDirectory(directoryPath).then((cid) => {
  console.log(`Ora puoi collegare il tuo dominio whitehouse.web3 al CID: ${cid}`);
});
```

#### Come eseguire lo script

```bash
# Impostare le variabili d'ambiente
export FLEEK_PAT="tuo-personal-access-token"
export FLEEK_PROJECT_ID="tuo-project-id"

# Eseguire lo script
node deploy.js
```

Per ottenere un Personal Access Token e un Project ID:
1. Usa il CLI di Fleek: `fleek pat create`
2. Il Project ID può essere ottenuto dalla dashboard o tramite CLI

### 2. Collega il tuo dominio al CID

#### Collegare da Fleek (opzione più semplice):

Fleek.xyz offre l'integrazione diretta con domini Web3:

1. Nella dashboard del tuo sito su Fleek, vai alla sezione "Domains"
2. Seleziona "Add domain" o "Connect domain"
3. Scegli l'opzione per domini ENS o Unstoppable Domains
4. Inserisci il tuo dominio `whitehouse.web3`
5. Segui le istruzioni per collegare il tuo wallet
6. Conferma la transazione

#### Collegare manualmente tramite wallet:

Se preferisci collegare manualmente:

1. Copia il CID fornito da Fleek
2. Per Unstoppable Domains:
   - Accedi al pannello di controllo su [Unstoppable Domains](https://unstoppabledomains.com)
   - Trova il tuo dominio `whitehouse.web3`
   - Nella sezione "Website", incolla il CID
   - Salva le modifiche

3. Per domini ENS:
   - Accedi al manager ENS con il tuo wallet
   - Seleziona il tuo dominio `whitehouse.web3`
   - Vai alle impostazioni del Content Hash
   - Inserisci il CID nel formato: `ipfs://QmYq5hqKbX...`
   - Conferma la transazione con il tuo wallet

### 3. Verifica il Deploy

Dopo aver collegato il dominio al CID, puoi verificare che il deploy sia avvenuto correttamente:

- **Browser Web3**: Apri un browser Web3 (come Brave o Opera) e accedi a `whitehouse.web3`
- **Browser standard con estensione**: Installa l'estensione di Unstoppable Domains o ENS e accedi a `whitehouse.web3`
- **Gateway IPFS**: Accedi al tuo sito tramite `https://ipfs.io/ipfs/[il-tuo-CID]`

## Risoluzione Problemi

Se il sito non è accessibile:
- Verifica che la propagazione DNS sia completata (può richiedere fino a 24 ore)
- Controlla che il CID sia stato inserito correttamente
- Assicurati che i file siano stati caricati correttamente, incluse le immagini e gli asset

## Aggiornamenti Futuri

Per aggiornare il sito:
1. Modifica i file nella cartella `whitehouse.web3`
2. Carica nuovamente la cartella su IPFS (otterrai un nuovo CID)
3. Aggiorna il tuo dominio con il nuovo CID

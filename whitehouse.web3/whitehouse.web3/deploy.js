// Script per il deploy automatico su Fleek.xyz
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ottieni il percorso corrente del file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    console.log('Questo potrebbe richiedere alcuni minuti...');
    
    // Carica la directory completa su Fleek Storage
    const result = await fleekSdk.storage().uploadDirectory({
      directory: directoryPath,
      onUploadProgress: (progress) => {
        const percentage = Math.round(progress * 100);
        process.stdout.write(`\rUpload progress: ${percentage}%`);
      },
    });
    
    console.log('\nUpload completato con successo!');
    console.log(`CID: ${result.cid}`);
    console.log(`Visualizza il sito: https://ipfs.io/ipfs/${result.cid}`);
    console.log('\nProssimi passaggi:');
    console.log('1. Accedi al tuo wallet che possiede il dominio whitehouse.web3');
    console.log(`2. Collega il dominio a questo CID: ${result.cid}`);
    console.log('3. Verifica il deploy visitando whitehouse.web3 in un browser Web3');
    
    return result.cid;
  } catch (error) {
    console.error('\nErrore durante l\'upload:', error);
    
    if (error.message.includes('authentication')) {
      console.log('\nProblemi di autenticazione. Verifica che:');
      console.log('- Il Personal Access Token (FLEEK_PAT) sia valido');
      console.log('- L\'ID del progetto (FLEEK_PROJECT_ID) sia corretto');
      console.log('- Le variabili d\'ambiente siano impostate correttamente');
    }
    
    if (error.message.includes('not found')) {
      console.log('\nDirectory non trovata. Verifica che:');
      console.log('- Il percorso alla cartella whitehouse.web3 sia corretto');
      console.log('- Lo script sia eseguito dalla directory corretta');
    }
    
    throw error;
  }
}

// Controlla che le variabili d'ambiente necessarie siano impostate
if (!process.env.FLEEK_PAT) {
  console.error('Errore: La variabile d\'ambiente FLEEK_PAT non è impostata.');
  console.log('Imposta la variabile usando:');
  console.log('export FLEEK_PAT="tuo-personal-access-token"');
  process.exit(1);
}

if (!process.env.FLEEK_PROJECT_ID) {
  console.error('Errore: La variabile d\'ambiente FLEEK_PROJECT_ID non è impostata.');
  console.log('Imposta la variabile usando:');
  console.log('export FLEEK_PROJECT_ID="tuo-project-id"');
  process.exit(1);
}

// Esegui l'upload della cartella whitehouse.web3
const directoryPath = path.resolve(__dirname);
console.log('--------------------------------------------');
console.log('Deploy di whitehouse.web3 su Fleek.xyz');
console.log('--------------------------------------------');
console.log(`Directory di deploy: ${directoryPath}`);
console.log(`Project ID: ${process.env.FLEEK_PROJECT_ID}`);
console.log('--------------------------------------------');

uploadDirectory(directoryPath)
  .then((cid) => {
    console.log('\nDeploy completato!');
  })
  .catch((error) => {
    console.error('\nDeploy fallito:', error.message);
    process.exit(1);
  });

# Guida per Collegare il tuo Dominio Seer.eco a IPFS

Questa guida spiega come collegare un dominio registrato tramite Seer Domain (https://sdid.seer.eco/) a un contenuto IPFS ottenuto da Fleek.

## Istruzioni per Seer.eco

### Passo 1: Accedi a Seer.eco
1. Vai a [https://sdid.seer.eco/#/](https://sdid.seer.eco/#/)
2. Connetti il tuo wallet (lo stesso che hai usato per registrare il dominio)
3. Assicurati di essere connesso alla rete blockchain corretta

### Passo 2: Accedi alle impostazioni del tuo dominio
1. Trova e seleziona il tuo dominio `whitehouse.web3` dalla lista dei tuoi domini
2. Cerca la sezione per gestire i record o le impostazioni del dominio

### Passo 3: Cerca l'opzione per contenuto web o IPFS
In Seer Domain, questa opzione potrebbe essere chiamata:
- "Content Hash"
- "IPFS Content"
- "Web Content"
- "Content" o "Contenuto Web"
- Potrebbe anche trovarsi sotto una sezione "Avanzate" o "Impostazioni tecniche"

### Passo 4: Impostazione del contenuto IPFS

#### Se trovi un campo specifico per IPFS:
1. Inserisci il CID ottenuto da Fleek (es. QmYq5hqKbX...)
2. Verifica se il sistema richiede un formato specifico:
   - Solo il CID: `QmYq5hqKbX...`
   - Formato IPFS: `ipfs://QmYq5hqKbX...`
   - Formato completo: `/ipfs/QmYq5hqKbX...`

#### Se trovi un campo per Content Hash:
1. Seleziona il tipo "IPFS" se disponibile
2. Inserisci il CID nel formato richiesto

#### Se non trovi opzioni specifiche per IPFS:
1. Cerca un campo per "URL" o "Redirect"
2. Inserisci l'URL del gateway IPFS: `https://ipfs.io/ipfs/[il-tuo-CID]`

### Passo 5: Salva le modifiche
1. Conferma le modifiche
2. Firma la transazione con il tuo wallet
3. Attendi la conferma sulla blockchain

## Verifica e risoluzione problemi

### Come verificare se il collegamento funziona
1. Usa un browser Web3 come Brave o Opera
2. Digita `whitehouse.web3` nella barra degli indirizzi
3. Se non funziona, prova con un gateway IPFS diretto: `https://ipfs.io/ipfs/[il-tuo-CID]`

### Problemi comuni e soluzioni
1. **Dominio non risolve**:
   - Verifica di aver salvato correttamente le modifiche
   - Attendi 24-48 ore per la propagazione
   - Controlla di usare un browser compatibile con Web3

2. **Formato CID errato**:
   - Verifica quale formato è richiesto da Seer.eco
   - Prova diversi formati se non sei sicuro (solo CID, ipfs://, /ipfs/)

3. **Wallet non riconosciuto**:
   - Assicurati di usare lo stesso wallet con cui hai registrato il dominio
   - Verifica di essere connesso alla rete blockchain corretta

## Contatta il supporto

Se continui a riscontrare problemi:
1. Cerca un'opzione di supporto su Seer.eco
2. Unisciti ai loro canali social o community (Telegram, Discord)
3. Descrivi il problema specificamente, includendo:
   - Il nome del tuo dominio
   - Il CID IPFS che stai cercando di collegare
   - I passaggi che hai già tentato

## Risorse aggiuntive

- Verifica la documentazione ufficiale di Seer.eco per istruzioni specifiche
- Controlla se ci sono guide recenti nella community
- Cerca tutorial video che mostrino il processo passo-passo

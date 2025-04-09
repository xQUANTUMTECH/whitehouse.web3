# Guida Dettagliata per Collegare un Dominio .web3

Questa guida ti mostrerà esattamente come collegare il tuo dominio `whitehouse.web3` al contenuto IPFS dopo il deploy su Fleek.

## Per Unstoppable Domains (.web3)

### Prerequisiti
- Un dominio .web3 acquistato su [Unstoppable Domains](https://unstoppabledomains.com)
- Il CID IPFS ottenuto dopo il deploy su Fleek
- Un wallet con cui hai acquistato il dominio (ad es. MetaMask)

### Passaggi

1. **Accedi a Unstoppable Domains**
   - Vai su [Unstoppable Domains](https://unstoppabledomains.com)
   - Clicca su "Login" nell'angolo in alto a destra
   - Scegli di accedere con il wallet che possiede il tuo dominio

2. **Vai alla Dashboard My Domains**
   - Dopo l'accesso, vai a "My Domains" (I miei domini)
   - Trova e seleziona il tuo dominio `whitehouse.web3`

3. **Configura il contenuto del dominio**
   - Naviga alla scheda "Website" o "Manage" del tuo dominio
   - Cerca la sezione "IPFS Website Hash" o "IPFS Content"

4. **Inserisci il CID IPFS**
   - Incolla il CID ottenuto da Fleek (es. QmYq5hqKbX...)
   - Formato: inserisci solo il CID, senza prefissi `ipfs://` o `https://` 
   - Clicca su "Save" o "Update"

5. **Conferma la transazione**
   - Ti verrà chiesto di firmare una transazione con il tuo wallet
   - Approva la transazione (potrebbe esserci una piccola commissione di rete)
   - Attendi la conferma della transazione sulla blockchain

6. **Verifica (potrebbe richiedere tempo)**
   - La propagazione completa può richiedere fino a 24 ore
   - Puoi verificare immediatamente tramite:
     * Il link `ipfs.io/ipfs/[CID]` fornito da Fleek
     * URL di Fleek (es. yoursite.on.fleek.co)

## Per domini ENS (.eth)

Se stai usando un dominio ENS invece di Unstoppable Domains, segui questi passaggi:

1. **Accedi a ENS App**
   - Vai su [app.ens.domains](https://app.ens.domains)
   - Connetti il wallet che possiede il tuo dominio

2. **Seleziona il tuo dominio**
   - Vai alla sezione "My Accounts"
   - Seleziona il tuo dominio .eth

3. **Imposta il Content Hash**
   - Clicca su "Records"
   - Trova "Content" o "Content Hash"
   - Clicca su "Edit"

4. **Inserisci il CID in formato IPFS**
   - Inserisci il CID nel formato `ipfs://QmYq5hqKbX...` (aggiungi il prefisso `ipfs://`)
   - Salva le modifiche

5. **Conferma la transazione**
   - Firma la transazione con il tuo wallet
   - Attendi la conferma sulla blockchain Ethereum

## Utilizzo di browser Web3

Una volta collegato il tuo dominio, puoi accedervi in questi modi:

### Browser con supporto nativo Web3
- **Brave Browser**: Digita `whitehouse.web3` nella barra degli indirizzi
- **Opera Browser**: Digita `whitehouse.web3` nella barra degli indirizzi

### Browser standard con estensioni
- **Chrome/Firefox con estensione Unstoppable Domains**:
  1. Installa l'estensione [Unstoppable Domains](https://chrome.google.com/webstore/detail/unstoppable-domains/beelkklmblgdljamcmoffgfbdddfpnnl)
  2. Digita `whitehouse.web3` nella barra degli indirizzi

- **Browser con MetaMask**:
  1. Assicurati che MetaMask sia connesso al tuo dominio
  2. Usa l'estensione per risolvere domini Web3

### Gateway IPFS
Se i metodi precedenti non funzionano, usa un gateway IPFS:
- https://ipfs.io/ipfs/[il-tuo-CID]
- https://[il-tuo-CID].ipfs.dweb.link
- https://cloudflare-ipfs.com/ipfs/[il-tuo-CID]

## Risoluzione problemi

Se il dominio non risolve correttamente:

1. **Verifica la propagazione**: La propagazione può richiedere fino a 24 ore
2. **Controlla il CID**: Assicurati di aver inserito il CID corretto
3. **Test con gateway**: Verifica che il contenuto sia accessibile tramite gateway IPFS
4. **Cache del browser**: Prova a cancellare la cache del browser
5. **Wallet corretto**: Assicurati di usare lo stesso wallet con cui hai registrato il dominio

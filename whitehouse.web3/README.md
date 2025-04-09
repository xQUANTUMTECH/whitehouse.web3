# Whitehouse.web3

A provocative web platform supporting free market principles, inspired by Milton Friedman's economic philosophies with subtle nods to modern advocates like Elon Musk.

## Project Overview

This project creates a decentralized website for the `whitehouse.web3` domain that:

- Promotes free market economics and zero tariffs
- Features the economic theories of Milton Friedman
- References the Musk-Navarro dispute about tariffs
- Advocates for economic freedom and decentralization

## Project Structure

```
whitehouse.web3/
├── index.html       # Main HTML file
├── styles.css       # CSS styling
├── assets/          # Image assets
│   ├── logo.png
│   ├── friedman.jpg
│   ├── tariffs.jpg
│   ├── web3.jpg
│   ├── future.jpg
│   └── placeholder.html  # Placeholders for missing images
└── README.md        # This documentation
```

## Content Sections

1. **Home** - Introduction to the concept with references to Friedman and Musk
2. **Friedman** - Highlighting Milton Friedman's economic theories
3. **Tariffs** - Discussion on why tariffs are harmful, with references to the Musk-Navarro debate
4. **Web3** - Explanation of the decentralization philosophy
5. **Vision** - Call to action and future outlook
6. **Deploy** - Technical information about deploying Web3 domains

## How to Deploy to whitehouse.web3

### Requirements

- Ownership of the `whitehouse.web3` domain (purchased from Unstoppable Domains or ENS)
- Access to IPFS hosting service (Pinata, Infura, or Fleek)

### Deployment Steps

1. **Prepare Your Files**
   - Replace placeholder images in the `assets` folder with actual images
   - Make any desired content changes to the HTML/CSS files

2. **Host on IPFS**
   - Upload the entire `whitehouse.web3` folder to IPFS
   - Obtain the CID (Content Identifier) of your upload
   - Example with Pinata:
     - Create an account on pinata.cloud
     - Upload the folder
     - Copy the CID (looks like `QmYq5hqKbX...`)

3. **Link Domain to IPFS**
   - Log in to your domain provider (Unstoppable Domains or ENS)
   - Navigate to your domain management dashboard
   - Set the IPFS hash (CID) for your domain
   - Save changes (changes may take some time to propagate)

4. **Verify Deployment**
   - Use a Web3-compatible browser (like Brave) or browser extensions to visit your domain
   - You can also check via gateway: `https://ipfs.io/ipfs/[your-CID]`

### Accessing Your Web3 Site

To access a .web3 domain:

1. **Direct Access** (Web3 browsers)
   - Brave Browser: Enter `whitehouse.web3` in the address bar
   - Opera Browser: Enter `whitehouse.web3` in the address bar

2. **Browser Extensions**
   - Install MetaMask + Unstoppable Domains extension
   - Type `whitehouse.web3` in your browser

3. **Gateway Access** (Any browser)
   - Use `https://ipfs.io/ipfs/[your-CID]`
   - Or use a service like `https://dweb.link/ipns/whitehouse.web3`

## Maintenance

To update the site:
1. Make your changes to the files
2. Re-upload to IPFS (you'll get a new CID)
3. Update your domain to point to the new CID

## License

This project is freely available for use and modification - in the spirit of true free market principles.

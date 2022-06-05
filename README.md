# Projet avec Web3 et React

## Introduction

Le but de ce TP est de montrer comment communiqué avec la blockchain et intéragir avec celle-ci.

Nous utiliserons les librairies : truffle, web3 et react afin d'y parvenir.

Notre application communiquera avec un smart contract déployé à l'aide de truffle
sur la plateforme Infura et sur une blockchain de test (ropsten).


## Infura : c'est quoi ? 

La suite API d'Infura fournit un accès HTTPS et WebSocket instantané aux réseaux Ethereum et IPFS. En utilisant Infura, vous pouvez vous connecter facilement au Web3 sans avoir à créer et à maintenir votre propre infrastructure. 
Leur service de base est gratuit et fournit tout ce dont vous avez besoin pour commencer à créer une application décentralisée.

## Web3 : C'est quoi ?

Également connu sous le nom de Web 3.0, Web3 est la prochaine phase majeure de l'évolution d'Internet. Tout comme la fondation de la crypto-monnaie, et aidé par les écosystèmes IoT, l'apparition du métavers et l'essor des jetons non fongibles (NFT), cette nouvelle phase de l'internet sera basée sur la décentralisation, l'ouverture et une plus grande utilisation pour les utilisateurs individuels.


## Les étapes pour déployer notre contract


### Installation de Truffle
Truffle est un outil de développement de contrats intelligents et un cadre de test pour les réseaux blockchain.

Installez Truffle globalement à l'aide du gestionnaire de paquets Node.js :

> npm install -g truffle

Ensuite, depuis un répertoire vide, nous allons initialiser un projet truffle avec la commande suivante :

truffle init
Ce qui aura pour effet de créer dans votre répertoire les dossiers suivants :

contracts/: Le répertoire avec le code des contrats
migrations/: Le répertoire pour stocker les migrations de nos contrats (et notamment l’ordre)
test/: le répertoire pour les tests unitaire
truffle-config.js: Le fichier Truffle pour les différents réseaux

Configuration du réseau de développement
La première chose à faire est maintenant de configurer truffle-config.js pour lui indiquer la blockchain ropten et lié notre machine Infura, il faut donc ajouter le network development dans la partie « networks ».

Ajout du réseau ropsten : 

```json
ropsten: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/ID DU PROJET`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
```

On install dotenv pour nous permettre d'utiliser un fichier .env pour stocker des variables d'environnement privées sur notre machine locale.

> npm install dotenv

Le fichier possédera l'id sur projet sur infura et le MNEMONIC.
Cela nous servira à avoir les autorisations nécessaire pour déployer notre contrat sur notre espace infura

INFURA_PROJECT_ID=97bf9cb44b8b4854bc33c4d0dd2cec70
MNEMONIC="split axis exist miracle have input kite stock laugh govern property call"


Maintenant il faut installer : hdwallet-provider

hdwallet-provider est un paquet séparé qui peut signer des transactions pour des adresses dérivées d'un mnémonique de 12 ou 24 mots. 

Par défaut, le hdwallet-provider utilise la première adresse générée à partir du mnémonique, toutefois, ce comportement est configurable.

> npm install @truffle/hdwallet-provider

Après avoir créer notre smart contract dans le dossier prévu à cet effet, nous éxecuterons la commande suivante : 
(Notez que nela nous servira à ajouter l'abi dans notre projet react)

> truffle compile 

puis 

Nous allons créer un script de déploiement :

Les scripts de déploiement des contrats intelligents se trouvent dans le répertoire migrations/ et sont numérotés. 

Dans le répertoire migrations/, j'ai crée un fichier appelé 1_nft.js.

> truffle migrate --network ropsten

Une fois migré, nous pouvons intéragir grace à la librairie Web3 avec notre contract via la blockchain.

Le résultat de la requête se trouve dans le fichier "contract_info" dans le répertoire app-web3 du repo git.


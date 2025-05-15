# Sistema de Gobernanza DAO

![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue.svg)
![Hardhat](https://img.shields.io/badge/Hardhat-2.22.0-orange.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

Implementación de un sistema de gobernanza descentralizado en Ethereum (Red Sepolia), que permite:
- Creación de propuestas
- Votación con tokens ERC20Votes
- Ejecución de propuestas aprobadas
- Gestión de quorum y períodos de votación

## 📋 Contratos

### 1. GovToken (ERC20Votes)
- **Dirección**: `0x7512bd1Ed7E01de55Bf532551D09eF6b4Ef1b9C7`
- **Símbolo**: GVT
- **Suministro inicial**: 1,000,000 tokens
- **Funcionalidad**: 
  - Snapshots de balances
  - Delegación de votos
  - Histórico de transferencias

### 2. MyGovernor
- **Dirección**: `0x0BC9ECa566dC46f58d738d6AE20CeB924a535124`
- **Parámetros**:
  - `votingDelay`: 1 bloque
  - `votingPeriod`: 100 bloques
  - `quorum`: 10% (1000 tokens base 10000)

## 🛠 Requisitos

- [Node.js](https://nodejs.org/) v18+
- [Hardhat](https://hardhat.org/) 
- [MetaMask](https://metamask.io/) (Opcional para interacción manual)
- Cuenta en [Alchemy](https://www.alchemy.com/) (Para despliegue en Sepolia)

## ⚙️ Configuración

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/governance-dapp.git
cd governance-dapp

    Instala dependencias:

bash

npm install

    Configura variables de entorno:

bash

cp .env.example .env

Edita .env con:
env

ALCHEMY_SEPOLIA_URL="TU_ENDPOINT_ALCHEMY"
PRIVATE_KEY="TU_PRIVATE_KEY"

🚀 Despliegue

    Compila los contratos:

bash

npx hardhat compile

    Despliega en Sepolia:

bash

npx hardhat run scripts/deploy.js --network sepolia

    Verifica en Etherscan:

bash

npx hardhat verify --network sepolia 0x0BC9ECa566dC46f58d738d6AE20CeB924a535124 0x7512bd1Ed7E01de55Bf532551D09eF6b4Ef1b9C7

📜 Interacción con los contratos
Scripts disponibles:

    Crear propuesta:

bash

npx hardhat run scripts/createProposal.js --network sepolia

    Votar:

bash

npx hardhat run scripts/vote.js --network sepolia --proposal-id 1 --support true

    Ejecutar propuesta:

bash

npx hardhat run scripts/executeProposal.js --network sepolia --proposal-id 1

Ejemplo de transacción exitosa:
javascript

// Creación de propuesta
const tx = await governor.propose(
  [tokenAddress], // Targets
  [0],            // Values
  [calldata],     // Calldatas
  "Actualizar tasa de interés al 5%"
);

📂 Estructura del proyecto

governance-dapp/
├── contracts/
│   ├── MyGovernor.sol      // Lógica de gobernanza
│   └── GovToken.sol        // Token ERC20Votes
├── scripts/
│   ├── deploy.js           // Script de despliegue
│   ├── createProposal.js   // Crear nueva propuesta
│   └── vote.js             // Votar en propuestas
└── test/                   // Pruebas unitarias

📝 Licencia

Este proyecto está bajo la licencia MIT - ver LICENSE para más detalles.


Este README incluye:
- Badges profesionales para versiones
- Configuración clara paso a paso
- Direcciones reales de tus contratos
- Comandos listos para ejecutar
- Estructura de archivos organizada
- Ejemplos de interacción

Para usarlo:
1. Reemplaza las direcciones de los contratos por las tuyas
2. Actualiza los enlaces de GitHub
3. Añade cualquier detalle específico de tu implementación

// Configuración (Reemplaza con tus valores)
const CONTRACTS = {
  governor: {
    address: "0x0BC9ECa566dC46f58d738d6AE20CeB924a535124",
    abi: [/* Inserta ABI completo de MyGovernor */]
  },
  token: {
    address: "0x7512bd1Ed7E01de55Bf532551D09eF6b4Ef1b9C7", 
    abi: [/* Inserta ABI completo de GovToken */]
  }
}

let provider, signer, governorContract, tokenContract

// Inicializar contratos
async function initContracts() {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    
    governorContract = new ethers.Contract(
        CONTRACTS.governor.address,
        CONTRACTS.governor.abi,
        signer
    )
    
    tokenContract = new ethers.Contract(
        CONTRACTS.token.address,
        CONTRACTS.token.abi,
        signer
    )
}

// Conectar wallet
async function connectWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        await initContracts()
        updateUI()
        loadProposals()
    } catch (error) {
        alert(`Error: ${error.message}`)
    }
}

// Actualizar interfaz
async function updateUI() {
    const accounts = await provider.listAccounts()
    const balance = await tokenContract.balanceOf(accounts[0])
    
    document.getElementById('connectBtn').textContent = `${accounts[0].slice(0,6)}...${accounts[0].slice(-4)}`
    document.getElementById('walletInfo').innerHTML = `
        Voting Power: ${ethers.utils.formatUnits(balance, 18)} GVT
    `
}

// Cargar propuestas
async function loadProposals() {
    try {
        const filter = governorContract.filters.ProposalCreated()
        const events = await governorContract.queryFilter(filter)
        
        const proposalsHTML = events.map(event => `
            <div class="proposal-card">
                <h3>${event.args.description}</h3>
                <div class="vote-section">
                    <button class="vote-btn approve" 
                            onclick="vote(${event.args.proposalId}, true)">
                        👍 Approve
                    </button>
                    <button class="vote-btn reject" 
                            onclick="vote(${event.args.proposalId}, false)">
                        👎 Reject
                    </button>
                </div>
            </div>
        `).join('')
        
        document.getElementById('proposalsList').innerHTML = proposalsHTML
    } catch (error) {
        console.error("Error loading proposals:", error)
    }
}

// Función de votación
async function vote(proposalId, support) {
    try {
        const tx = await governorContract.castVote(proposalId, support)
        await tx.wait()
        alert('Vote submitted successfully!')
        loadProposals()
    } catch (error) {
        alert(`Voting failed: ${error.message}`)
    }
}

// Event listeners
document.getElementById('connectBtn').addEventListener('click', connectWallet)

// Detectar cambios de cuenta
window.ethereum.on('accountsChanged', () => {
    window.location.reload()
})
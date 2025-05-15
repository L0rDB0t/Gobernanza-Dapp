// frontend/app.js
let provider, signer, governorContract, tokenContract;

async function initContracts() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    
    governorContract = new ethers.Contract(
        "0x0BC9ECa566dC46f58d738d6AE20CeB924a535124", 
        GOVERNOR_ABI,
        signer
    );
    
    tokenContract = new ethers.Contract(
        "0x7512bd1Ed7E01de55Bf532551D09eF6b4Ef1b9C7", 
        TOKEN_ABI,
        signer
    );
}

async function connectWallet() {
    if (!window.ethereum) return alert("Instala MetaMask!");
    
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await initContracts();
        
        const accounts = await provider.listAccounts();
        const balance = await tokenContract.balanceOf(accounts[0]);
        
        // Actualizar UI
        document.getElementById('btnText').textContent = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
        document.getElementById('votingPower').textContent = 
            `${ethers.utils.formatUnits(balance, 18)} GVT`;
        
        loadProposals();
    } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
    }
}

async function loadProposals() {
    try {
        const filter = governorContract.filters.ProposalCreated();
        const events = await governorContract.queryFilter(filter);
        
        document.getElementById('totalProposals').textContent = events.length;
        
        const proposalsHTML = events.map(event => `
            <div class="proposal-card">
                <div class="proposal-header">
                    <span class="proposal-id">Propuesta #${event.args.proposalId}</span>
                </div>
                <h4>${event.args.description}</h4>
                <div class="vote-buttons">
                    <button class="vote-btn vote-for" onclick="vote(${event.args.proposalId}, true)">
                        <i class="fas fa-thumbs-up"></i> A Favor
                    </button>
                    <button class="vote-btn vote-against" onclick="vote(${event.args.proposalId}, false)">
                        <i class="fas fa-thumbs-down"></i> En Contra
                    </button>
                </div>
            </div>
        `).join('');
        
        document.getElementById('proposalsList').innerHTML = proposalsHTML;
    } catch (error) {
        console.error("Error cargando propuestas:", error);
    }
}

async function vote(proposalId, support) {
    try {
        const tx = await governorContract.castVote(proposalId, support);
        await tx.wait();
        alert("¡Voto registrado con éxito! 🎉");
        loadProposals();
    } catch (error) {
        console.error("Error votando:", error);
        alert(`Error: ${error.reason || error.message}`);
    }
}

// Event Listeners
document.getElementById('connectButton').addEventListener('click', connectWallet);
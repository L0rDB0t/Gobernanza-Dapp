// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";

contract MyGovernor is Governor, GovernorVotes, GovernorCountingSimple, GovernorSettings {
    constructor(IVotes _token)
        Governor("MyGovernor")
        GovernorVotes(_token)
        GovernorSettings(
            1,     // Voting delay
            100,   // Voting period
            10e18  // Quorum
        )
    {}

    // Funciones override CORRECTAS
    function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingDelay();
    }

    function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingPeriod();
    }

    function quorum(uint256) public pure override returns (uint256) {
        return 10e18;
    }

    // Corrección clave: Añadir override con ambos contratos
    function _quorumReached(uint256 proposalId) 
        internal 
        view 
        override(Governor, GovernorCountingSimple)  // ¡Esta línea corrige el error!
        returns (bool) 
    {
        (uint256 forVotes,,) = proposalVotes(proposalId);
        return forVotes >= quorum(proposalSnapshot(proposalId));
    }

    function _voteSucceeded(uint256 proposalId) 
        internal 
        view 
        override(Governor, GovernorCountingSimple)  // ¡Esta línea corrige el error!
        returns (bool) 
    {
        (uint256 forVotes, uint256 againstVotes,) = proposalVotes(proposalId);
        return forVotes > againstVotes;
    }

    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support,
        uint256 weight,
        bytes memory params
    ) internal override(Governor, GovernorCountingSimple) {
        super._countVote(proposalId, account, support, weight, params);
    }

    function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint256) {
        return super.proposalThreshold();
    }
}
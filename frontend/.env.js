import governorAbi from './abis/Governor.json';
import tokenAbi from './abis/Token.json';

window.CONFIG = {
  GOVERNOR_ADDRESS: "0x0BC9ECa566dC46f58d738d6AE20CeB924a535124",
  TOKEN_ADDRESS: "0x7512bd1Ed7E01de55Bf532551D09eF6b4Ef1b9C7",
  GOVERNOR_ABI: governorAbi.abi,
  TOKEN_ABI: tokenAbi.abi
};
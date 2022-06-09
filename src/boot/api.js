import { TelosEvmApi } from "@telosnetwork/telosevm-js";
import fetch from "node-fetch";

const api = new TelosEvmApi({
    endpoint: process.env.NETWORK_EVM_ENDPOINT,
    chainId: parseInt(process.env.NETWORK_EVM_CHAIN_ID),
    ethPrivateKeys: [],
    telosContract: process.env.NETWORK_EVM_CONTRACT,
    telosPrivateKeys: [],
    fetch
});

export default ({ app }) => {
    app.config.globalProperties.$api = api;
};

export { api };
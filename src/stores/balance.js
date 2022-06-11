import { defineStore } from 'pinia';
import { web3 } from 'boot/web3';
import { slimERC20 } from '../abi/slimERC20';
import { ethers } from "ethers";
import { Cookies } from 'quasar'

// Load ERC20 tokens from ENV variable and Cookies
const ckTokens = Cookies.get('tokens')?.split(",");
const tokens = process.env.EVM_TOKENS.split(",");

export const useBalanceStore = defineStore('balance', {
  state: () => ({
      loading: false,
      balances: [],
      tokens: (ckTokens) ? tokens.concat(ckTokens): tokens,
      account: null
  }),

  getters: {
    getBalances: () => (state) => state.balances,
  },

  actions: {
      /** Gets current stored balance for a token **/
      getBalance(token){
          let amount = 0;
          this.balances.forEach(balance => {
              if(balance.token.symbol === token.symbol){
                  amount = balance.amount;
              }
          })
          return amount;
      },

      isLoading(){
          return this.loading;
      },

      /** Adds a token for balance tracking & saves it to cookie **/
      async addToken(token, cookies){
          if(this.tokens.includes(token) === false){
              this.tokens.push(token);
              let tokens = cookies.get('tokens') + token + ",";
              cookies.set('tokens', tokens);
              let contract = new ethers.Contract(token, slimERC20, web3.signer);
              try {
                  let symbol = await contract.symbol();
                  return await contract.balanceOf(this.account).then(balance => {
                      this.balances.push({
                          amount: ethers.utils.formatEther(balance),
                          token: { symbol: symbol, address: token }
                      });
                      return false;
                  }).catch(e => {
                      return "Invalid token";
                  });
              } catch (e) {
                  return "Invalid token";
              }
          } else {
              return "Token was already added";
          }
      },

      /** Read a token (base currency OR ERC20) balance for a specific account **/
      async readBalance(account, token){
          let balance = 0;
          if(token.symbol === process.env.NETWORK_BASE_CURRENCY_SYMBOL.toString()){
              balance = await web3.provider.getBalance(account);
              balance = ethers.utils.formatEther(balance.toString());
          } else {
              let contract = new ethers.Contract(token.address, slimERC20, web3.provider);
              try {
                  balance = ethers.utils.formatEther(await contract.balanceOf(this.account));
              } catch (e) {
                  
              }
          }
          this.balances.forEach(sBalance => {
              if(sBalance.token.symbol === token.symbol){
                  sBalance.amount = balance;
              }
          });
          return balance;
      },

      /** Read base currency & ERC20 balances for a specific account **/
      async readBalances(account){
          this.account = account;
          let nBalances = [];
          // READ & PUSH BASE CURRENCY BALANCE
          let balance = await web3.provider.getBalance(account);
          nBalances.push({
              amount: ethers.utils.formatEther(balance),
              token: {
                  symbol: process.env.NETWORK_BASE_CURRENCY_SYMBOL.toString()
              }
          });
          // READ & PUSH ERC20 BALANCES
          await Promise.all(this.tokens.map(async(token) => {
              let contract = new ethers.Contract(token, slimERC20, web3.signer);
              try {
                  let symbol = await contract.symbol();
                  let amount = await contract.balanceOf(account);
                  nBalances.push({
                    amount: ethers.utils.formatEther(amount.toString()),
                    token: {
                        symbol: symbol,
                        address: token
                    }
                });
              } catch (e) {
              }
          }));
          nBalances.sort((a,b) => (b.token.symbol !== process.env.NETWORK_BASE_CURRENCY_SYMBOL) ? b.amount - a.amount: 1);
          this.balances = nBalances;
      }
  }
})

# SuperHeroHunter
In Order to use the API key we need to create hash using md5Hash-
How to generate md5 hash?
// first install crypto-js
npm install crypto-js
// now use md5 as below
var MD5 = require("crypto-js/md5");
const CryptoJS=require('crypto-js');


const publicKey='0ad0b6aa0192cbc99a640505bd499a3c';
const privateKey='99036a5773fc130c88572d94fe97308f34a613dd';
const ts=1;
console.log('timestamp',ts);
const st=ts+privateKey+publicKey;
var hash =CryptoJS.MD5(st).toString();

console.log('hash: ',hash)

Fetch Data from the API-
const url=`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`;


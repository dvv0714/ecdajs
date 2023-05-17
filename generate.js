const { secp256k1: secp } = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')


const privateKey = secp.utils.randomPrivateKey()

console.log(`privet key:`, toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey)

console.log(`public key:`, toHex(publicKey));
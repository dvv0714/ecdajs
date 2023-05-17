const express = require('express')
const cors = require('cors')
const { secp256k1: secp } = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')

const app = express()

app.use(express.static('public'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const balances = {
  'db64858675ad8ab65725a2f167220d522e7a5bb808769e2e8c65abba62e01cab': 100,
  '7ea5a097d62b2fb8c3af0ec7935ad85ad19208b7f24977a7b64c80a1dc216879': 75,
  '36038db886d69dd65624ad405f93fcf1b0dfb5a1866ae1c6bd11c6dcf6a1ef73': 50
}




app.get('/balance', (req, res) => {

  res.status(200).json(balances)
})

app.post('/getHash', (req, res) => {
  const { key } = req.body;

  const publicKey = secp.getPublicKey(key)
  // console.log('publicKey: ', toHex(publicKey));
  res.status(200).json(toHex(publicKey))

})

app.post('/transaction', (req, res) => {
  const { amount, recip, prkey, } = req.body;

  if (balances[recip]) {
    balances[prkey] -= +amount
    balances[recip] += +amount

    console.log(balances);

    res.json(balances)
  }
})


app.listen(5000, () => console.log('Server is running'))
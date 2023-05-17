
const inputPrivate = document.getElementById('private-key')
const myBalance = document.getElementById('wallet-balance')
const myPublKey = document.getElementById('public-key')
const btnSend = document.getElementById('transfer')

// =============================

const amount = document.getElementById('amount')
const recip = document.getElementById('recip')
const prkey = document.getElementById('prkey')


inputPrivate.addEventListener('input', async (e) => {
  e.preventDefault()
  const privateKey = e.target.value
  const balances = await getBalances()
  const publicKey = await postPublicKey(privateKey)
  // console.log(publicKey);

  if (privateKey === '' || !balances[privateKey]) {
    myBalance.textContent = `Balance:`
  }

  if (balances[privateKey]) {
    myBalance.textContent = `Balance: ${balances[privateKey]}`
    myPublKey.value = publicKey
    prkey.value = privateKey
  }

})


btnSend.addEventListener('click', async (e) => {
  e.preventDefault()

  // console.log('amount: ', amount);
  // console.log('recipient: ', recip);
  // console.log('privateKey: ', prkey);

  const transaction = {
    amount: amount.value,
    recip: recip.value,
    prkey: prkey.value
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  }

  try {
    const res = await fetch('/transaction', options)

    if (!res.ok) {
      throw new Error('Ошибка отправки данных')
    }

    const data = await res.json()
    console.log(data);
    myBalance.textContent = `Balance: ${data[prkey.value]}`
    resetValue()

  } catch (error) {
    console.error('Ошибка ключа', error)
  }
})

function resetValue() {
  inputPrivate.value = ''
  myPublKey.value = ''
  amount.value = ''
  recip.value = ''
  prkey.value = ''
}


async function postPublicKey(key) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key })
  }
  try {
    const res = await fetch('/getHash', options)

    if (!res.ok) {
      throw new Error('Ошибка запроса ключа')
    }

    const data = await res.json()
    return data

  } catch (error) {
    console.error('Ошибка ключа', error)
  }


}


async function getBalances() {
  try {
    const res = await fetch('/balance')

    if (!res.ok) {
      throw new Error('Ошибка запроса')
    }

    const data = await res.json()
    console.log(data);
    return data
  } catch (error) {
    console.error('Ошибка', error)
  }
}






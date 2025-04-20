//main page elements
const mainContent = document.getElementById('main-content')
const dashboardBtn = document.getElementById('dashboard-btn')
const newTransactionBtn = document.getElementById('new-transaction-btn')
const transactionsBtn = document.getElementById('transactions-btn')
const logoBtn = document.getElementById('logo')

//new transaction elements
const newTransactionContainer = document.getElementById('new-transaction')
const amountInput = document.getElementById('amount-input-transaction')
const descriptionInput = document.getElementById('description-input-transaction')
const submitBtn = document.getElementById('submit-btn')
const clearBtn = document.getElementById('clear-btn')
//transactions elements
const transactionsContainer = document.getElementById('transactions-table-container')
const tableTransactions = document.getElementById('table-transactions')
//dialog window for new trans
const approveDialog = document.getElementById('transaction-approve')
const dialogApproveBtn = document.getElementById('dialog-btn')
const cancelDialogBtn = document.getElementById('cancel-dialog-btn')
//more info dialog
const moreInfoDialog = document.getElementById('more-info-dialog')
const goBackDialogBtn = document.getElementById('go-back-dialog-btn')

let orderNum = 0; //this is for the ID and order of transaction
const transactionsArr = []


function addTransaction(amountValue, descriptionValue, typeOfTrans, identificationUnic) {
  const newTransObj = {
    id:identificationUnic,
    amount:amountValue,
    description:descriptionValue,
    type:typeOfTrans
  }
  transactionsArr.push(newTransObj)
}

function getUnicId() {
  let random = Math.floor(Math.random()*(10000));
  let isUnic = false;

  orderNum += 1;
  let newId = random.toString() + orderNum.toString()
  
  transactionsArr.forEach((transaction) => {
    if (transaction.identificationUnic === newId) {
      isUnic = false
    } else {isUnic = true}
 })
  if (isUnic) {
    return newId

  } else {
    let random2 = Math.floor(Math.random()*(10000));
    newId = random2.toString() + orderNum.toString();
    return newId;
  }
}

function showTransactions(arr) {
  const table = transactionsArr.length;
  
   if (!table) {
    tableTransactions.innerHTML = "No transactions to show."
  } else {
    tableTransactions.innerHTML = `
  <thead>
   <tr>
    <th>ID</th>
    <th>Description</th>
    <th>Amount</th>
    <th>Type</th>
   </tr>
  </thead>
   `
  }  

   arr.forEach((transaction)=>{
    
    const id = transaction.id;
    const description = transaction.description;
    const amount = transaction.amount;
    const type = transaction.type;

    tableTransactions.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${id}</td>
        <td>${description}</td>
        <td>${amount}</td>
        <td>${type}</td>
      </tr>
      `)
   })
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
   const amountValue = amountInput.value;
   const descriptionValue = descriptionInput.value;
   const identificationUnic = getUnicId()
   const typeRadio = document.querySelector('input[type="radio"]:checked')
   const typeOfTrans = typeRadio ? typeRadio.value : null;

   if (amountValue && descriptionValue && typeOfTrans && identificationUnic) {
      approveDialog.showModal()
      dialogApproveBtn.addEventListener('click', ()=>{
        addTransaction(amountValue, descriptionValue, typeOfTrans, identificationUnic)
        approveDialog.close();
        amountInput.value = '';
        descriptionInput.value = '';
      })
      cancelDialogBtn.addEventListener('click', ()=> approveDialog.close())

   } else {
    moreInfoDialog.showModal()
    goBackDialogBtn.addEventListener('click', () => moreInfoDialog.close())
   }
})


//main page btns listeners
transactionsBtn.addEventListener('click', () => {
  transactionsContainer.style.display = 'flex';
  newTransactionContainer.style.display = 'none';
  
  showTransactions(transactionsArr)
}) 

newTransactionBtn.addEventListener('click', ()=>{
  transactionsContainer.style.display = 'none';
  newTransactionContainer.style.display = 'block';
})


//the array is reciving duplicate entrances
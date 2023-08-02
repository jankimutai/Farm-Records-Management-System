   
function handleClickEvent(){
    let addIncomeDate = document.getElementById("dateIncome").value
    let addTransaction = document.getElementById('type').value
    let addIncomeAmount = document.getElementById('amountIncome').value
    let descr = document.getElementById('desc').value
    const formData = {
        date:addIncomeDate,
        transaction: addTransaction,
        description: descr,
        amount:addIncomeAmount,
    }
    let config = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    }
    fetch('http://localhost:3000/transactions',config)
    .then(resp => resp.json())
    .then(data => {
        let p = document.createElement('p')
        p.innerHTML = `date: ${data.date} Transaction: ${data.transaction}Description: ${data.description} Amount: ${`Ksh:`,data.amount} `
      
    })
    .catch(error => {
        let p = document.createElement('')
        p.textContent= error
    }) 

}
function eventClick(){
    let form = document.getElementById('income-form')
    form.addEventListener('submit',handleClickEvent);
}
eventClick();


function fetchTransactions(){
    fetch('http://localhost:3000/transactions')
    .then(resp => resp.json())
    .then(data=>transactions(data)) 
}
fetchTransactions();
function transactions(data){
    let appendIncome = document.getElementById('appendTransaction')
    data.map(i=>{
        //let button = document.createElement('button')
        let transaction = document.createElement("table");
        transaction.className = 'appendJson'
        let button = document.createElement('button')
        button.textContent="Delete Record"
        button.className="delBTN"
    
        transaction.innerHTML = 
        `
        <tr>
        <td>Date: ${i.date}</td>
        <td>Transaction: ${i.transaction}</td>
        <td>Description: ${i.description}</td>
        <td>Amount:  Ksh${i.amount}</td>
        </tr>
        `
        transaction.append(button)
        appendIncome.appendChild(transaction);
        // button.addEventListener('click',()=>{
        //     deleteEvent(i.id);
        // })
    }) 
    function deleteEvent(id){
    fetch(`http://localhost:3000/transactions/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }

    })
    .then(resp => resp.json())
    .then((trans)=> console.log(trans))
}
}








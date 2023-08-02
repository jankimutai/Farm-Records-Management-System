document.addEventListener('DOMContentLoaded',() => {
    const form = document.querySelector('#income-form');
    function handleClickEvent(event){
        event.preventDefault()
        let addIncomeDate = document.getElementById("dateIncome").value;
        let addTransaction = document.getElementById('type').value;
        let addIncomeAmount = document.getElementById('amountIncome').value;
        let descr = document.getElementById('desc').value;
        const formData = {
            date:addIncomeDate,
            transaction: addTransaction,
            description: descr,
            amount:addIncomeAmount,
        };
        let config = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        };
        fetch('http://localhost:3000/transactions',config)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => {
            let p = document.createElement('');
            p.textContent= error;
        });
    
    }

        
    form.addEventListener('submit',handleClickEvent);
    function fetchTransactions(){
        fetch('http://localhost:3000/transactions')// fetch request
        .then(resp => resp.json())
        .then(data=>transactions(data));
    }
    fetchTransactions();
    function transactions(data){
        let appendIncome = document.getElementById('appendTransaction');
        data.map(i=>{
            let transaction = document.createElement("table");
            transaction.className = 'appendJson';
            let button = document.createElement('button');
            button.textContent="Delete Record";
            button.className="delBTN";
        
            transaction.innerHTML = 
            `
            <tr>
            <td>Date: ${i.date}</td>
            <td>Transaction: ${i.transaction}</td>
            <td>Description: ${i.description}</td>
            <td>Amount:  Ksh${i.amount}</td>
            </tr>
            `;
            transaction.append(button);
            appendIncome.appendChild(transaction);
            button.addEventListener('click',()=>{
                deleteEvent(i.id);
            });
        });
        function deleteEvent(id){
        fetch(`http://localhost:3000/transactions/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
    
        })
        .then(resp => resp.json())
        .then((transaction)=> alert('deleted'));
    }
    };
    function handleContact(){
        let name = document.getElementById('nameContact').value
        let email = document.getElementById('emailContact').value
        let message = document.getElementById('messageContact').value
        const contact = {
            name:name,
            email:email,
            message:message
        }
        let config = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(contact)
        };
        fetch('http://localhost:3000/contact-messages', config)
        .then(res => res.json())
        .then(data=>console.lo(data));
    }
    let formContact = document.getElementById('contact');
    formContact.addEventListener('submit',handleContact);
    let inc = document.getElementById('income')
    fetch('http://localhost:3000/transactions')
    .then(response => response.json())
    .then(data => {
    let incomeSum = 0;
    data.map(transaction => {
      if (transaction.transaction === 'INCOME') {
        let number = parseInt(transaction.amount);
        incomeSum += number;
        console.log(incomeSum);
      }
    });
    const incomeSumElement = document.createElement('div');
    incomeSumElement.textContent = `Total income: Ksh${incomeSum}`;
    inc.appendChild(incomeSumElement);
    let expe = document.getElementById('expense')
    fetch('http://localhost:3000/transactions')
    .then(response => response.json())
    .then(data => {
    let expenseSum = 0;
    data.map(transaction => {
      if (transaction.transaction === 'EXPENSE') {
        let number = parseInt(transaction.amount);
        expenseSum += number;
        console.log(expenseSum);
      }
    });
    const expenseSumElement = document.createElement('div');
    expenseSumElement.textContent = `Total income: Ksh${expenseSum}`;
    expe.appendChild(expenseSumElement);
    let bal = document.getElementById('balance');
    const balElement = document.createElement('div');
    let balance = parseInt(incomeSum) - (expenseSum);
    balElement.textContent = `Balance : ${balance}`;
    console.log(balElement)
    bal.appendChild(balElement);
  });
  });
  
  

})
  


document.addEventListener('DOMContentLoaded',(event) => {
  event.preventDefault();
  const formIncome = document.getElementById('income-form');
    function handleClickEvent(event) {
        event.preventDefault();
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
    if (formIncome) {
      formIncome.addEventListener('submit', handleClickEvent);
      formIncome.reset();
      location.reload();
    }
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
            if(appendIncome){
              appendIncome.appendChild(transaction);

            }
            
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
    function handleLogin(){
      let email1 = document.getElementById("email").value;
      let password1 = document.getElementById('pass').value;
       // Create a JSON object with the credentials
      const authenticate = {
        email:email1,
        password:password1
      }
       // Create a fetch configuration object
      const configLogin = {
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body:JSON.stringify(authenticate)
        
      }
      // Make the fetch request
      fetch('http://localhost:3000/users',configLogin)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          console.log('Login successful!');
        } else {
          console.log('Login failed.');
        }
      });;
    }
      let formLogin = document.getElementById('login-form');
      if(formLogin){
        formLogin.addEventListener('submit',handleLogin);
      }
  
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
        .then(data=>console.log(data));
    }
    let formContact = document.getElementById('contact');
    if(formContact){
      formContact.addEventListener('submit',handleContact);
    }
    
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
    incomeSumElement.textContent = `Total income: Ksh ${incomeSum}`;
    if(inc){
      inc.appendChild(incomeSumElement);
    }
    
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
    expenseSumElement.textContent = `Total Expenses: Ksh ${expenseSum}`;
    if(expe){
      expe.appendChild(expenseSumElement);
    }
    
    let bal = document.getElementById('balance');
    const balElement = document.createElement('div');
    let balance = parseInt(incomeSum) - (expenseSum);
    balElement.textContent = `Balance : Ksh ${balance}`;
    console.log(balElement);
    if(bal){
      bal.appendChild(balElement);
    }
    //generating a chart
    const ctx = document.getElementById('myChart')
    if(ctx){
      ctx.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Income', 'Expense'],color:'white',
          datasets: [{
            label: 'Total Amount',
            data: [incomeSum, expenseSum],
            backgroundColor: ["#1C4E80","#EA6A47"
              //'rgba(54, 162, 235, 0.2)',
              //'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: ['none'
              //'rgba(54, 162, 235, 1)',
              //'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              color:'white',
              backgroundColor:'white',
            },
            title: {
              display: true,
              text: 'Income vs Expense',color:'white',
              font: {
                size: '30pt',
                weight: 'bold',
                family: 'Arial, sans-serif',
              }
            },
          },
        },
      });
    }
  });
  });
})
  


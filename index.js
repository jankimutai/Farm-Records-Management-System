function addEventListener1(){
    let button = document.getElementById("btnIncome")
    button.addEventListener('click',handleClickEvent);
}
addEventListener1();
function handleClickEvent(e){
    e.preventDefault()
    let addIncomeDate = document.getElementById("dateIncome").value
    let addIncomeDescription = document.getElementById('descIncome').value
    let addIncomeAmount = document.getElementById('amountIncome').value
    let appendIncome = document.getElementById('appendIncomes')
    let form = document.getElementById('income-form')
    // let addInc = document.createElement('div')
    // addInc.innerHTML = 
    // `<p>DATE:${addIncomeDate} Description:${addIncomeDescription}Amount:${addIncomeAmount }</p>`
    // appendIncome.appendChild(addInc);   
    form.reset()
}
function addEventListenerContactUs(){
    let buttonContact = document.querySelector('handleContact"')
    buttonContact.addEventListener('click', handleClickEventContact)
}

function handleClickEventContact(e){
    e.preventDefault()
    let email = document.getElementById('email')
    let name = document.getElementById('name')
    let message = document.getElementById('message')
    fetch('http://localhost:3000/contact-messages')

}
addEventListenerContactUs()
function saveLoginDetails(){
    let email = document.querySelector('#emailogin').value;
    let password =document.querySelector('#pass').value;
    const dataObject = {
        email: email,
        password: password
    };
    fetch('http://localhost:3000/login-pass')


}

//Aqui estão as contantes

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const genero = document.getElementById("genero");
const data = document.getElementById("data");
const termos = document.getElementById("termos");
const cpf = document.getElementById("cpf");
const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const numero = document.getElementById("numero");
const emailRegex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
const numeroRegex = /^\d+$/;
/*const num = documento.getElementById("num");*/

form.addEventListener("submit", (event) => {
   event.preventDefault();

   checkForm();
});

cpf.addEventListener("keypress", () => {
    const cpfLength = cpf.value.length

    if(cpfLength === 3 || cpfLength === 7){
        cpf.value += "."
    }else if(cpfLength === 11){
        cpf.value += "-"
    }

})

numero.addEventListener("keypress", () => {
    const numeroLength = numero.value.length

    if(numeroLength === 0 ){
        numero.value += "("
    }else if(numeroLength === 3){
        numero.value += ")"
    }else if(numeroLength === 9){
        numero.value += "-"
    }
    

})

email.addEventListener("blur", () => {
    checkInputEmail();
})

username.addEventListener("blur", () => {
    checkInputUsername();
})

password.addEventListener("blur", () => {
    checkInputPassword();
})

cpf.addEventListener("blur", () => {
    checkInputCPF();
})

passwordConfirmation.addEventListener("blur", () => {
    checkInputPasswordConfirmation();
})

genero.addEventListener("blur", () => {
    checkInputGenero();
})

data.addEventListener("blur", () => {
    checkInputData();
})

rua.addEventListener("blur", () => {
    checkInputRua();
})

bairro.addEventListener("blur", () => {
    checkInputBairro();
})

cidade.addEventListener("blur", () => {
    checkInputCidade();
})

/*num.addEventListener("blur", () => {
    checkInputNum ();
})*/

numero.addEventListener("blur", () => {
    checkInputNumero();
})

cep.addEventListener("blur", () => {
    checkInputCep();
    
    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        .then(reposta => reposta.json())
        .then(data => {
            rua.value = data.logradouro;
            bairro.value = data.bairro;
            cidade.value = data.uf;
        });
})

function checkInputUsername(){
    const usernameValue = username.value;
    if(usernameValue === "" ){
        errorInput(username, "Digite seu nome!");
    }else{
        const formItem = username.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputEmail(){
    if(emailRegex.test(email.value)){
        const formItem = email.parentElement;
        formItem.className = "form-content";
    }else{
        errorInput(email, "Digite um email válido!");
    }

}

function checkInputPassword(){
    const passwordValue = password.value;
    if (passwordValue === ""){
        errorInput(password, "Digite uma senha válida!")
    }else if(passwordValue.length < 8){
        errorInput(password, "A senha precisa ter no mínimo 8 caracteres!")
    }else{
        const formItem = password.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputPasswordConfirmation(){
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfirmation.value;

    if(confirmationPasswordValue === ""){
        errorInput(passwordConfirmation, "A confirmação de senha é obrigatória!");
    }else if(confirmationPasswordValue !== passwordValue){
        errorInput(passwordConfirmation, "As senhas não são iguais!");
    }else{
        const formItem = passwordConfirmation.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputCPF(){
    const cpfValue = cpf.value;
    if (cpfValue === "") {
        errorInput(cpf, "Digite seu CPF!");
    } else if (!validateCPF(cpfValue)) {
        errorInput(cpf, "CPF inválido!");
    } else {
        const formItem = cpf.parentElement;
        formItem.className = "form-content";
    }
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    let sum = 0;
    let rest;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}


function checkInputCep(){
    const cepValue = cep.value;
    if (cepValue === ""){
        errorInput(cep, "Coloque o seu CEP")
    }else{
        const formItem = cep.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputRua(){
    const ruaValue = rua.value;
    if (ruaValue === ""){
        errorInput(rua, "Coloque o seu endereço")
    }else{
        const formItem = rua.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputCidade(){
    const cidadeValue = cidade.value;
    if (cidadeValue === ""){
        errorInput(cidade, "Coloque a sua cidade")
    }else{
        const formItem = cidade.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputBairro(){
    const bairroValue = bairro.value;
    if (bairroValue === ""){
        errorInput(bairro, "Coloque o seu bairro")
    }else{
        const formItem = bairro.parentElement;
        formItem.className = "form-content";
    }
}

/*function checkInputNum(){
    const numValue = num.value;
    if (numValue === ""){
        errorInput(bairro, "Coloque o seu bairro")
    }else{
        const formItem = num.parentElement;
        formItem.className = "form-content";
    }*/




function checkInputNumero(){
    const numeroValue = numero.value;
    if (numeroValue === ""){
        errorInput(numero, "Coloque o seu número")
    }else{
        const formItem = numero.parentElement;
        formItem.className = "form-content";
    }
}

numero.addEventListener("number", (event) => { 
    const botoClicado = event.target;
  
    if (botoClicado.classList.contains('diminuir')) {
      
    } else if (botoClicado.classList.contains('aumentar')) {
    }
  
    event.preventDefault(); // Impedir o comportamento padrão das setas
  });

function checkInputData(){
    const dataValue = data.value;
    if(dataValue === ""){
        errorInput(data, "Coloque a sua data de nascimento!");
    }else{
        const formItem = data.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputGenero(){
    const generoValue = genero.value;
    if (generoValue === ""){
        errorInput(genero, "Selecione o seu gênero!")
    }else{
        const formItem = genero.parentElement;
        formItem.className = "form-content";
    }
}

function checkBoxTermos(){
    if(termos.checked){
        const formItem = termos.parentElement;
        formItem.className = "form-content"
    }else{
        errorInput(termos, "Aceite os termos para continuar");
    }
}

function checkForm(){
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation();
    checkInputData();
    checkBoxTermos();
    checkInputCPF();
    checkInputCep();
    checkInputRua();
    checkInputBairro();
    checkInputCidade();
    checkInputGenero();
    checkInputNumero();
    //checkInputNum();

    const formItems = form.querySelectorAll(".form-content")

    const isValid = [...formItems].every( (item) => {
        return item.className === "form-content"
    });

    console.log(isValid);

    if(isValid){
        alert("FORMULÁRIO ENVIADO COM SUCESSO")
    }
}

function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");

    textMessage.innerText = message;

    formItem.className = "form-content error";
}


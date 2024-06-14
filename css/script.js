const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const genero = document.getElementById("genero");
const data = document.getElementById("data");
const termos = document.getElementById("termos");
const cpf = document.getElementById("cpf");

form.addEventListener("submit", (event) => {
   event.preventDefault();

   checkForm();
});

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
});

passwordConfirmation.addEventListener("blur", () => {
    checkInputPasswordConfirmation();
})

genero.addEventListener("blur", () => {
    checkInputGenero();
})
data.addEventListener("blur", () => {
    checkInputData();
})

function checkInputUsername(){
    const usernameValue = username.value;

    console.log(usernameValue);

    if(usernameValue === ""){
        errorInput(username, "Digite seu nome!");
    }else{
        const formItem = username.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputEmail(){
    const emailValue = email.value;
    if (emailValue === ""){
        errorInput(email, "Digite um email válido!");
    }else{
        const formItem = email.parentElement;
        formItem.className = "form-content";
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

function checkInputCPF() {
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

function checkInputGenero(){
    const generoValue = genero.value;
    if (generoValue === ""){
        errorInput(genero, "Selecione o seu gênero!")
    }else{
        const formItem = genero.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputData(){
    const dataValue = data.value;
    if(dataValue === ""){
        errorInput(data, "Coloque a sua data de nascimento!");
    }else{
        const formItem = data.parentElement;
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
    checkInputGenero();
    checkInputData();
    checkBoxTermos();
    checkInputCPF();
    
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


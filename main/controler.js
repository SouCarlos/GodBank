import { Usuarios } from "./user.js"
export class Controler {
    constructor(User, Count, event, App){
        if(Usuarios.some(objeto => objeto.name === User.value && Usuarios.some(objeto => objeto.conta === Count.value))){
            const name = User.value
            const url = event.target.getAttribute("data-link")
            // localStorage.setItem("username", JSON.stringify(name))
            new Router(App, url, name)

        }
            else  {alert("usuario nao existe")
        }
    }} 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class Router {
    constructor(App, path, name){
        this.route(App, path, name)
    }
    route(App, url, name){
        const path = url || "/"
        window.history.pushState({}, "" , path)
        this.togleRoute(App, path, name) 
        
    }

    routes = {
    "/": "/pages/login.html",
    "/home" : "/pages/home.html",
    "/create":"/pages/create.html",
}

togleRoute(App, path, name){ 
    fetch(this.routes[path]).then(response => response.text()).then(html => {
    App.innerHTML = html;
    if(path == "/"){
        this.Users(App, html)
     } else {
          
    new ManegerCout(name)
    }
    }).catch(err => console.error('Falha ao buscar a página:', err));

       
    }
    
    Users(App, html){
        const Form = document.querySelector(".Form")
        const User = document.querySelector("#user")
        const Count = document.querySelector("#count")
    
        Form.addEventListener("click", (event) =>  {
        event.preventDefault();
        new Controler(User,Count, event, App, html)
        
        })
}}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => {
    const savedState = localStorage.getItem('appState');
    const App = document.querySelector('.app'); // Assumindo que App é um elemento com id="app"
    
    if (savedState) {
        const state = JSON.parse(savedState);
        new Router(App, state.path);
        localStorage.removeItem('appState');
    } else {
        new Router(App, window.location.pathname);
    }
});

// Event listener para salvar o estado antes de recarregar
window.addEventListener('beforeunload', () => {
    const currentPath = window.location.pathname;
    const state = { path: currentPath };
    localStorage.setItem('appState', JSON.stringify(state));
});

class ManegerCout{
    constructor(name){
        const user = name
        // || JSON.parse(localStorage.getItem("username"))
        
       
        const userLogado = this.Count(user)  
        const links = document.querySelectorAll("a")
        for (let i = 0; i < links.length && i < 4; i++) {
            links[i].addEventListener("click", (event) => {
                event.preventDefault()
                const opcao = event.target.getAttribute("data-opcao")
                this.transaction(opcao, userLogado)
            })}
            this.updatePerfil(userLogado)
        // this.updatesaldo(userLogado)   
        
    }
       
    

    updatePerfil(user) {
        const ImgPerfil = document.querySelector(".ImgPerfil")
        const NamePerfil = document.querySelector(".NamePerfil")
        const UserSaldo = document.querySelector("#valor")
        ImgPerfil.setAttribute("src", `../img/${user.name}.jpg`)
        NamePerfil.innerHTML= `${user.name}`
        UserSaldo.innerHTML = `${user.saldo} $`
        // this.Count(user.name)        
    }

    updatesaldo( SaldoAtual){
        
    }
    Count(user){
        const conta = (user) => Usuarios.find(nuberCount => nuberCount.name === user) || JSON.parse(localStorage.getItem("userlogado"))
        const contauser = conta(user)
        console.log(contauser)
        localStorage.setItem("userlogado", JSON.stringify(contauser))
        return conta(user)
        
    }
    // else{
    //     conta = JSON.parse(localStorage.getItem("userlogado"))
    //     return conta
    // }
        
        
    
    transaction(opcao, userLogado){
        var saldo = 0
        var saldoAtual = 0
        switch(opcao){
            case "depositar":
                saldo = parseFloat(prompt("quanto deseja depositar"))
                saldoAtual = userLogado.saldo + saldo
                userLogado.saldo = saldoAtual
                alert("deposito realizado com sucesso")
                this.saveUserUpdate(userLogado)
                this.updatePerfil(userLogado)
            break
            case "sacar":
                saldo = parseFloat(prompt("quanto deseja sacar"))
                saldoAtual = userLogado.saldo - saldo
                if(saldoAtual < 0) {
                    alert("saldo insuficiente")
                    console.log(saldoAtual)
                    return
                }else {
                    userLogado.saldo = saldoAtual
                    console.log(saldoAtual)
                    this.updatesaldo(userLogado)
                    alert("saque realizado com sucesso")
                    this.saveUserUpdate(userLogado)
                    this.updatePerfil(userLogado)
                }
            break
            case "transferir":
            console.log("aqui irei transferir")
            break
        }
    }
    saveUserUpdate(userLogado){
        localStorage.setItem("userlogado", JSON.stringify(userLogado))  
    }
}
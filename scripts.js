function salvartarefas() {
    let tarefas = []

    document.querySelectorAll("ul li").forEach(li => {
        let span = li.querySelector(".texto")
        if (!span) return

        tarefas.push({
            texto: span.innerText,
            concluida: span.classList.contains("concluida")
        })
    })
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function criarLi(texto, concluida) {
    let li = document.createElement("li")
    li.innerHTML = '<span class="texto">' + texto + '</span> <span onclick="concluirtarefa(this)">✅</span> <span onclick="deletartarefa(this)">❌</span>'

    if (concluida) {
        li.querySelector(".texto").classList.add("concluida")
    }

    document.querySelector("ul").appendChild(li)
}

function adicionartarefa() {
    let input = document.querySelector("input").value
    if (input.trim() === "") return 

    criarLi(input, false)

    document.querySelector("input").value = ""
    salvartarefas()
}

function deletartarefa(li) {
   li.parentElement.remove()
    salvartarefas()
}

function concluirtarefa(check) {
    check.parentElement.querySelector(".texto").classList.toggle("concluida")
    salvartarefas()
}

function carregartarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    tarefas.forEach(t => criarLi(t.texto, t.concluida))
}

carregartarefas()
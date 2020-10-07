module.exports = (app) => {
    app.get("/login", app.controllers.usuariosController.logar)
    app.post("/login", app.controllers.usuariosController.login)
    app.get("/usuarios", app.controllers.usuariosController.listarUsuarios)
    app.get("/editar/usuario/:id", app.controllers.usuariosController.consultarPorId)
    app.get("/adicionar/usuario", app.controllers.usuariosController.cadastrar)
    app.post("/adicionar/usuario", app.controllers.usuariosController.adicionar)
    app.post("/editar/usuario/:id", app.controllers.usuariosController.atualizar)
    app.post("/apagar/usuario/:id", app.controllers.usuariosController.excluir)
}
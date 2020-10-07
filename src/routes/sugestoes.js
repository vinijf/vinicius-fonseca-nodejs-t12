module.exports = (app) => {
    app.get("/sugestoes", app.controllers.sugestoesController.Index)
    app.get("/adicionar/sugestao", app.controllers.sugestoesController.Create)
    app.post("/adicionar/sugestao", app.controllers.sugestoesController.Store)
    app.get("/editar/sugestao/:id", app.controllers.sugestoesController.Edit)
    app.post("/editar/sugestao/:id", app.controllers.sugestoesController.Update)
    app.post("/apagar/sugestao/:id", app.controllers.sugestoesController.Destroy)
}
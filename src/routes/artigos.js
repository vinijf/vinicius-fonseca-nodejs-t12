module.exports = (app) => {
    app.get("/", app.controllers.artigosController.Index)
    app.get("/artigo/:id", app.controllers.artigosController.Show)
    app.get("/adicionar/artigo", app.controllers.artigosController.Create)
    app.post("/adicionar/artigo", app.utils.uploader.single("imagem"), app.controllers.artigosController.Store)
    app.get("/editar/artigo/:id", app.controllers.artigosController.Edit)
    app.post("/editar/artigo/:id", app.utils.uploader.single("imagem"), app.controllers.artigosController.Update)
    app.post("/apagar/artigo/:id", app.controllers.artigosController.Destroy)
}
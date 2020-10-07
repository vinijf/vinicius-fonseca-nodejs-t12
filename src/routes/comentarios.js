module.exports = (app) => {
    app.post("/comentario/:artigo_id", app.controllers.comentariosController.Store)
}
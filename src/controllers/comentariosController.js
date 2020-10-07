const fs = require('fs')

module.exports = function(app) {

    let comentariosModel = app.db.mongoose.model("Comentarios")

    return {
        Store: (req, res) => {
            try {
                let comentario = new comentariosModel(req.body)
                comentario.artigo_id = req.params.artigo_id
                comentario.save((err) => {
                    if(err)
                        res.status(500).send(`Erro ao inserir: ${err}`)
                    else
                        res.redirect(`/artigo/${comentario.artigo_id}`);
                });
            } catch (error) {
                res.send("Eror ao adicionar comentário: " + error);
            }
        },
    }
}
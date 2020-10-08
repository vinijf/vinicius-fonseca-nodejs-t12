const fs = require('fs')
const artigos = require('../routes/artigos')

module.exports = function(app) {

    let artigosModel = app.db.mongoose.model("Artigos")

    let comentariosModel = app.db.mongoose.model("Comentarios")

    return {
        Index: function(req, res) {

            let search = req.body.search
            artigosModel.find({
                titulo: new RegExp(search)
            })
            .then((artigos) => {
                res.render("listar_artigos", {artigos})
            })
            .catch((err) => res.status(500).send(err))
        },

        Create: function(req, res) {
            res.render("adicionar_artigo")
        },

        Store: (req, res) => {
            try {
                let artigo = new artigosModel(req.body)
                artigo.imagem = req.file.filename
                artigo.save((err) => {
                    if(err)
                        res.status(500).send(`Erro ao inserir: ${err}`)
                    else
                        res.redirect('/');
                });
            } catch (error) {
                res.send("Eror ao adicionar artigo: " + error);
            }
        },
        Show: async (req, res) => {
            try {
                let id = req.params.id
                let comentarios = await comentariosModel.find({artigo_id: req.params.id})
                let artigo = await artigosModel.findById(id)
                if(artigo)
                res.render("ver_artigo", {artigo, comentarios})
                else
                    res.status(404).end();
            } catch (error) {
                res.status(404).send();
            }
        },

        Edit: async (req, res) => {
            try {
                let id = req.params.id
                let artigo = await artigosModel.findById(id)
                if(artigo)
                res.render("editar_artigo", {artigo})
                else
                    res.status(404).end();
            } catch (error) {
                res.status(404).send();
            }
        },

        Update: async (req, res) => {
            let id = req.params.id
            let artigo = req.body

            if(req.file){
                let artigoDB = await artigosModel.findById(id)
                if(artigoDB.imagem) {
                    fs.unlinkSync("uploads/" + artigoDB.imagem)
                }
                artigo.imagem = req.file.filename
            }
            artigosModel.findByIdAndUpdate(id, { $set: artigo } , (err) => {
                if(err)
                    res.status(500).send(`Erro ao atualizar artigo: ${err}`)
                else
                    res.redirect("/")
            })
        },
        Destroy: (req, res) => {
            let id = req.params.id
            artigosModel.findByIdAndRemove(id, (err) => {
                if(err)
                    res.status(500).send(`Erro ao excluir artigo: ${err}`)
                else
                    res.redirect("/")
            })
        }
    }
}
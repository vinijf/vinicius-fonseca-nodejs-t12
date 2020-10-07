const fs = require('fs')
const sugestoes = require('../routes/sugestoes')

module.exports = function (app) {

    let sugestoesModel = app.db.mongoose.model("Sugestoes")

    return {
        Index: function (req, res) {

            let search = req.body.search
            sugestoesModel.find({
                leitor: new RegExp(search)
            })
                .then((sugestoes) => {
                    res.render("listar_sugestoes", { sugestoes })
                })
                .catch((err) => res.status(500).send(err))
        },

        Create: function (req, res) {
            res.render("adicionar_sugestao")
        },

        Store: (req, res) => {
            try {
                let sugestao = new sugestoesModel(req.body)

                sugestao.save((err) => {
                    if (err)
                        res.status(500).send(`Erro ao inserir: ${err}`)
                    else
                        res.redirect('/sugestoes');
                });
            } catch (error) {
                res.send("Eror ao adicionar sugestão: " + error);
            }
        },

        Edit: async (req, res) => {
            try {
                let id = req.params.id
                let sugestao = await sugestoesModel.findById(id)
                if (sugestao)
                    res.render("editar_sugestao", { sugestao })
                else
                    res.status(404).end();
            } catch (error) {
                res.status(404).send();
            }
        },

        Update: async (req, res) => {
            let id = req.params.id
            let sugestao = req.body

            sugestoesModel.findByIdAndUpdate(id, { $set: sugestao }, (err) => {
                if (err)
                    res.status(500).send(`Erro ao atualizar sugestão: ${err}`)
                else
                    res.send("sugestao atualizado com sucesso")
            })
        },
        Destroy: (req, res) => {
            let id = req.params.id
            sugestoesModel.findByIdAndRemove(id, (err) => {
                if (err)
                    res.status(500).send(`Erro ao excluir sugestão: ${err}`)
                else
                    res.redirect("/sugestoes")
            })
        }
    }
}
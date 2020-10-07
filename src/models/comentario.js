module.exports = app => {
    let ComentariosSchema = app.db.mongoose.Schema({
        artigo_id: String,
        autor: String,
        texto: String
    })
    
    app.db.mongoose.model("Comentarios", ComentariosSchema);
}
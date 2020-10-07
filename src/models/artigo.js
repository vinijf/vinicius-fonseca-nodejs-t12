module.exports = app => {
    let ArtigosSchema = app.db.mongoose.Schema({
        imagem: String,
        titulo: String,
        autor: String,
        texto: String
    })
    
    app.db.mongoose.model("Artigos", ArtigosSchema);
}
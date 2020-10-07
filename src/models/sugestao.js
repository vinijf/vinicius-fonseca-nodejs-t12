module.exports = app => {
    let SugestoesSchema = app.db.mongoose.Schema({
        leitor: String,
        sugestao: String
    })
    
    app.db.mongoose.model("Sugestoes", SugestoesSchema);
}
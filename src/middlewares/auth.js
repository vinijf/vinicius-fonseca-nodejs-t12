module.exports = app => {
    app.use((req, res, next) => {
        if(req.originalUrl == "/login" || req.originalUrl == "/adicionar/usuario"){
            next()
        } else {

            let token =  req.cookies['token']
            
            if(!token)
                res.status(401).send("Faltou enviar o token")
            else {
                app.get("jwt").verify(token, process.env.JWT_CHAVE_PRIVADA, (err, decoded) => {
                    if(err)
                        res.status(401).send("Token inválido")
                    else { 
                        req.decoded = decoded
                        next();
                    }
                })
            }
        }
    })
}
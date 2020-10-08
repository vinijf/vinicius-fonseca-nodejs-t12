module.exports = app => {
    app.use((req, res, next) => {
        if(req.originalUrl == "/login" || req.originalUrl == "/adicionar/usuario"){
            next()
        } else {
            var get_cookies = function(req) {
                var cookies = {};
                req.headers && req.headers.cookie.split(';').forEach(function(cookie) {
                  var parts = cookie.match(/(.*?)=(.*)$/)
                  cookies[ parts[1].trim() ] = (parts[2] || '').trim();
                });
                return cookies;
              };
            let token = get_cookies(req)['token']

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
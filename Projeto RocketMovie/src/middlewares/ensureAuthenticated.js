const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function  ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization; // pegamos o token do header

    if (!authHeader){ // verificamos se ele esta informado
        throw new AppError("JWT Token não informado", 401);
    }

    const [, token] = authHeader.split(" "); // usamos o split para quebrar o texto pelos espaços

    // armazenamos na posicão 1 do array o token, ja colocando seu nome

    //Tratamento de execessos com o try

    try {
       const {sub: user_id} =  verify(token, authConfig.jwt.secret);
       // a função verify verifica se e um jwt e se ele e um token valido
       // o sub e o conteudo que está armazenado no token, utilizamos um alias trocando para user_id
      
       request.user = {
        id: Number(user_id),
       };

       // criamos uma propriedade id no objeto user, convertendo o user_id em numero e despejando
       // no id.

       return next(); // chamamos a proxima função ao lado do middleware

    } catch (error) {
        // caso o token seja invalido lançamos essa execssão.
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;
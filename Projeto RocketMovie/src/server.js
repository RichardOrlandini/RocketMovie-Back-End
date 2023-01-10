require("express-async-errors"); 

const express = require("express");
const routes = require('./routes');
const AppError = require('./utils/AppError');

const app  = express();
app.use(express.json()); 

app.use(routes);

//Tratamento de erros:
app.use(( error, request, response, next) => { //
    if(error instanceof AppError){ //Se a instancia dele for de uma execessão de appError:
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    console.error(error);
    //Caso o erro não seja do cliente 
    return response.status(500).json({
        status : "error",
        message: "Internal server error",
    });
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port localhost:${PORT}`));
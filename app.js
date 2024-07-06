const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");

const  {connectDB}= require('./db')

const app = express();
connectDB()

app.get('/', (req, res) => res.send('Welcome to my app'))


module.exports = app 


async function start  () {

    const apolloServer = new ApolloServer({
        // typeDefs: typeDefs,  Puede ser de esta manera  

        typeDefs, //Definimos el tipo de Consulta Query(solo ver) y Mutants(modificar)
        resolvers //la ejecucion del tipo de consulta y el resultado 
    })

    // Inicio el servidor apollo 
    await apolloServer.start()

    // uso como midellware express
    apolloServer.applyMiddleware({app})
    
    // deve estar despues de iniciar servidor a graphql
    app.use('*', (req,res) => res.status(404).send('not found'))


    app.listen(3000,() => {
        console.log('Server on port', 3000)
    }) 
}

start()
// TODOS LOS DATOS QUE NOS DEVOLVERAN AL REALLIZAR LAS CONSULTAS
const { gql } = require("apollo-server-express");


const  typeDefs = gql`  

    type Task {
        id:ID
        title: String
        description: String
    }

    # lo que devolvera son en este caso el String y el arreglo  de tipo Task
    type Query {
        hello: String
        getAllTasks: [Task] #tipo sera cada uno un Task
        getTask(id: ID): Task
    }
    input TaskInput{
        title: String,
        description: String 
    }
    type Mutation {
        # el tipo de parametro sera 
        createTask(task: TaskInput!) : Task
        #para que sea requerido = !
        deleteTask(id:ID!):String
        updateTask(id: ID! , task: TaskInput) : Task
    }


`

module.exports = {
    typeDefs
}
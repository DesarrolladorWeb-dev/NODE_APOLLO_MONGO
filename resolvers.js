// que es lo que quiero que hagan cuando se realizen las consultas
const Task = require('./models/Task')

const resolvers = {
    Query :  {
        hello: () => 'Hellow woed',
        getAllTasks: async ()  => {   //debe ser el mismo nombre
            const tasks = await Task.find()
            return tasks
        },
        // de esta manera no uso arg y uso la destructuracion {} y sacar id 
        getTask :  async (_, {id}) => {
            const task = await Task.findById(id)
            return task
        }
    },
    Mutation : {
        // createTask : (parent, args, context, info) => {
        createTask : async (_, args) => {
            const {title , description } = args.task;
            const newTask = new Task({title , description})
            // console.log(newTask)
            await newTask.save()
            return newTask
        },
    async deleteTask(_, {id}){
        await Task.findByIdAndDelete(id)
        return 'TASK DELETED'
    },
    async updateTask(_,{task , id}){
        
        const taskUpdated = await Task.findByIdAndUpdate(id, {
            $set : task //para que actualize si quiere solo o titulo o descripcion
        }, {new: true}) // para que muestre el actualizado
        
        return taskUpdated
    }
    }
}

module.exports= {
    resolvers
}
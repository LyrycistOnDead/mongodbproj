const mamExpress = require('express')
const mamMongoose = require('mongoose')
const mamPath = require('path')
const mamExphbs = require('express-handlebars')
const mamTodoRoutes = require('./routes/todos')

const mamApp = mamExpress()

const mamHbs = mamExphbs.create({
    defaultLayout: 'main',
    extname:'hbs'
})

mamApp.engine('hbs', mamHbs.engine)
mamApp.set('view engine', 'hbs')
mamApp.set('views', 'views')

mamApp.use(mamExpress.urlencoded({ extended:true }))
mamApp.use(mamExpress.static(mamPath.join(__dirname, 'public')))

mamApp.use(mamTodoRoutes)

const mamPORT = process.env.mamPORT || 3000

async function start() {
    try {
        await mamMongoose.connect('mongodb+srv://lyricist17:Yan21112003@cluster0.vjv3bmx.mongodb.net/todos')
        mamApp.listen(mamPORT, () => {
            console.log('Server has been started')
        })        
    } catch(e) {
        console.log(e);
    }
}


start()
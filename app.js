const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const router = require('./routes')

const app = express();
app.set('view engine','ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

/*
let Schema = mongoose.Schema
let testSchema =  new Schema({
    name: String
})
let Test = mongoose.model('Test', testSchema)
*/

app.use('/contacts',router)

app.get('/', (req,res) =>{
   
  /*  let test = new Test({
        name: 'Mithun Shil'
    })

    test.save()
        .then(t => {
            res.json(t)
        })
        .catch(e => {
            console.log(e)
            res.statusCode(500).json({
                error: 'Error Occured'
            })
        })*/
    })

const PORT = process.env.PORT || 8080

mongoose.connect(`mongodb+srv://Liton:pciucse009@cluster0.zcv3d.mongodb.net/test`,{
    useNewUrlParser: true
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`)
    })
})
.catch(e => {
    console.log(e)
})

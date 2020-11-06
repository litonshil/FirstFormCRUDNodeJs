const Contact = require('./Contact')

exports.getAllContact = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.render('index', {contacts, error: {}})
        })
        .catch(e => {
            console.log(e)
            res.json({
                message: 'Error Occured'
            })
        })
}

exports.getSingleContact = (req, res) => {
    let { id } = req.params
    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            console.log(e)
            res.json({
                message: 'Error Occured'
            })
        })
}


exports.createContact = (req, res) => {
    let { name, phone, email, id } = req.body

    let error = {}
    if(!name) {
        error.name = 'Please provide your name'
    }
    if(!phone) {
        error.phone = 'Please provide your phone'
    }
    if(!email) {
        error.email = 'Please provide your email'
    }
    let isError = Object.keys(error).length>0

    if(isError){
        Contact.find()
            .then(contacts => {
                return res.render('index', {contacts,error})
            })
            .catch(e => {
                console.log(e)
                return res.json({
                    message: '1Error Occured'
                })
            })
    }

    if(id){
        
        Contact.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                name,
                email,
                phone
            }
        }).then(() => {
            Contact.find()
                .then(contacts => {
                    res.render('index', {contacts, error: {}})
                })
        }).catch(e => {
            //console.log(id)
            console.log(e)
            return res.json({
                message: '1Error Occured'
            })
        })
    }
    else{
        let contact = new Contact({
            name,
            email,
            phone
        })
        contact.save()
            .then(c => {
                Contact.find()
                    .then(contacts => {
                        return res.render('index', {contacts, error: {}})
                    })
            })
            .catch(e => {
                console.log(e)
                return res.json({
                    message: 'Error Occured'
                })
            })
        
    }
}

exports.updateContact = (req, res) => {
    let { name, phone, email } = req.body
    let { id } = req.params

    Contact.findOneAndUpdate({
        _id: id
    }, {
        $set: {
           name,email,phone 
        }
    },{ new: true })
    .then(contact => {
        res.json(contact)
    })
    .catch(e => {
        console.log(e)
        res.json({
            message: 'Error Occured'
        })
    })

}

exports.deleteContact = (req, res) => {
    let { id } = req.params
    Contact.findOneAndDelete({ _id: id })
        .then(() => {
            Contact.find()
                .then(contacts => {
                    res.render('index', {contacts, error: {}})
                    //return res.render('index', {contacts, error: {}})
                })
        })
        .catch(e => {
            console.log(e)
            res.json({
                message: 'Error Occured'
            })
        })
}
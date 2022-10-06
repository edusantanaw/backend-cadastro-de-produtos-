const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/minhasDispesas')
    .then(()=>{
        console.log('Conectado com sucesso ao mongodb')
    }).catch((err)=>{
        console.log(err)
    })

    module.exports = mongoose
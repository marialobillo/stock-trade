const environment = process.env.NODE_ENV || 'development'

const basicSetup = {
    jwt: {},
    port: 3000
}

let environmentSetup = {}

switch (environment){
    case 'development':
    case 'dev':
       environmentSetup = require('./dev') 
       break
    case 'prod':
    case 'production':
        environmentSetup = require('./prod')
        break
    default:
        environmentSetup = require('./dev')  
}


module.exports = {
    ...basicSetup, 
    ...environmentSetup
}
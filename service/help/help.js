const getHelpGeneric = () => {
    console.log(`
    Estructura de uso de ejecucion de programa.
    
    npm start [accion] [parametros]
    \tacction: encrypt, descrypt
    \tparametros: file, secret
    
    ejemplo:
    \tnpm start encrypt file=test.mp3`);
}

module.exports = {
    getHelpGeneric
}
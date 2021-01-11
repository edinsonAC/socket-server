const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt')
const { usuarioConectado, usuarioDesconectado, guardarMensaje } = require('../controllers/socket')
    // Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    let token = client.handshake.headers['x-token']
    const [valido, uid] = comprobarJWT(token)
    if (!valido) {
        return client.disconnect()
    }

    usuarioConectado(uid)
        //sala global
    client.join(uid)
        // client.to(uid).emit('')
    client.on('mensaje-personal', (payload) => {
        guardarMensaje(payload)
        io.to(payload.para).emit('mensaje-personal', payload)
    });
    client.on('disconnect', () => {
        usuarioDesconectado(uid)
    });

    client.on('mensaje', (payload) => {
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

});
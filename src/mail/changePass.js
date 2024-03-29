const nodemailer = require('nodemailer')

enviarPass = async (usuario, clave) => {
    console.log(process.env.EMAIL, process.env.PASSWORD_EMAIL)

    const config = {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD_EMAIL,
        }
    }

    const mensaje = {
        from: process.env.EMAIL,
        to: usuario ,
        subject: 'codigo para cambio de contraseña' ,
        text: `su codigo solicitado para el cambio de contraseña de su usuario en nuestra pagina 
                computer store es el siguiente ${clave}
                `
    }

    const transport = nodemailer.createTransport(config)

    const info = await transport.sendMail(mensaje)

    console.log(info)
}

module.exports = enviarPass
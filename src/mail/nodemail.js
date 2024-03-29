const nodemailer = require('nodemailer');

const enviarMail = async (producto, precio, usuario, statusId) => {
    try {
        let cantidades = producto.split(',');

        const config = {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            }
        };

        const mensaje = {
            from: 'computer.store.original@gmail.com',
            to: usuario,
            subject: 'compra realizada de forma exitosa!',
            text: `muchas gracias por comprar en Computer Store a continuacion adjunto el detalle de su compra:
            producto/s: ${producto}
            cantidad de productos: ${cantidades.length}
            compra total: ${precio}
            estado compra: ${statusId}
                    `
        };

        const transport = nodemailer.createTransport(config);

        const info = await transport.sendMail(mensaje);

        console.log(info);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = enviarMail;
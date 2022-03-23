function sendGridEmail(correo) {

    const sgMail = require('@sendgrid/mail');
    const API_KEY = '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';

    sgMail.setApiKey(API_KEY);

    const message = {
        to: correo,
        from: 'santiago.risso2@gmail.com',
        subject: 'Alkemy challenge',
        text: 'Registro realizado exitosamente!'

    }

    return (
        sgMail.send(message)
        .then((respose) => console.log("mensaje enviado"))
        .catch((err) => console.log(err)));
};

module.exports = { sendGridEmail };
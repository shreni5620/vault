const nodemailer = require('nodemailer');

const sendingMail = async(to,subject,text) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'patelshrenij@gmail.com',
            pass: 'nelv bmxd kcke hutz'
        }
    })

    const mailOptions = {
        from: '"VehicleVault" <patelshrenij@gmail.com>',
        to: to,
        subject: subject,
        //text: text
        html:text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}
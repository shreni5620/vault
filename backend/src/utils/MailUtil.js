const mailer = require('nodemailer');

const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"patelshrenij@gmail.com",
            pass:"nelv bmxd kcke hutz"
        }
    })

    const mailOptions = {
        from: 'patelshrenij@gmail.com',
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
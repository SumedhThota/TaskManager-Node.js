const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail=async (email,name)=>{
    sgMail.send({
    to:email,
    from:'sumedharya569@gmail.com',
    subject:'Welcome Aboard!',
    text: `Hi! ${name} Hope you\'re doing well`
})
}
const sendGoodbyeEmail=async (email,name)=>{
    sgMail.send({
    to:email,
    from:'sumedharya569@gmail.com',
    subject:'Sorry to see you go',
    text: `Hi! ${name} Thank you for using our services. We would look forward to your presence again! Let us know what we could have done better. See ya!`
})
}
module.exports={sendWelcomeEmail,
sendGoodbyeEmail}

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.send('hello node')
})
app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Message: ${req.body.message}</li>
      
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: '',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '', // generated ethereal user
        pass: ''  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <kawsar@yetfix.com>', // sender address
      to: 'mail.kawsar12@gmail.com', // list of receivers
      subject: 'Form data from Yetfix', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(PORT,()=>{
    console.log('server started at 5000');
})

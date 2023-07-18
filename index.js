
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./config.js");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});


app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: details.host,
    port: details.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.user,
      pass: details.pass
    }
  });

  let mailOptions = {
    from: details.user, // sender address
    to: details.user, // list of receivers
    subject: `Orçamento - Sr(a):" ${user.nome}`, // Subject line
    html: `<h3>${user.assunto}</h3><br>
    <h4>${user.textoLivre}</h4><br>
    <h4>Numero:${user.telefone}</h4><br>
    <h4>E-mail:${user.email}</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
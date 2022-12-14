const express = require('express');
const app = express();
const pdf = require('html-pdf');
const ejs = require('ejs');
const cors = require('cors');
app.use(express.json());
const stream = require('stream')

app.use(cors());

app.get('/health', (req,res) => {
    return res.json({ message: 'Servidor funcionando normalmente.' })     
 });

app.post('/pedido', (req,res) => {
   const dados =req.body;
   const nomedoc=dados.nomedoc;
   ejs.renderFile('./api/templates/index.ejs', dados, (err, html) =>{
    if (err){
        return res.status(500).json({message: 'erro no servidor', err});
    }
    
    const options = {
        format:'A4',
        border:{
            right:'8'
        }
    };

    pdf.create(html,options).toBuffer((error, buffer) =>{
        if (error) {
            return res.json({message:'falha'}); 
        } 

        var fileContents = Buffer.from(buffer, "base64");
  
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', 'attachment; filename=' + nomedoc);
        res.set('Content-Type', 'application/pdf');

        readStream.pipe(res);
    })

   });

});

app.listen(3333, function(){
    console.log('Servidor no ar.');
});
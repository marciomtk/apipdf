const express = require('express');
const app = express();
const pdf = require('html-pdf');
const ejs = require('ejs');
const cors = require('cors');
app.use(express.json());

app.use(cors());

app.post('/pedido', (req,res) => {
   const dados =req.body;
   const nomedoc=dados.nomedoc;
   ejs.renderFile('./templates/index.ejs',dados,(err,html) =>{
    if (err){
        return res.status(500).json({message:'erro no servidor'});
    }
    
    const options = {
        format:'A4',
        border:{
            right:'8'
        }
    };

    pdf.create(html,options).toFile('./uploads/'+nomedoc+'.pdf',(error,response) =>{
        if (!error) {
            return res.type('pdf').download('./uploads/'+nomedoc+'.pdf');
        } else {
            return res.json({message:'falha'});
        }
    })

   });

});


app.listen(3333, function(){
    console.log('Servidor no ar.');
});
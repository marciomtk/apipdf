const express = require('express');
const app = express();
const pdf = require('html-pdf');
const ejs = require('ejs');
const cors = require('cors');
app.use(express.json());

app.use(cors());

app.get('/gerar', (req,res) => {
   
   ejs.renderFile('./templates/index.ejs',{name:'MARCIO ALVES da silva',cidade:'teixeira de freitas'},(err,html) =>{
    if (err){
        return res.status(500).json({message:'erro no servidor'});
    }
    
    const options = {
        format:'A4',
        border:{
            right:'8'
        }
    };

    pdf.create(html,options).toFile('./uploads/report.pdf',(error,response) =>{
        if (!error) {
            return res.json({message: 'Sucesso'});
        } else {
            return res.json({message:'falha'});
        }
    })

   });

});


app.get('/baixar',(req,res) =>{
    res.type('pdf');
    res.download('./uploads/report.pdf');
});

app.listen(3333);
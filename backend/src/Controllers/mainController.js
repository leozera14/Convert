const knexOra = require('../database/oracle');

module.exports = {

  async index(req, res) {

    const { info } = req.body;

    

    await info.map(async item => {
      try {
        return await knexOra.raw(`SELECT a.nrocheckout as NROPDV, a.nroempresa, c.numerodf as NROCUPOM,  to_char(a.dtahoremissao, 'DD/MM/YYYY') as DTAEMISSAO, a.vlrtotal as Valor
        FROM consincomonitor.tb_doctopagto a, consincomonitor.tb_docto b, mfl_doctofiscal c, mfl_dfitem d 
        WHERE a.seqdocto = b.seqdocto
        and a.nroempresa = b.nroempresa
        and a.nroempresa = c.nroempresa
        and a.nroempresa = d.nroempresa
        and b.nroempresa = c.nroempresa
        and b.nroempresa = d.nroempresa
        and a.nrocheckout = b.nrocheckout
        and c.nroempresa = d.nroempresa
        and c.nrocheckout = a.nrocheckout
        and c.nrocheckout = b.nrocheckout
        and a.nroformapagto = c.nroformapagto
        and c.numerodf = d.numerodf
        and c.seriedf = d.seriedf
        and c.nroserieecf = d.nroserieecf
        and to_char(a.dtahoremissao, 'DD/MM/YYYY') = to_char(c.dtahoremissao, 'DD/MM/YYYY')
        and b.dtamovimento = c.dtamovimento
        and a.codautorizacaotef = ?
        and a.nroempresa = ?
        GROUP BY a.nrocheckout, a.nroempresa, c.numerodf, a.vlrtotal, a.dtahoremissao
        having sum(d.vlritem) = a.vlrtotal
        `, [item[1], item[0]]).then(res => {
          Results(res);
        });
      } catch (error) {
        console.log(error);
      }
    });

    var teste = [];

    function Results(res) {
       teste.push(res);

       console.log(teste);
    }

    
    
    return res.status(200).json({teste});
  }
}
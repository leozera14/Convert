const knexOra = require('../database/oracle');

module.exports ={
  async searchOne(req, res) {
    const { codAut, nsuTef, loja } = req.body;

    const querie = await knexOra.raw(
        `SELECT a.nrocheckout as NROPDV, a.nroempresa, e.seqpessoa as SEQCLIENTE, e.nomerazao as NOMECLIENTE, c.numerodf as NROCUPOM,  to_char(a.dtahoremissao, 'DD/MM/YYYY') as DTAEMISSAO, a.vlrtotal as Valor
        FROM consincomonitor.tb_doctopagto a, consincomonitor.tb_docto b, mfl_doctofiscal c, mfl_dfitem d, ge_pessoa e
        WHERE a.seqdocto = b.seqdocto
        and a.nroempresa = b.nroempresa
        and a.nroempresa = c.nroempresa
        and a.nroempresa = d.nroempresa
        and b.nroempresa = c.nroempresa
        and b.nroempresa = d.nroempresa
        and c.nroempresa = d.nroempresa
        and a.nrocheckout = b.nrocheckout
        and c.nrocheckout = a.nrocheckout
        and c.nrocheckout = b.nrocheckout
        and c.seqpessoa = e.seqpessoa
        and SUBSTR(c.observacao, 6, LENGTH(c.observacao) - 5) = b.coo
        and a.nroformapagto = c.nroformapagto
        and c.numerodf = d.numerodf
        and c.seriedf = d.seriedf
        and c.nroserieecf = d.nroserieecf
        and b.dtamovimento = c.dtamovimento
        and a.codautorizacaotef = '${codAut}'
        and a.nsutef = ${nsuTef}
        and a.nroempresa = ${loja}
        GROUP BY a.nrocheckout, a.nroempresa, c.numerodf, a.vlrtotal, a.dtahoremissao, c.seqpessoa, e.seqpessoa, e.nomerazao
        `
      );
      
      Promise.all(querie)
        .then((responses) => {
          let size = responses.length;

          if (size === 0) {
            let anotherData = [{
              NROPDV: 'Cupom não encontrado...',
              NROEMPRESA: 'Cupom não encontrado...',
              SEQCLIENTE: '/',
              NOMECLIENTE: '/',
              NROCUPOM: '/',
              DTAEMISSAO: '/',
              VALOR: '/'
            }]
            return res.status(400).json({ error: anotherData });
          } else {
            return res.status(200).json(responses)
          }
        })
        .catch((err) => console.log(err));
  }
}
const knexOra = require('../database/oracle');

module.exports = {
  async index(req, res) {
    const { info } = req.body;
    const queries = info.map((item) => {
      return knexOra.raw(
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
        and a.codautorizacaotef = ?
        and a.nsutef = ?
        and a.nroempresa = ?
        GROUP BY a.nrocheckout, a.nroempresa, c.numerodf, a.vlrtotal, a.dtahoremissao, c.seqpessoa, e.seqpessoa, e.nomerazao
        `, [item[2], item[1], item[0]]
      );
    });

    Promise.all(queries)
    
      .then((responses) => {
        let size = responses.length;

        let newData = [];

        for(i = 0; i < size; i++) {
          if(responses[i].length === 0) {
              let anotherData = [{
              NROPDV: 'Informacao nao encontrada',
              NROEMPRESA: '/',
              SEQCLIENTE: '/',
              NOMECLIENTE: '/',
              NROCUPOM: '/',
              DTAEMISSAO: '/',
              VALOR: '/'
            }]
            newData.push(anotherData)
          } else {
            newData.push(responses[i]);
          }
        }

        return res.status(200).json(newData);
      })
      .catch((err) => console.log(err));
  },
};
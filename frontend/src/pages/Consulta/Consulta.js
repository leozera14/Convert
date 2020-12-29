import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import api from '../../services/api';
import './consulta-style.css';


export default function Read() {
    const [codAut, setcodAut] = useState('');
    const [nsuTef, setnsuTef] = useState('');
    const [loja, setLoja] = useState('');
    const [info, setInfo] = useState('');

    async function Search(e) {
      e.preventDefault();

      const data = ({
        codAut,
        nsuTef,
        loja
      });

      try {
        await api.post('/search', data)
          .then(function(response) {
            if(response.status === 200) {
              console.log(response.data)
              setInfo(response.data);
            }
          })
      } catch (error) {
        console.log(`${error}`)
      }
    }

    return (
        <> 

          <Header />

          <div className="container-full">
            <div className="container">
              <div className="form-container">
                <div className="tittle">
                    <h1>Consulta Unitária de Cupons</h1>
                    <h2>Digite as informações abaixo para consultar o Cupom.</h2>
                </div>
                  
                  <form onSubmit={Search}>
                    <input type="text" value={codAut} onChange={e => setcodAut(e.target.value)} placeholder="Digite o código de Autorização"/>
                    <input type="text" value={nsuTef} onChange={e => setnsuTef(e.target.value)} placeholder="Digite o NSUTEF"/>
                    <input type="text" value={loja} onChange={e => setLoja(e.target.value)} placeholder="Digite o numero da Loja"/>
                    <button className="botao" type="submit">Pesquisar</button>
                  </form>

                  
                  {info
                  ? info.map(inf => (
                    <div className="cupomInfo">
                      <p>Informações do Cupom:</p>
                      <p>Loja: &nbsp;<span>{inf.NROEMPRESA}</span></p>
                      <p>PDV:  &nbsp;<span>{inf.NROPDV}</span></p>
                      <p>Seq Cliente:  &nbsp;<span>{inf.SEQCLIENTE}</span></p>
                      <p>Nome Cliente:  &nbsp;<span>{inf.NOMECLIENTE}</span></p>
                      <p>Cupom:  &nbsp;<span>{inf.NROCUPOM}</span></p>
                      <p>Valor:  &nbsp;<span>{parseFloat(inf.VALOR.toFixed(2))}</span></p>
                      <p>Data:  &nbsp;<span>{inf.DTAEMISSAO}</span></p>
                    </div>
                  ))
                  : <div className="noData">
                      <p>Sem dados para mostrar</p>
                    </div> 
                  }
                  
                </div>
            </div>
          </div>

          <Footer />
        </>
    )
}
import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import api from '../../services/api';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
              toast.success('Informações encontradas com sucesso !!')
              setInfo(response.data);
            }
          })
      } catch (error) {
        if(error.response.status === 400) {
          toast.error('Cupom não encontrado, verifique os dados informados !!')
          setInfo(error.response.data.error);
        }
      }
    }

    return (
        <> 

          <Header />

          <div className="container-full">
            <div className="form-container">
              <div className="title">
                  <h1>Digite as informações para consultar o Cupom</h1>
              </div>

              <div className="form-content">
                <form onSubmit={Search}>
                    <input type="text" value={codAut} onChange={e => setcodAut(e.target.value)} placeholder="Digite o código de Autorização"/>
                    <input type="text" value={nsuTef} onChange={e => setnsuTef(e.target.value)} placeholder="Digite o NSUTEF"/>
                    <input type="text" value={loja} onChange={e => setLoja(e.target.value)} placeholder="Digite o numero da Loja"/>
                    <button className="botao" type="submit">Pesquisar</button>
                </form>
              </div>    
              

                  
              {info
              ? info.map(inf => (
              <div className="cupomInfo">
                <h2>Informações do Cupom:</h2>
                <p>Loja: &nbsp;<span>{inf.NROEMPRESA}</span></p>
                <p>PDV:  &nbsp;<span>{inf.NROPDV}</span></p>
                <p>Seq Cliente:  &nbsp;<span>{inf.SEQCLIENTE}</span></p>
                <p>Nome Cliente:  &nbsp;<span>{inf.NOMECLIENTE}</span></p>
                <p>Cupom:  &nbsp;<span>{inf.NROCUPOM}</span></p>
                <p>Valor:  &nbsp;<span>{inf.VALOR}</span></p>
                <p>Data:  &nbsp;<span>{inf.DTAEMISSAO}</span></p>
              </div>
              ))
              : 
              <div className="noData">
                <p>Sem dados para mostrar</p>
              </div> 
              }      
            </div>
          </div>

          <ToastContainer
          position="top-right"
          autoClose={4500}
          transition={Slide}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          />

          <Footer />
        </>
    )
}
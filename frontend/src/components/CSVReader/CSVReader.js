import React, { useState } from 'react';
import api from '../../services/api';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jsonToCSV, CSVReader } from 'react-papaparse';

export default function CSVRead() {
  const buttonRef = React.createRef();
  const [info, setInfo] = useState([]);
  const [file, setFile] = useState('');

  function handleOpenDialog(e) {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
  
  async function handleOnFileLoad(response) {
    let transformData = [];
    let novoData = [];

    await response.map(item => {
       transformData.push(item.data);
    });

    const tamanho = transformData.length;

    for(let i = 0; i < tamanho; i++) {
      if(transformData[i][0] !== "") {
        let percorre = ([transformData[i][0], transformData[i][6], transformData[i][7]]);
        novoData.push(percorre);
      }
    }

    novoData.map(data => {
      switch(data[0]) {
        case "07159026000126":
          data[0] = "01";
          break;

        case "07159026000207":
          data[0] = "02";
          break;

        case "07159026000398":
          data[0] = "03";
          break;

        case "07159026000479":
          data[0] = "04";
          break;

        case "07159026000550":
          data[0] = "05";
          break;

        case "07159026000630":
          data[0] = "06";
          break;

        case "07159026000711":
          data[0] = "07";
          break;

        case "07159026001017":
          data[0] = "10";
          break;

        case "07159026001106":
          data[0] = "11";
          break;

        case "07159026001360":
          data[0] = "13";
          break;  


        default:
          console.log('Nenhuma loja informada');
      }
    })
    setInfo(novoData);

    toast.info('Arquivo inserido com sucesso...')
  }


  function handleOnError(err, file, inputElem, reason){
    console.log(err)
  }

  function handleOnRemoveFile(data) {
    toast.info('Arquivo removido com sucesso...')
  }

  function handleRemoveFile(e) {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }
  
  async function send(e, result) {
    e.preventDefault()

    const data = ({
      info
    })

    try {
      await api.post('/file', data)
          .then(async resp => {
            toast.info('O arquivo será baixado automaticamente, aguarde alguns instantes...')
            await trataDados(resp.status, resp.data, file.name); 
          })
          .catch((e) => console.log('Erro ' + e))

    } catch (error) {
      console.log(error);
    }
  }

  
  async function trataDados(evento, dados, nome) {
    try {
      if(evento === 200) {
        var data = [];

        dados.map(dado => {
          dado.map(async d => {
             data.push(d);
          })
        })

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([jsonToCSV(data)]));
        link.setAttribute('download', `${nome} - Convertido.csv`);
        document.body.appendChild(link);
        link.click();

        toast.success('Arquivo criado com sucesso !!')
      }
    } catch (error) {
      toast.error('Erro ao criar arquivo !!');
    }
  }

  return (
    <>
      <Header />

      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
        noProgressBar
      >
        {({ file }) => (
          <div className="wrap-container">
            <div className="container-main">

              <div className="archive-title">
                <h1>Insira abaixo seu arquivo para conversão</h1>
              </div>

              <div className="archive-content">
                <button
                  className="button button-standard"
                  type='button'
                  onClick={handleOpenDialog}
                >
                  Escolher arquivo
                </button>
              

                <div className="archive">
                  {file
                  ?
                  file && file.name
                  : "Nenhum arquivo selecionado"
                  }
                </div>
                <button
                  className="button button-remove"
                  onClick={handleRemoveFile}
                >
                  Remover
                </button>
              </div>

              <div className="archive-form">
                <form onSubmit={send}>
                  <button 
                  className="button button-convert"
                  type="submit">
                    Converter
                  </button>
                  {setFile(file)}
                </form>
              </div>
            </div>
          </div>
            
        )}
      </CSVReader>

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

import React, { useState } from 'react';

import api from '../services/api';

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
    })

    const tamanho = transformData.length;

    for(let i = 0; i < tamanho; i++) {
      if(transformData[i][0] !== "") {
        let percorre = ([transformData[i][5], transformData[i][8]]);
        novoData.push(percorre);
      }
    }

    novoData.map(data => {
      switch(data[0]) {
        case "26":
          data[0] = "01";
          break;

        case "20":
          data[0] = "02";
          break;

        case "19":
          data[0] = "03";
          break;

        case "22":
          data[0] = "04";
          break;

        case "21":
          data[0] = "05";
          break;

        case "24":
          data[0] = "06";
          break;

        case "27":
          data[0] = "07";
          break;

        case "25":
          data[0] = "10";
          break;

        case "23":
          data[0] = "11";
          break;


        default:
          console.log('');
      }
    })
    setInfo(novoData);
  }

  function handleOnError(err, file, inputElem, reason){
    console.log(err)
  }

  function handleOnRemoveFile(data) {
    console.log(data)
  }

  function handleRemoveFile(e) {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
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
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async function send(e, result) {
    e.preventDefault()

    const data = ({
      info
    })

    console.log(data);

    try {
      await api.post('/file', data)
          .then(async resp => {
            await trataDados(resp.status, resp.data, file.name); 
          })
          .catch((e) => console.log('Erro ' + e))

    } catch (error) {
      console.log(error);
    }
  }

  return (
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
        <div className="mainDiv">
          <div className="container">
            <h1>Conversor de Arquivos</h1>
            <div className="archiveContainer">
              <div>
                <h2>Insira abaixo seu arquivo para conversão</h2>
              </div>
              <div className="archiveDiv">
                <button
                  className="button"
                  type='button'
                  onClick={handleOpenDialog}
                  style={{
                    background: 'rgb(29,111,234)'
                  }}
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
                  className="button"
                  onClick={handleRemoveFile}
                  style={{
                    background: 'rgb(170,52,17)'
                  }}
                >
                  Remover
                </button>
              </div>
              <div className="form">
                <form onSubmit={send}>
                  <button className="button" style={{ background: "rgb(63,63,63)", marginBottom: 20 }} type="submit">Converter</button>
                  <a href="/consulta">Consultar Cupons Individualmente</a>
                  {setFile(file)}
                </form>
            </div>
            </div>
          </div>
        </div>
      )}
    </CSVReader>

    
  )
}

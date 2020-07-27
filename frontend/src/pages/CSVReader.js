import React, { useState } from 'react';

import api from '../services/api';

import { CSVReader } from 'react-papaparse';

export default function CSVRead() {
  const buttonRef = React.createRef();
  const [info, setInfo] = useState([]);
  

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
      let percorre = ([transformData[i][5], transformData[i][8]]);
      novoData.push(percorre);
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
  
  async function send(e) {
    e.preventDefault()

    const data = ({
      info
    })

    try {
      await api.post('/file', data)
          .then(function(response) {
            console.log(response);
          });

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
    >
      {({ file }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10
          }}
        >
          <button
            type='button'
            onClick={handleOpenDialog}
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              width: '40%',
              paddingLeft: 0,
              paddingRight: 0
            }}
          >
            Browse file
          </button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#ccc',
              height: 45,
              lineHeight: 2.5,
              marginTop: 5,
              marginBottom: 5,
              paddingLeft: 13,
              paddingTop: 3,
              width: '60%'
            }}
          >
            {file && file.name}
          </div>
          <button
            style={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 20,
              paddingRight: 20
            }}
            onClick={handleRemoveFile}
          >
            Remove
          </button>
          <br/>
          <div>
              <div>
              <form onSubmit={send}>
                <button button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </CSVReader>

    
  )
}

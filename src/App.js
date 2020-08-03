import React, { useState, useEffect } from 'react'
import cookieImg from './giphy.gif'
import './App.css'
import ReactModal from 'react-modal';
const axios = require('axios');

const customStyles = {
  content : {
    maxWidth: '500px',
    width: '100%',
    height: '140px',
    top : '50%',
    left : '50%',
    transform : 'translate(-50%, -50%)'
  }
};


function App() {
  const [cookie, setCookie] = useState([])
  const [display, setDisplay] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isCookieClick, setIsCookieClick] = useState(false)
  const [textArea, setTextArea] = useState(null)

  
  const url = "http://localhost:3000/cookie"

  function cookieClick(){
    if(!isCookieClick){
        axios.get(url)
        .then((cookie) => {
          setCookie(cookie.data.response)
          setDisplay(true)
          setIsCookieClick(true)
        })
        .catch((error) => {
          alert(error)
        })
    }
  }


  function saveNewCookie(){
    axios.post(url, {
      new: textArea
    })
    .then(function (response) {
      console.log(response)
      setCookie([])
      setTextArea(null)
      setModalOpen(false)
      setDisplay(false)
      setIsCookieClick(false)
      alert("A new fortune cookie has been added!")
    })
    .catch(function (error) {
      alert(error)
    });
  }


  const Fortune = () => {
    return (
        <h3>{cookie}</h3>
      )
  }
  
  const NewCookie = () => {
    return(
      <div>
        <p>Do you want to make your own fortune cookie?</p>
      </div>
    )
  }

  function yesCookie(){
    setModalOpen(true)
  }

  function noCookie(){
    setCookie([])
    setDisplay(false)
    setIsCookieClick(false)
  }
  
  const NewCookieButton = () => {
    return(
      <div>
        <button className="buttons" onClick={yesCookie}>Yes</button>
        <button className="buttons" onClick={noCookie}>No</button>
      </div>
    )
  }

  function textareaChange(event){
    setTextArea(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Fortune />
        {display? <NewCookie /> : null}
        {display? <NewCookieButton /> : null}

        <img src={cookieImg} className="cookie" alt="logo" onClick={cookieClick}/>
        <p className="small">Click the cookie</p>

        <ReactModal
          isOpen={modalOpen}
          style={customStyles}
          shouldCloseOnEsc={true}
          contentLabel="Example Modal"
        >
          <textarea onChange={textareaChange} className="txtArea" id="txtArea" name="txtArea" rows="5" cols="70"></textarea>
          <button className="buttons" onClick={saveNewCookie}>Save</button>
          <button className="buttons" onClick={() => setModalOpen(false)}>Close</button>
        </ReactModal>
      </header>
    </div>
  );
}

export default App;

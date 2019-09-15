import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextInput from './TextInput'
import M from 'materialize-css'

const Tts = () => {
  const [text, setText] = useState('')
  const [audio, setAudio] = useState('')
  const [voice, setVoice] = useState('en-US_AllisonVoice')
  const BASE_URL = `https://cors-anywhere.herokuapp.com/https://gateway-tok.watsonplatform.net/text-to-speech/api/v1/synthesize?accept=audio/ogg;codecs=opus&voice=${voice}`
  const API_KEY = process.env.REACT_APP_API_KEY

  useEffect(() => {
    var elems = document.querySelectorAll('select')
    var instances = M.FormSelect.init(elems, {})
  }, [])

  const onChange = e => {
    setText(e.target.value)
  }

  const getAudioContext = () => {
    AudioContext = window.AudioContext || window.webkitAudioContext
    const audioContent = new AudioContext()
    return audioContent
  }

  function b64EncodeUnicode(str) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
      })
    )
  }

  const submit = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer',
      auth: {
        username: 'apikey',
        password: API_KEY
      }
    }

    const data = {
      text
    }
    const res = await axios.post(BASE_URL, data, config)
    // const base64Audio = b64EncodeUnicode(res.data)
    let base64String = btoa(String.fromCharCode(...new Uint8Array(res.data)))
    setAudio(base64String)
    // console.log(res.data)
  }
  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <div className="row">
        <div className="col s12">
          <label htmlFor="voice">Voice</label>
          <select
            name="voice"
            value={voice}
            onChange={e => setVoice(e.target.value)}
          >
            <option value="en-GB_KateVoice">en-GB_KateVoice</option>
            <option value="en-GB_KateV3Voice">en-GB_KateV3Voice</option>
            <option value="en-US_AllisonVoice">en-US_AllisonVoice</option>
            <option value="en-US_AllisonV3Voice">en-US_AllisonV3Voice</option>
            <option value="en-US_LisaVoice">en-US_LisaVoice</option>
            <option value="en-US_LisaV3Voice">en-US_LisaV3Voice</option>
            <option value="en-US_MichaelVoice">en-US_MichaelVoice</option>
            <option value="en-US_MichaelV3Voice">en-US_MichaelV3Voice</option>
          </select>
          <TextInput
            text={text}
            onChange={onChange}
            submit={submit}
            audio={audio}
          />
        </div>
      </div>
    </div>
  )
}

export default Tts

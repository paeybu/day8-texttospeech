import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextInput from './TextInput'
import M from 'materialize-css'

const Tts = () => {
  const [token, setToken] = useState('')
  const [text, setText] = useState('')
  const [audio, setAudio] = useState('')
  const [voice, setVoice] = useState('en-US_AllisonVoice')
  const API_KEY = process.env.REACT_APP_API_KEY

  useEffect(() => {
    var elems = document.querySelectorAll('select')
    var instances = M.FormSelect.init(elems, {})
    getToken()
  }, [])

  const getToken = async () => {
    let res = await axios.get(
      'https://express-watson-proxy.herokuapp.com/api/token'
    )
    setToken(res.data.access_token)
  }

  const onChange = e => {
    setText(e.target.value)
  }

  const getAudioContext = () => {
    AudioContext = window.AudioContext || window.webkitAudioContext
    const audioContent = new AudioContext()
    return audioContent
  }

  const submit = async () => {
    const res = await axios.get(
      `https://express-watson-proxy.herokuapp.com/api/synthesize?access_token=${token}&text=${text}&voice=${voice}`
    )
    // console.log(res.data)
    setAudio(res.data)
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

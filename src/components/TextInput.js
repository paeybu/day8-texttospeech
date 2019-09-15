import React, { useEffect } from 'react'

const TextInput = ({ text, onChange, submit, audio }) => {
  useEffect(() => {
    const player = document.querySelector('audio')
    player.play()
  }, [audio])
  return (
    <>
      <div className="input-field">
        <label htmlFor="text">Text</label>
        <input type="text" name="text" value={text} onChange={onChange} />
      </div>
      <button className="waves-effect waves-light btn" onClick={submit}>
        Submit
      </button>

      <br />
      <audio
        src={`data:audio/ogg;base64,${audio}`}
        controls
        style={{ marginTop: '20px' }}
      ></audio>
    </>
  )
}

export default TextInput

import {useState, useCallback, useEffect, useRef} from "react";
import styled from "styled-components";
import './App.css';

function App() {
  const [passLen, setPassLen] = useState(8);
  const [numEnable, setNumEnable] = useState(false);
  const [charEnable, setCharEnable] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let num = "0123456789";
  let char = "!@#$%^&*()_-+=.?";

  const passGenerator = useCallback(()=>{
    let pass="";
    if (numEnable) str= num+str;
    if (charEnable) str+= char;
    console.log(str);
    for(let i=0; i<passLen; i++){
      let index = Math.floor(Math.random() * str.length);
      pass+= str.charAt(index);
    }
    setPassword(pass);
  }, [numEnable, charEnable, passLen]);

  useEffect(()=>{
    passGenerator();
  }, [numEnable, charEnable, passLen, passGenerator]);

  const copyPassword = useCallback(()=> {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  return (
    <>
      <Container>
        <h1 className="heading">Password Generator</h1>
        <div className="form-container">
          <div className="output-container">
            <input className="output" type="text" value={password} placeholder="Password" readOnly ref={passRef} />
            <button className="button" onClick={copyPassword}>Copy</button>
          </div>
          <div className="input-container">
            <div>
            <label>
              <input className="len-input"  type="range" min={8} max={20} value={passLen} onChange={(e)=> setPassLen(e.target.value)} />
              Length: {passLen}
            </label>
            </div>

            <div>
            <label>
              <input className="num-input"  type="checkbox" defaultChecked={numEnable}  onChange={()=> setNumEnable((prev)=>!prev)} />
              Numbers
            </label>
            </div>

            <div>
            <label>
              <input className="char-input"  type="checkbox" defaultChecked={charEnable} onChange={()=> setCharEnable((prev)=>!prev)} />
              Characters
            </label>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
height: 100vh;
width: 100vw;
background-color: black;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
.heading {
  color: white;
}
.form-container {
  background-color: rgb(10, 24, 24);
  padding: 3rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  .output-container {
    margin: 2rem 0rem 4rem 0rem;
    .output {
      padding: 1rem;
      margin-right: 0.3rem;
      border-radius: 0.4rem;
      font-size: 1rem;
      width:70%;
    }
    .button {
      background-color: orange;
      color: white;
      border: none;
      padding: 1rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
    }
  }
  .input-container {
    display: flex;
    color: orange;
    gap: 2rem;
  }
}
`;
export default App;

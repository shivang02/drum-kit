import React, { Component } from 'react';
import './App.css';

const KitDetails = [
  { keyCode: 'Q',
    url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    name:'Heater 1'},
  { keyCode: 'W',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    name:'Kick n Hat' },
  { keyCode: 'E',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    name: 'Cev_H2' },
  { keyCode: 'A',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
    name: 'Chord 1' },
  { keyCode: 'S',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
    name: 'Chord 2' },
  { keyCode: 'D',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
    name: 'Chord 3' },
  { keyCode: 'Z',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
    name: 'Bld H1' },
  { keyCode: 'X',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    name: 'Punchy Kick' },
  { keyCode: 'C',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    name: 'Break Snare' }
]

class DrumPad extends Component {
  constructor(props) {
    super(props)
  
  }
  componentDidMount() {
    document.addEventListener("keydown",this.HandleKeyPress)
  }

  HandleKeyPress =(e) => {
    let pressedKey = e != null ? e.key.toUpperCase() : e
    this.PlayAudio(pressedKey)
  }

  PlayAudio =(e) => { 
    
    let audioObj = document.getElementById(e)
    if(audioObj!=null) {
      audioObj.currentTime =0;
      audioObj.play()
      setTimeout(audioObj.play(),100);
      this.props.displayValue(e)
    }
    
    console.log(audioObj)
  }

  
  
  render() {
    let myKey = this.props.keyVal;

    return (
      <button value= {myKey} className="drum-pad" onClick={(e) =>this.PlayAudio(e.target.value)}>
      {myKey}
        <audio className="clip" id={myKey} src={this.props.URL} />
      </button>
    )
  }
}


class PadLine extends Component {
  constructor(props) {
    super(props)

  }

  showItem = () => {
    let startNum = this.props.startNum
    let struc=[]
      for (let i = 0; i <= 2; i++) {      
          struc[i]=<DrumPad keyVal={KitDetails[startNum+i].keyCode} URL={KitDetails[startNum+i].url} padName={KitDetails[startNum+i].name} displayValue={(val)=>this.props.displayValue(val)}/>
      }
      return struc
  }
  render() {

    return (
      <div className="kit-line">
        {this.showItem()}
      </div>
    )
  }

}

class App extends Component {
constructor(props) {
  super(props)
  this.state ={
    display:'hello'
  }
}

displayValue= (val) => {
  KitDetails.map((elem)=> {
    if(elem.keyCode==val) {
      this.setState({
        display:elem.name
      })
    }
  })
}

  render() {
    return (
      <div className="App">
        <div className="container" id="drum-machine">
          <input className="display-box" value={this.state.display} readOnly />
          <PadLine startNum={0} displayValue={(val)=> this.displayValue(val)}/>
          <PadLine startNum={3} displayValue={(val) => this.displayValue(val)}/>
          <PadLine startNum={6} displayValue={(val) => this.displayValue(val)}/>
        </div>
      </div>
    );
  }
}

export default App;

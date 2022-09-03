import { Component, HTMLAttributes, useEffect } from 'react'
import { BoundaryError } from './utils/boundary-error/BoundaryError'
import './App.css'

type errorState = {
  someVar: boolean
}
class ErrorComp extends Component {
  state: errorState;

  constructor(props: HTMLAttributes<HTMLHtmlElement>) {
    super(props);
    this.state = {
      someVar: true
    }
  }


  render() {
    if (this.state.someVar) throw new Error("специальное падение!")
    return <div>never show up</div>
  }
}

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const response = await fetch('http://localhost:3001')
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className='App'>
    <BoundaryError>
      <ErrorComp />
    </BoundaryError>
  </div>
}

export default App

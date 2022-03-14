import { useEffect } from 'react';
import {
  EuiButton,
  EuiCallOut,
  EuiPanel,
} from '@elastic/eui';
import { retrieveHouses } from './apis';
import './App.css';

async function getHouses() {
  const houses = await retrieveHouses()
  console.log('houses', houses)
}

function App() {
  useEffect(() => {
    getHouses();
  })
  return (
    <div className="App">
      <EuiButton>Hello</EuiButton>
    </div>
  );
}

export default App;

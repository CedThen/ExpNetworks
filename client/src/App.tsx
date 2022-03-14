import { useEffect, useState } from 'react';
import {
  EuiListGroup,
  EuiListGroupItem,

  EuiText
} from '@elastic/eui';
import './App.css';
import { HouseInterface } from '../../types';
import Header from './components/Header';
import Page from './components/Page';
import useFetchData from './hooks/useFetchData';


function App() {
  const [data] = useFetchData();
  const [selected, setSelected] = useState<number>(0)

  function listClickHandler(e: any) {
    console.log('click event', e)
  }

  return (
    <div className="App">
      <Header />
      <Page >
        <EuiListGroup flush={true} bordered={true}>
          {data?.map(house =>
            <EuiListGroupItem onClick={listClickHandler} label={house.address} key={house._id} />
          )}
        </EuiListGroup>
      </Page>
    </div>
  );
}

export default App;

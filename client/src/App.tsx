import { useEffect, useState } from 'react';
import {
  EuiListGroup,
  EuiListGroupItem,
  EuiTitle,
  EuiText,
  EuiCard,
  EuiLoadingSpinner
} from '@elastic/eui';
import './App.css';
import { HouseInterface } from '../../types';
import Header from './components/Header';
import Page from './components/Page';
import HouseContent from './components/HouseContent';
import useFetchData from './hooks/useFetchData';


function App() {
  const [data] = useFetchData();
  const [selected, setSelected] = useState<number>(0)

  if (!data) return <EuiLoadingSpinner size="l" />
  return (
    <div className="App">
      <Header />
      <Page >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <EuiListGroup flush={true} bordered={true} style={{ height: "600px", width: "300px" }}>
            {data?.map((house, index) =>
              <EuiListGroupItem
                size='l'
                onClick={() => setSelected(index)}
                label={house.address} key={house._id}
              />
            )}
          </EuiListGroup>
          <HouseContent house={data[selected]} />
        </div>
      </Page>
    </div>
  );
}

export default App;

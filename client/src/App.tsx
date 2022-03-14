import { useState } from 'react';
import {
  EuiListGroup,
  EuiListGroupItem,
  EuiLoadingSpinner,
  EuiPanel,
  EuiButton,
} from '@elastic/eui';
import './App.css';
import Header from './components/Header';
import Page from './components/Page';
import HouseContent from './components/HouseContent';
import useFetchData from './hooks/useFetchData';
import Form from './components/Form'
import { HouseInterface } from '../../types';
import { createHouse } from './apis';


function App() {
  const [data, setData] = useFetchData();
  const [selected, setSelected] = useState<number>(0)
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  if (!data) return <EuiLoadingSpinner size="l" />

  async function onFormSubmit(house: HouseInterface) {
    console.log('hello', house)
    await createHouse(house, setData)
    // api call to create house
    // it should return with new data, so setData to the new stuff

  }

  return (
    <div className="App">
      <Header />
      <Page >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <EuiPanel style={{ height: "600px", width: "500px" }}>
            <EuiButton onClick={() => setIsFormVisible(true)} >Add Property</EuiButton>
            <Form isVisible={isFormVisible} setIsFormVisible={setIsFormVisible} onSubmit={onFormSubmit} />
            <EuiListGroup flush={false} bordered={false} >
              {data?.map((house, index) =>
                <EuiListGroupItem
                  size='l'
                  onClick={() => setSelected(index)}
                  label={house.address} key={house._id}
                />
              )}
            </EuiListGroup>
          </EuiPanel>
          <HouseContent house={data[selected]} />
        </div>
      </Page>
    </div>
  );
}

export default App;

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
import { createHouse, deleteHouse } from './apis';
import DeleteConfirmation from './components/DeleteConfirmation';


function App() {
  const [data, setData] = useFetchData();
  const [selected, setSelected] = useState<number>(0)
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [formInitialVals, setFormInitialVals] = useState<HouseInterface>()
  if (!data) return <EuiLoadingSpinner size="l" />

  async function onFormSubmit(house: HouseInterface) {
    const houses = await createHouse(house)
    setData(houses)
  }

  function onEditClick() {
    // opens form with prefilled state
    if (!data) return
    setIsFormVisible(true)
    setFormInitialVals(data[selected])
  }

  async function onEditSubmit() {

  }

  function onDeleteClick() {
    setIsDeleteVisible(true);
  }

  async function onDeleteSubmit() {
    setSelected(0);
    setIsDeleteVisible(false);
    let deletedId = data ? data[selected]._id : ''
    const houses = await deleteHouse(deletedId)
    setData(houses)
  }

  return (
    <div className="App">
      <Header />
      <Page >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <EuiPanel style={{ height: "600px", width: "500px" }}>
            <EuiButton onClick={() => setIsFormVisible(true)} >Add Property</EuiButton>
            <Form isVisible={isFormVisible} setIsFormVisible={setIsFormVisible} onSubmit={onFormSubmit} initialVals={formInitialVals} />
            <DeleteConfirmation isVisible={isDeleteVisible} onClose={() => setIsDeleteVisible(false)} onDeleteSubmit={onDeleteSubmit} />
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
          <HouseContent house={data[selected]} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
        </div>
      </Page>
    </div>
  );
}

export default App;

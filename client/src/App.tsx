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
import { createHouse, deleteHouse, updateHouse } from './apis';
import DeleteConfirmation from './components/DeleteConfirmation';



function App() {
  const [data, setData] = useFetchData();
  const [selected, setSelected] = useState<number>(0)
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [formInitialVals, setFormInitialVals] = useState<HouseInterface>()


  async function onFormSubmit(house: HouseInterface) {
    const houses = await createHouse(house)
    setData(houses)
  }

  function onEditClick(): void {
    if (!data) return
    setIsFormVisible(true)
    setFormInitialVals(data[selected])
  }

  async function onEditSubmit(house: HouseInterface): Promise<void> {
    console.log('editing', house)
    if (!data) return
    const houses = await updateHouse({ ...house, _id: data[selected]._id })
    // setData(houses);
  }

  function onDeleteClick() {
    setIsDeleteVisible(true);
  }

  function onAddPropertyClick() {
    setIsFormVisible(true);
    setFormInitialVals(undefined)
  }

  async function onDeleteSubmit() {
    setSelected(0);
    setIsDeleteVisible(false);
    let deletedId = data ? data[selected]._id : ''
    const houses = await deleteHouse(deletedId)
    setData(houses)
  }

  const FormComponent = () => {
    return formInitialVals ?
      <Form isVisible={isFormVisible} setIsFormVisible={setIsFormVisible} onSubmit={onEditSubmit} initialVals={formInitialVals} />
      : <Form isVisible={isFormVisible} setIsFormVisible={setIsFormVisible} onSubmit={onFormSubmit} />
  }


  if (!data) return <EuiLoadingSpinner size="l" />
  return (
    <div className="App">
      <Header />
      <Page >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <EuiPanel style={{ height: "600px", width: "500px" }}>
            <EuiButton onClick={onAddPropertyClick} >Add Property</EuiButton>
            <FormComponent />
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

import { useState } from 'react';
import {
  EuiListGroup,
  EuiListGroupItem,
  EuiLoadingSpinner,
  EuiPanel,
  EuiButton,
  EuiComboBox,
  EuiPageBody,
  EuiPageHeader,
  EuiText,
  EuiCard
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
  const [selectedOptions, setSelectedOptions] = useState<any>(options())

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
    if (!data) return
    const houses = await updateHouse({ ...house, _id: data[selected]._id })
    setData(houses);
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

  function options() {
    return [
      { label: 'square feet' },
      { label: 'bedrooms' },
      { label: 'Date purchased' },
      { label: 'bathrooms' },
      { label: 'Purchase price' },
    ]
  }

  if (!data) return <EuiLoadingSpinner size="l" />
  return (
    <div className="App">
      <Header />
      <Page >
        <EuiPageHeader style={{ display: 'flex', flexDirection: 'column' }}>

          <EuiText>Select statistics</EuiText>
          <EuiComboBox options={options()} selectedOptions={selectedOptions} onChange={(selectedOptions) => setSelectedOptions(selectedOptions)} fullWidth={true} style={{ margin: 10 }} />

        </EuiPageHeader>
        <EuiPageBody style={{ display: 'flex', flexDirection: 'row', width: '100%', overflowY: 'hidden' }}>
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
                  wrapText
                  className='eui-yScrollWithShadows'
                />
              )}
            </EuiListGroup>
          </EuiPanel>
          <HouseContent selectedOptions={selectedOptions} house={data[selected]} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
        </EuiPageBody>
      </Page>
    </div>
  );
}

export default App;

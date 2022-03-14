import { useState } from 'react'
import {
  EuiButton,
  EuiFieldNumber,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiDatePicker
} from '@elastic/eui'
import moment, { Moment } from 'moment';
function Form({ isVisible, setIsFormVisible }: { isVisible: boolean, setIsFormVisible: any }) {
  const [address, setAddress] = useState<string>('')
  const [squareFeet, setSquareFeet] = useState<number | undefined>()
  const [bedrooms, setBedrooms] = useState<number | undefined>()
  const [bathrooms, setBathrooms] = useState<number | undefined>()
  const [purchasePrice, setPurchasePrice] = useState<number | undefined>()
  const [date, setDate] = useState<Moment | null>(moment())


  const onClose = () => {
    // reset field state
    setIsFormVisible(false)
  }
  const onSubmit = () => {

  }

  if (!isVisible) return <></>

  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h1>Add Property</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiForm>
          <EuiFormRow label="Address">
            <EuiFieldText value={address} onChange={(e) => setAddress(e.target.value)} />
          </EuiFormRow>
          <EuiFormRow label="Square feet">
            <EuiFieldNumber value={squareFeet} onChange={(e) => setSquareFeet(parseInt(e.target.value))} />
          </EuiFormRow>
          <EuiFormRow label="Bedrooms">
            <EuiFieldNumber value={bedrooms} onChange={(e) => setBedrooms(parseInt(e.target.value))} />
          </EuiFormRow>
          <EuiFormRow label="Bathrooms">
            <EuiFieldNumber value={bathrooms} onChange={(e) => setBathrooms(parseInt(e.target.value))} />
          </EuiFormRow>
          <EuiFormRow label="Date Purchased">
            <EuiDatePicker showTimeSelect selected={date} onChange={(d) => setDate(d)} />
          </EuiFormRow>
          <EuiFormRow label="Purchase price">
            <EuiFieldNumber value={purchasePrice} onChange={(e) => setPurchasePrice(parseInt(e.target.value))} />
          </EuiFormRow>

        </EuiForm>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton type="submit" onClick={onClose}>
          Cancel
        </EuiButton>
        <EuiButton type="submit" fill>
          Save property
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  )
}

export default Form
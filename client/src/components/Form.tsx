import { useState } from 'react'
import {
  EuiText,
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
  EuiDatePicker,
  EuiSpacer
} from '@elastic/eui'
import moment, { Moment } from 'moment';
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { HouseInterface } from '../../../types';



function Form({ isVisible, setIsFormVisible, initialVals }: { isVisible: boolean, setIsFormVisible: any, initialVals?: HouseInterface }) {



  const [address, setAddress] = useState<string>(initialVals?.address || '')
  const [squareFeet, setSquareFeet] = useState<number | string>(initialVals?.squareFeet || '')
  const [bedrooms, setBedrooms] = useState<number | string>(initialVals?.bedrooms || '')
  const [bathrooms, setBathrooms] = useState<number | string>(initialVals?.bathrooms || '')
  const [purchasePrice, setPurchasePrice] = useState<number | string>(initialVals?.purchasePrice || '')
  const [date, setDate] = useState<Moment | null>(moment(initialVals?.datePurchased) || moment())
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(initialVals?.description || "")))

  const onClose = () => {
    // reset field state
    resetFormState()
    setIsFormVisible(false)
  }
  const onSubmit = () => {
    console.log('editorState', editorState)
  }

  function resetFormState() {
    setAddress('')
    setSquareFeet('')
    setBedrooms('')
    setBathrooms('')
    setPurchasePrice('')
    setDate(null)
    setEditorState(EditorState.createEmpty())
  }

  if (!isVisible) return <></>

  return (
    <EuiModal onClose={onClose} >
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h1>Add Property</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody style={{ display: 'flex', flexDirection: 'row' }}>
        <EuiForm>
          <EuiFormRow label="Address">
            <EuiFieldText value={address} onChange={(e) => setAddress(e.target.value)} />
          </EuiFormRow>
          <EuiFormRow label="Square feet">
            <EuiFieldNumber append={"ft\u00B2"} value={squareFeet} onChange={(e) => setSquareFeet(parseInt(e.target.value))} />
          </EuiFormRow>
          <EuiFormRow label="Bedrooms">
            <EuiFieldNumber value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
          </EuiFormRow>
          <EuiFormRow label="Bathrooms">
            <EuiFieldNumber value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
          </EuiFormRow>
          <EuiFormRow label="Date Purchased">
            <EuiDatePicker showTimeSelect selected={date} onChange={(d) => setDate(d)} />
          </EuiFormRow>
          <EuiFormRow label="Purchase price">
            <EuiFieldNumber prepend={"$"} value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
          </EuiFormRow>
        </EuiForm>
        <EuiSpacer />
        <div >
          <EuiText><h2>Description</h2></EuiText>
          <Editor editorState={editorState} onEditorStateChange={setEditorState} />
        </div>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton type="submit" onClick={onClose}>
          Cancel
        </EuiButton>
        <EuiButton type="submit" fill onClick={onSubmit}>
          Save property
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  )
}

export default Form
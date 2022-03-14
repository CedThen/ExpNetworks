import { useEffect, useState } from 'react'
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
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui'
import moment, { Moment } from 'moment';
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { HouseInterface } from '../../../types';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function Form({ isVisible, setIsFormVisible, onSubmit, initialVals }:
  { isVisible: boolean, setIsFormVisible: any, onSubmit: (house: any) => void, initialVals?: HouseInterface }) {
  const [address, setAddress] = useState<string>(initialVals?.address || '')
  const [squareFeet, setSquareFeet] = useState<number | string>(initialVals?.squareFeet || '')
  const [bedrooms, setBedrooms] = useState<number | string>(initialVals?.bedrooms || '')
  const [bathrooms, setBathrooms] = useState<number | string>(initialVals?.bathrooms || '')
  const [purchasePrice, setPurchasePrice] = useState<number | string>(initialVals?.purchasePrice || '')
  const [date, setDate] = useState<Moment | null>(moment(initialVals?.datePurchased) || moment())
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(initialVals?.description || "")))

  const onClose = (): void => {
    resetFormState()
    setIsFormVisible(false)
  }

  const onSubmitClick = (): void => {
    onSubmit(createHouse())
    setIsFormVisible(false);
    resetFormState()
  }

  function createDraftFromHtml(str: string) {
    const blocksFromHtml = htmlToDraft(str);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
  }

  function createHouse() {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = draftToHtml(rawContentState)
    return {
      address,
      squareFeet,
      bedrooms,
      bathrooms,
      purchasePrice,
      datePurchased: date?.format(),
      description: markup
    }
  }

  function resetFormState() {
    setAddress('')
    setSquareFeet('')
    setBedrooms('')
    setBathrooms('')
    setPurchasePrice('')
    setDate(moment())
    setEditorState(EditorState.createEmpty())
  }

  function tryParseJSONObject(jsonString: string) {
    try {
      var o = JSON.parse(jsonString);
      if (o && typeof o === "object") {
        return o;
      }
    }
    catch (e) { }
    return jsonString;
  };

  useEffect(() => {
    if (!initialVals) {
      resetFormState()
      return
    }
    setAddress(initialVals.address)
    setSquareFeet(initialVals.squareFeet)
    setBedrooms(initialVals.bedrooms)
    setBathrooms(initialVals.bathrooms)
    setPurchasePrice(initialVals.purchasePrice)
    setDate(moment(initialVals.datePurchased))


    setEditorState(createDraftFromHtml(tryParseJSONObject(initialVals.description)))
  }, [initialVals])

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
          <EuiFlexGroup style={{ maxWidth: 400, boxSizing: 'border-box', marginTop: 1, marginBottom: 1 }}>
            <EuiFlexItem>
              <EuiFormRow label="Bedrooms">
                <EuiFieldNumber value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Bathrooms">
                <EuiFieldNumber value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFormRow label="Date Purchased">
            <EuiDatePicker showTimeSelect selected={date} onChange={(d) => setDate(d)} />
          </EuiFormRow>
          <EuiFormRow label="Purchase price">
            <EuiFieldNumber prepend={"$"} value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
          </EuiFormRow>
        </EuiForm>
        <div >
          <EuiText><h3>Description</h3></EuiText>
          <Editor editorState={editorState} onEditorStateChange={setEditorState} />
        </div>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton type="submit" onClick={onClose}>
          Cancel
        </EuiButton>
        <EuiButton type="submit" fill onClick={onSubmitClick}>
          Save property
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  )
}

export default Form
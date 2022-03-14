import {
  EuiModal,
  EuiModalHeader,
  EuiModalBody,
  EuiModalHeaderTitle,
  EuiText,
  EuiModalFooter,
  EuiButton
} from '@elastic/eui'

function DeleteConfirmation({ isVisible, onClose, onDeleteSubmit }:
  { isVisible: boolean, onClose: () => void, onDeleteSubmit: () => void }) {

  if (!isVisible) return <></>
  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h2>Delete confirmation</h2>
        </EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiText>
          <p>Are you sure you wish to delete this property?</p>
        </EuiText>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton type="submit" onClick={onClose}>
          Cancel
        </EuiButton>
        <EuiButton color='danger' type="submit" fill onClick={onDeleteSubmit}>
          Delete property
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  )
}

export default DeleteConfirmation
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiText
} from '@elastic/eui'

function Header() {
  return (
    <EuiHeader style={{ marginBottom: 10 }}>
      <EuiHeaderSection>
        <EuiHeaderSectionItem >
          <EuiText style={{ marginLeft: 10 }}>
            Express Networks Code Challenge
          </EuiText>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  )
}

export default Header
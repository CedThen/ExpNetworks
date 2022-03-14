import { EuiTitle, EuiFlexGroup, EuiStat, EuiPanel, EuiText, EuiButton } from '@elastic/eui'
import { HouseInterface } from '../../../types'
import ReactHtmlParser from 'react-html-parser';

function isJsonString(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}


function HouseContent({ house, onDeleteClick, onEditClick, selectedOptions }:
  { house: HouseInterface, onDeleteClick: () => void, onEditClick: () => void, selectedOptions: { label: string }[] }) {
  const { address, squareFeet, bedrooms, datePurchased, bathrooms, purchasePrice, description } = house
  const displaySquareFeet = new Intl.NumberFormat().format(squareFeet)
  const displayDate = new Date(datePurchased).toLocaleString();
  const displayPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(purchasePrice)
  const markup = isJsonString(description) ? ReactHtmlParser(JSON.parse(description)) : ReactHtmlParser(description)

  const Stats = {
    'square feet': <EuiStat key={0} titleSize='m' title={`${displaySquareFeet} ft\u00B2`} description="Square footage" />,
    'bedrooms': <EuiStat key={1} titleSize='m' title={`${bedrooms}`} description="Bedrooms" />,
    'Date purchased': <EuiStat key={2} titleSize='m' title={`${displayDate}`} description="Date purchased" />,
    'bathrooms': <EuiStat key={3} titleSize='m' title={`${bathrooms}`} description="Bathrooms" />,
    'Purchase price': <EuiStat key={4} titleSize='m' title={`${displayPrice}`} description="Purchase price" />
  }
  const filteredStats = () => {
    // @ts-ignore
    let arr = selectedOptions.map((option: any) => Stats[option.label])
    return arr;
  }

  return (
    <EuiPanel style={{ position: 'relative', height: 600, width: '100%', marginLeft: 40, padding: 30, boxSizing: 'border-box' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: 100 }}>
        <EuiButton size='s' iconType="pencil" onClick={onEditClick} />
        <EuiButton size='s' color='danger' iconType="trash" onClick={onDeleteClick} />
      </div>
      <EuiTitle size='l' >
        <h1 style={{ padding: 5 }}>{address}</h1>
      </EuiTitle>
      <EuiFlexGroup
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr ',
          gridTemplateRows: '1fr 1fr 1fr',
          margin: 10,
          alignItems: 'center'
        }}>
        {filteredStats()}
      </EuiFlexGroup>
      <br />
      <EuiText textAlign='left'>
        <h2>Description: </h2>
        <div>{markup}</div>
      </EuiText>
    </EuiPanel>
  )
}

export default HouseContent
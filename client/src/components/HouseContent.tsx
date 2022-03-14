import { EuiTitle, EuiFlexGroup, EuiStat, EuiPanel, EuiText, EuiButton, EuiModal } from '@elastic/eui'

import { HouseInterface } from '../../../types'

function HouseContent({ house, onDeleteClick, onEditClick }:
  { house: HouseInterface, onDeleteClick: () => void, onEditClick: (house: HouseInterface) => void }) {
  const { address, squareFeet, bedrooms, datePurchased, bathrooms, purchasePrice, description } = house
  const displaySquareFeet = new Intl.NumberFormat().format(squareFeet)
  const displayDate = new Date(datePurchased).toLocaleString();
  const displayPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(purchasePrice)

  return (
    <EuiPanel style={{ position: 'relative', height: 600, width: '100%', marginLeft: 40, padding: 30, boxSizing: 'border-box' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: 100 }}>
        <EuiButton size='s' iconType="pencil" />
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

        <EuiStat titleSize='m' title={`${displaySquareFeet} ft\u00B2`} description="Square footage" />
        <EuiStat titleSize='m' title={`${bedrooms}`} description="Bedrooms" />
        <EuiStat titleSize='m' title={`${displayDate}`} description="Date purchased" />
        <EuiStat titleSize='m' title={`${bathrooms}`} description="Bathrooms" />
        <EuiStat titleSize='m' title={`${displayPrice}`} description="Purchase price" />
      </EuiFlexGroup>
      <br />
      <EuiText textAlign='left'>
        <h2>Description: </h2>
        <p>{description}</p>
      </EuiText>
    </EuiPanel>
  )
}

export default HouseContent
import { EuiTitle, EuiFlexGroup, EuiFlexItem, EuiStat, EuiPanel } from '@elastic/eui'
import React from 'react'
import { HouseInterface } from '../../../types'
import { css } from '@emotion/react';


function HouseContent({ house }: { house: HouseInterface }) {
  return (
    <EuiPanel style={{ width: '100%', marginLeft: 40, padding: 10 }}>
      <EuiTitle size='l'>
        <h1 >{house.address}</h1>
      </EuiTitle>
      <EuiFlexGroup style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
        <EuiFlexItem >
          <EuiStat title={`${house.squareFeet} ft\u00B2`} description="Square footage" />
          <EuiStat title={`${house.bedrooms}`} description="Bedrooms" />
        </EuiFlexItem>
        <EuiFlexItem >
          <EuiStat title={`${house.datePurchased}`} description="Date purchased" />
          <EuiStat title={`${house.bathrooms}`} description="Bathrooms" />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  )
}

export default HouseContent
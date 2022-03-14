import { ReactNode } from 'react';
import { EuiPageTemplate } from '@elastic/eui';

const Page = ({ children }:
  { children: ReactNode }) => {
  return (
    <EuiPageTemplate
      pageHeader={{
        pageTitle: 'Your Properties',
      }}
    >
      {children}
    </EuiPageTemplate>
  );
};

export default Page
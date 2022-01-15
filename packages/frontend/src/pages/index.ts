import React from 'react';

import BannerMasthead from 'components/layout/BannerMasthead';
import DefaultLayout from 'components/layout/DefaultLayout';
import UploadTool from 'components/core/UploadTool';

const Index = () => {
  return (
    <DefaultLayout>
      <BannerMasthead />
      <UploadTool />
    </DefaultLayout>
  );
};

export default Index;

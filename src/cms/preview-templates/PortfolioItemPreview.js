import React from 'react';
import { PortfolioItemTemplate } from '../../templates/portfolio-item';

const PortfolioItemPreview = ({ entry, widgetFor }) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
);

export default PortfolioItemPreview;

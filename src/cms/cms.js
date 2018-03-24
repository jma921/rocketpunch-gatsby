import CMS from 'netlify-cms';

import PortfolioItemPreview from './preview-templates/PortfolioItemPreview';

CMS.registerPreviewStyle('/styles.css');

CMS.registerPreviewTemplate('portfolio', PortfolioItemPreview);

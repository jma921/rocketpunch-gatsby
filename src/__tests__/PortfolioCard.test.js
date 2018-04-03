import React from 'react';
import renderer from 'react-test-renderer';
import PortfolioCard from '../components/PortfolioCard';

test('Renders PortfolioCard component', () => {
  const component = renderer.create(<PortfolioCard />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  //   tree.props.onMouseEnter();
  //   // re-rendering
  //   tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();

  //   // manually trigger the callback
  //   tree.props.onMouseLeave();
  //   // re-rendering
  //   tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
});

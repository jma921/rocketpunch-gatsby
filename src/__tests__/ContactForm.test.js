import React from 'react';
import renderer from 'react-test-renderer';
import ContactForm from '../components/ContactForm';

test('Renders ContactForn component', () => {
  const component = renderer.create(<ContactForm />);
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

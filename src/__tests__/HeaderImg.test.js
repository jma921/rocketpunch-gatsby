import React from 'react';
import renderer from 'react-test-renderer';
import HeaderImg from '../components/HeaderImg';

const sizes = {
  aspectRatio: 1.4109347442680775,
  base64:
    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAOABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIEAwf/xAAgEAABBAIBBQAAAAAAAAAAAAABAAIDIQQSMREiQYHR/8QAFgEBAQEAAAAAAAAAAAAAAAAABAMF/8QAGxEAAgMAAwAAAAAAAAAAAAAAAQIAEjEDBBH/2gAMAwEAAhEDEQA/AONAdfFDlaBoTtio9x+pNSJNSUS3uTTqV0S6GFjomkyRtrgoUWZWQ7WhVekKI4WYWtsQewqGpXJ//9k=',
  sizes: '(max-width: 1080px) 100vw, 1080px',
  src: '/static/dark-bg-1eba63084a303b30ed3ba9939c27ee26-978f9.png'
};

test('Renders HeaderImg component', () => {
  const component = renderer.create(<HeaderImg sizes={sizes} />);
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

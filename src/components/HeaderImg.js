import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// const Image = styled(Img)`
//   margin-top: -52px;
//   display: inherit;
//   height: 65vh;
// `;

const Image = styled(Img)`
  display: block;
  margin-top: -52px;
  position: inherit;
  width: 100%;
  height: 65vh;
  cursor: pointer;
  .gatsby-image-wrapper > img {
    position: inherit;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 65vh;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Text = styled.p`
  color: white;
  text-align: left;
  font-size: 2rem;
  font-weight: normal;
`;

const Span = styled.span`
  background: white;
  color: #ff4401;
  padding: 0.25rem;
  font-weight: 600;
`;

const HeaderImg = props => {
  return (
    <div>
      <Image sizes={props.sizes} />
      <Overlay>
        <Text>
          We create beautifully-crafted designs that <Span>stand out</Span> from
          the crowd.
        </Text>
      </Overlay>
    </div>
  );
};

HeaderImg.propTypes = {
  sizes: PropTypes.object
};

export default HeaderImg;

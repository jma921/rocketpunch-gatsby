import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'styled-components';

const Container = styled.figure`
  cursor: pointer;
`;

const Image = styled(Img)`
  display: block;
  position: inherit;
  width: 100%;
  height: auto;
  cursor: pointer;
  .gatsby-image-wrapper > img {
    position: inherit;
  }
`;

const Overlay = styled.div`
  border: 8px solid #f40;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.2s ease;
  background-color: white; // Overlay background color
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;

const Text = styled.p`
  color: #333333;
  text-align: center;
  font-size: 2rem;
  font-weight: normal;
`;

const SubText = styled.p`
  color: #aaaaaa;
  text-align: center;
  font-size: 1rem;
  font-weight: 100;
  text-transform: uppercase;
`;

const PortfolioCard = props => {
  const { post } = props;
  return (
    <div className="column is-one-third" key={post.id}>
      <Link to={post.fields.slug}>
        <div className="thumb">
          <div className="card-image">
            <Container>
              <Image
                imgStyle={{ position: 'inherit' }}
                sizes={post.frontmatter.image.childImageSharp.sizes}
                alt={post.frontmatter.title}
              />
              <Overlay>
                <Text>{post.frontmatter.title}</Text>
                <SubText>{post.frontmatter.description}</SubText>
              </Overlay>
            </Container>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PortfolioCard;

import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Content, { HTMLContent } from '../components/Content';

export const PortfolioItemTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  images
}) => {
  const PostContent = contentComponent || Content;
  console.log(images);
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content portfolio-item">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            {images.imagePath ? (
              <Img
                style={{ marginBottom: '3rem' }}
                sizes={images.imagePath.childImageSharp.sizes}
                title="ihihiuhiuh"
              />
            ) : null}
            {images.imagePath2 ? (
              <Img
                style={{ marginBottom: '3rem' }}
                sizes={images.imagePath2.childImageSharp.sizes}
              />
            ) : null}
            {images.imagePath3 ? (
              <Img
                style={{ marginBottom: '3rem' }}
                sizes={images.imagePath3.childImageSharp.sizes}
              />
            ) : null}
            {/*
              <PostContent content={content} />
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default props => {
  const { markdownRemark: post } = props.data;
  console.log(props);
  return (
    <PortfolioItemTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`Work | ${post.frontmatter.title}`} />}
      title={post.frontmatter.title}
      images={post.fields}
    />
  );
};

export const pageQuery = graphql`
  query PortfolioItemByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        imagePath {
          childImageSharp {
            sizes(maxWidth: 800, maxHeight: 600) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;

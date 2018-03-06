import React from 'react';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

export const PortfolioItemTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default props => {
  const { markdownRemark: post } = props.data;

  return (
    <PortfolioItemTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`Work | ${post.frontmatter.title}`} />}
      title={post.frontmatter.title}
    />
  );
};

export const pageQuery = graphql`
  query PortfolioItemByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;

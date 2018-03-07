import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const Container = styled.figure`
  cursor: pointer;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #008cba;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;

const Text = styled.p`
  color: white;
  text-align: center;
  font-size: 1.5rem;
`;

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data);
    const { edges: posts } = data.allMarkdownRemark;
    const { edges: portfolio } = data.allMarkdownRemark;
    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Our Work</h1>
          </div>
          <div className="columns is-multiline">
            {portfolio
              .filter(
                post => post.node.frontmatter.templateKey === 'portfolio-item'
              )
              .map(({ node: post }) => (
                <div className="column is-one-third ">
                  <div className="card thumb" key={post.id}>
                    <div className="card-image">
                      <Container>
                        <Image
                          src="https://picsum.photos/1280/960?image=28"
                          alt="Placeholder image"
                        />
                        <Overlay>
                          <Text>{post.frontmatter.title}</Text>
                        </Overlay>
                      </Container>
                    </div>
                  </div>
                </div>
                // <div
                //   className="content column is-one-third"
                //   style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
                //   key={post.id}
                // >
                //   <p>
                //     <Link className="has-text-primary" to={post.fields.slug}>
                //       {post.frontmatter.title}
                //     </Link>
                //     <span> &bull; </span>
                //     <small>{post.frontmatter.date}</small>
                //   </p>
                //   <p>
                //     {post.excerpt}
                //     <br />
                //     <br />
                //     <Link className="button is-small" to={post.fields.slug}>
                //       Keep Reading →
                //     </Link>
                //   </p>
                // </div>
              ))}
          </div>
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
          </div>
          {posts
            .filter(post => post.node.frontmatter.templateKey === 'blog-post')
            .map(({ node: post }) => (
              <div
                className="content"
                style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
                key={post.id}
              >
                <p>
                  <Link className="has-text-primary" to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <small>{post.frontmatter.date}</small>
                </p>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button is-small" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </div>
            ))}
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            thumbnailImage
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

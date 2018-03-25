const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
        }
      });
    });
  });
};

// exports.onCreateNode = ({ node, boundActionCreators, getNode, getNodes }) => {
//   const {
//     createNode,
//     createNodeField,
//     createParentChildLink
//   } = boundActionCreators;

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode });
//     createNodeField({
//       name: `slug`,
//       node,
//       value
//     });
//   }
// };

exports.onCreateNode = ({
  node,
  getNode,
  getNodes,
  loadNodeContent,
  boundActionCreators
}) => {
  const {
    createNode,
    createNodeField,
    createParentChildLink
  } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const prefix = '../../../static';
    const { imagePath, imagePath2, imagePath3 } = node.frontmatter;
    const newImagePath = prefix + node.frontmatter.image;
    const newImagePath2 = prefix + node.frontmatter.image2;
    const newImagePath3 = prefix + node.frontmatter.image3;
    createNodeField({
      node,
      name: `imagePath`,
      value: newImagePath
    });
    if (newImagePath2) {
      createNodeField({
        node,
        name: `imagePath2`,
        value: newImagePath2
      });
    }
    if (newImagePath3) {
      createNodeField({
        node,
        name: `imagePath3`,
        value: newImagePath3
      });
    }

    const { frontmatter } = node;
    if (frontmatter) {
      const { image } = frontmatter;
      if (image) {
        if (image.indexOf('/img') === 0) {
          frontmatter.image = path.relative(
            path.dirname(node.fileAbsolutePath),
            path.join(__dirname, '/static/', image)
          );
        }
      }
    }

    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

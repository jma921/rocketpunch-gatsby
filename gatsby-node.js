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

exports.onCreateNode = ({ node, boundActionCreators, getNode, getNodes }) => {
  const {
    createNode,
    createNodeField,
    createParentChildLink
  } = boundActionCreators;

  // const { frontmatter } = node;
  // if (frontmatter) {
  //   const { image } = frontmatter;
  //   if (image) {
  //     if (image.indexOf('/img') === 0) {
  //       frontmatter.image = path.relative(
  //         path.dirname(node.fileAbsolutePath),
  //         path.join(__dirname, '/static/', image)
  //       );
  //     }
  //   }
  // }

  // const pathToFile = path.resolve(
  //   getNode(node.parent).absolutePath,
  //   node.frontmatter.image
  // );
  // // Find ID of File node
  // const fileNode = getNodes().find(n => n.absolutePath === pathToFile);
  // createNodeField({
  //   node,
  //   name: `imageLink___NODE`,
  //   value: fileNode.id
  // });

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });

    // // Attach thumbnail's ImageSharp node by public path if necessary
    // if (typeof node.frontmatter.image === 'string') {
    //   // Find absolute path of linked path
    //   const pathToFile = path
    //     .join(__dirname, 'static', node.frontmatter.image)
    //     .split(path.sep)
    //     .join('/');

    //   // Find ID of File node
    //   console.log(pathToFile);
    //   const fileNode = getNodes().find(n => n.absolutePath === pathToFile);

    //   if (fileNode != null) {
    //     // Find ImageSharp node corresponding to the File node
    //     const imageSharpNodeId = fileNode.children.find(n =>
    //       n.endsWith('>> ImageSharp')
    //     );
    //     const imageSharpNode = getNodes().find(n => n.id === imageSharpNodeId);

    //     // Add ImageSharp node as child
    //     createParentChildLink({ parent: node, child: imageSharpNode });
    //   }
    // }
  }
};

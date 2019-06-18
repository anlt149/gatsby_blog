import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Img from 'gatsby-image'
import styled from "styled-components";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const StyledLink = styled(Link)`
      color: 	#000;
      text-decoration: none;
      &:hover {
        color: #9ea3aa;
      }
    `;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Blog" />
        <Bio />
        <hr/>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                  textAlign: `center`,
                  lineHeight: `40px`
                }}
              >
                <StyledLink style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                   <Img sizes={node.frontmatter.featuredImage.childImageSharp.sizes}/>
                </StyledLink>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <hr />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            description
          }
        }
      }
    }
  }
`

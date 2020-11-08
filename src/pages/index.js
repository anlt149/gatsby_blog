import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
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
              <div className="post-info">
                <p className="tag-date">{node.frontmatter.date} <span>
                  {node.frontmatter.tags.map((tag, index) => {
                    return (
                      <span key={index} className="tag">
                        <Link to={`/tags/${tag}`} className = "chip tag">
                          {tag}
                        </Link> {' '}
                      </span>
                    )
                    })}</span>
                </p>
              </div>
              <div className="post-title">
                <StyledLink style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </StyledLink>
              </div>
                
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <Img className="post-featured-img" fluid={node.frontmatter.featuredImage.childImageSharp.fluid}/>
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
            date(formatString: "MMMM YYYY")
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 630, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            description
            tags
          }
        }
      }
    }
  }
`

import React from "react"
import PropTypes from "prop-types"

import styled from "styled-components";
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { rhythm } from "../utils/typography"
import "../templates/layout.css"
import "../templates/tags.css"
const Tags = ({pageContext, data}) => {
    const ListItem = styled.li`
      list-style-type: none;
      text-decoration: none;
    `;

    const StyledLink = styled(Link)`
    color: 	#000;
    text-decoration: none;
    &:hover {
      color: #9ea3aa;
    }
  `;

    const { tag } = pageContext
    const { edges} = data.allMarkdownRemark
    const tagHeader = `${tag}`

    return (
      <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
            <h1 className="tag-header">#{tagHeader}</h1>
            <ul>
                {edges.map(( {node} ) => {
                    const { slug } = node.fields
                    const { title} = node.frontmatter
                    const { date } = node.frontmatter
                    return (
                        <ListItem key={slug}>
                          <div>
                            <p className="tag-date">{date}  <span>
                            <Link to={`/tags/${tag}`} className = "tag">#{tag}</Link>{' '}
                            </span></p>
                          </div>
                            <StyledLink className="post-title" style={{ boxShadow: `none` }} to={slug}>{title}
                          </StyledLink>
                            <Img fluid={node.frontmatter.featuredImage.childImageSharp.fluid}/>
                          <p dangerouslySetInnerHTML={{__html:  node.excerpt }}/>
                          <hr />
                        </ListItem>
                        
                    )
                })}
            </ul>
                     {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
            <Link to="/tags">All tags</Link>
        </div>
    )
}


Tags.propTypes = {
    pageContext: PropTypes.shape({
      tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        totalCount: PropTypes.number.isRequired,
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
              }),
              fields: PropTypes.shape({
                slug: PropTypes.string.isRequired,
              }),
            }),
          }).isRequired
        ),
      }),
    }),
  }
  
  export default Tags
  
  export const pageQuery = graphql`
    query($tag: String) {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { tags: { in: [$tag] } } }
      ) {
        totalCount
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMM YYYY")
              title
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 630, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt
          }
        }
      }
}
`
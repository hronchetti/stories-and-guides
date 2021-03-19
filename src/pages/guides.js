import React from "react"
import { graphql } from "gatsby"

import {
  Layout,
  Seo,
  FilterGroup,
  SortButton,
  PhotoCard,
  ActiveFilter,
} from "../components"

const Guides = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const { heading, seo } = data.pageData
  const [guides, setGuides] = React.useState([])
  const [filters, setFilters] = React.useState({
    all: [],
    selected: [],
  })
  const [sortOptions, setSortOptions] = React.useState({
    selected: "Latest",
    options: ["Latest", "Alphabetical"],
  })

  const setUpFilters = (items) => {
    let newItemsArray = []

    if (items && items.length > 0) {
      items.map(
        (item) =>
          item.node.destinationGuides &&
          item.node.destinationGuides.length > 0 &&
          item.node.destinationGuides.map((guide) => {
            if (
              newItemsArray.length === 0 ||
              newItemsArray.some((item) => item !== guide.destination.name)
            ) {
              newItemsArray.push(guide.destination.name)
            }
          })
      )
    }
    return newItemsArray
  }

  const removeSelectedFilter = (changedFilter) => {
    setFilters((curFilters) => ({
      ...curFilters,
      selected: [
        ...curFilters.selected.filter(
          (selectedFilter) => selectedFilter !== changedFilter
        ),
      ],
    }))
  }

  React.useEffect(() => {
    setFilters({
      all: setUpFilters(data.guides.edges),
      selected: [],
    })
  }, [])

  React.useEffect(() => {
    setGuides(data.guides.edges)
  }, [data])

  return (
    <Layout heading={heading}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/guides/`}
        image={seo.image.file.url}
      />
      <section className="filter-system">
        <div>
          <FilterGroup
            name="Destinations"
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div>
          <SortButton options={sortOptions} setSortOptions={setSortOptions} />
        </div>
      </section>
      {filters.selected.length > 0 && (
        <section className="active-filters">
          {filters.selected.map((selectedFilter) => (
            <ActiveFilter
              key={selectedFilter}
              name={selectedFilter}
              removeFn={() => removeSelectedFilter(selectedFilter)}
            />
          ))}
        </section>
      )}
      {guides && guides.length > 0 && (
        <section
          className={`${
            guides.length > 2 ? "grid-col-4" : "grid-col-2"
          } filter-system-results`}
        >
          {guides.map(({ node }) => (
            <PhotoCard
              key={node.contentful_id}
              photo={node.coverPhoto.fluid}
              photoDesc={node.coverPhoto.title}
              title={node.name}
              to={`/guides/${node.slug}/`}
            />
          ))}
        </section>
      )}
    </Layout>
  )
}

export default Guides

export const pageQuery = graphql`
  query getAllGuides {
    site {
      siteMetadata {
        siteUrl
      }
    }
    pageData: contentfulCollectionPage(
      contentful_id: { eq: "9z9k4V72w3jRmRFSI79vT" }
    ) {
      heading
      seo {
        metaDescription {
          metaDescription
        }
        title
        image {
          file {
            url
          }
        }
      }
    }
    guides: allContentfulGuides(sort: { order: ASC, fields: name }) {
      edges {
        node {
          contentful_id
          slug
          coverPhoto {
            title
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
          }
          name
          destinationGuides {
            id
            name
            destination {
              id
              name
            }
          }
        }
      }
    }
  }
`

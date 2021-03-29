import React from "react"
import { graphql } from "gatsby"

import {
  Layout,
  Seo,
  FilterSystem,
  PhotoCard,
  FiltersLoader,
} from "../components"
import { orderResults, updateFilters } from "../utilities"

const Guides = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const { heading, seo } = data.pageData
  const allGuides = data.guides.edges

  const [loading, setLoading] = React.useState(false)
  const [guides, setGuides] = React.useState([])
  const [filters, setFilters] = React.useState({
    name: "Destinations",
    all: [],
    selected: [],
    visible: false,
  })
  const [sortOptions, setSortOptions] = React.useState({
    selected: "Alphabetical",
    options: ["Alphabetical", "Latest"],
    visible: false,
  })

  const setUpFilters = (items) => {
    let destinations = []

    if (items && items.length > 0) {
      items.map(
        (item) =>
          item.node.destinationGuides &&
          item.node.destinationGuides.length > 0 &&
          item.node.destinationGuides.map((guide) => {
            if (
              destinations.length === 0 ||
              destinations.some((item) => item !== guide.destination.name)
            ) {
              destinations.push(guide.destination.name)
            }
          })
      )
    }
    return destinations
  }

  const filterGuides = () => {
    setLoading(true)

    if (filters.selected.length > 0) {
      const results = allGuides.filter((guide) => {
        if (
          guide.node.destinationGuides &&
          guide.node.destinationGuides.length > 0
        ) {
          let hasDestinations = false
          guide.node.destinationGuides.map((destination) => {
            if (
              filters.selected.some(
                (selectedFilter) =>
                  selectedFilter === destination.destination.name
              )
            ) {
              hasDestinations = true
            }
          })
          return hasDestinations
        } else {
          return false
        }
      })
      setGuides(orderResults(results, sortOptions.selected))
    } else {
      setGuides(orderResults(allGuides, sortOptions.selected))
    }
    setTimeout(() => {
      setLoading(false)
    }, 150)
  }

  React.useEffect(() => {
    setGuides(allGuides)
    setFilters({
      name: "Destinations",
      all: setUpFilters(allGuides),
      selected: [],
      visible: false,
    })
  }, [allGuides])

  React.useLayoutEffect(() => {
    filterGuides()
  }, [filters.selected])

  React.useEffect(() => {
    setLoading(true)
    setGuides(orderResults(guides, sortOptions.selected))
    setTimeout(() => {
      setLoading(false)
    }, 150)

    setTimeout(() => {
      setSortOptions((curOptions) => ({
        ...curOptions,
        visible: false,
      }))
    }, 300)
  }, [sortOptions.selected])

  return (
    <Layout heading={heading}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/guides/`}
        image={seo.image.file.url}
      />
      <FilterSystem
        filters={filters}
        orderResults={orderResults}
        setFilters={setFilters}
        setSortOptions={setSortOptions}
        sortOptions={sortOptions}
        updateResults={updateFilters}
      />
      {guides && guides.length > 0 && (
        <section
          className={`${
            guides.length > 2 ? "grid-col-4" : "grid-col-2"
          } filter-system-results`}
        >
          <FiltersLoader loading={loading}>
            {guides.map(({ node }) => (
              <PhotoCard
                key={node.contentful_id}
                photo={node.coverPhoto.fluid}
                photoDesc={node.coverPhoto.title}
                title={node.name}
                to={`/guides/${node.slug}/`}
              />
            ))}
          </FiltersLoader>
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
          updatedAt
        }
      }
    }
  }
`

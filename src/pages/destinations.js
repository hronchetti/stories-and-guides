import React from "react"
import { graphql } from "gatsby"

import {
  Layout,
  PhotoCard,
  FilterSystem,
  FiltersLoader,
  Seo,
} from "../components"
import { orderResults, updateFilters } from "../utilities"

const Destinations = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const allDestinations = data.destinations.edges
  const { heading, seo } = data.pageData

  const [loading, setLoading] = React.useState(false)
  const [destinations, setDestinations] = React.useState([])
  const [filters, setFilters] = React.useState({
    name: "Regions",
    all: [],
    selected: [],
    visible: false,
  })
  const [sortOptions, setSortOptions] = React.useState({
    selected: "Alphabetical",
    options: ["Alphabetical", "Latest"],
    visible: false,
  })

  const setUpFilters = (destinations) => {
    let regions = []

    if (destinations && destinations.length > 0) {
      destinations.map((destination) => {
        if (
          regions.length === 0 ||
          regions.some((item) => item !== destination.node.region)
        ) {
          regions.push(destination.node.region)
        }
      })
    }
    return regions
  }

  const filterDestinations = () => {
    setLoading(true)

    if (filters.selected.length > 0) {
      const results = allDestinations.filter((destination) => {
        return filters.selected.some(
          (selectedFilter) => selectedFilter === destination.node.region
        )
      })
      setDestinations(orderResults(results, sortOptions.selected))
    } else {
      setDestinations(orderResults(allDestinations, sortOptions.selected))
    }
    setTimeout(() => {
      setLoading(false)
    }, 150)
  }

  React.useEffect(() => {
    setDestinations(allDestinations)
    setFilters({
      name: "Regions",
      all: setUpFilters(allDestinations),
      selected: [],
      visible: false,
    })
  }, [allDestinations])

  React.useLayoutEffect(() => {
    filterDestinations()
  }, [filters.selected])

  React.useEffect(() => {
    setLoading(true)
    setDestinations(orderResults(destinations, sortOptions.selected))
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
        url={siteUrl + `/destinations/`}
        image={seo.image && seo.image.file && seo.image.file.url}
      />
      <FilterSystem
        filters={filters}
        orderResults={orderResults}
        setFilters={setFilters}
        setSortOptions={setSortOptions}
        sortOptions={sortOptions}
        updateResults={updateFilters}
      />
      {destinations && destinations.length > 0 && (
        <section
          className={`${
            destinations.length > 2 ? "grid-col-4" : "grid-col-2"
          } filter-system-results`}
        >
          <FiltersLoader loading={loading}>
            {destinations.map(({ node }) => (
              <PhotoCard
                key={node.contentful_id}
                photo={node.coverPhoto.fluid}
                photoDesc={node.coverPhoto.title}
                title={node.name}
                to={`/destinations/${node.slug}/`}
              />
            ))}
          </FiltersLoader>
        </section>
      )}
    </Layout>
  )
}

export default Destinations

export const pageQuery = graphql`
  query getAllDestinations {
    site {
      siteMetadata {
        siteUrl
      }
    }
    pageData: contentfulCollectionPage(
      contentful_id: { eq: "XXnCamqqRwCYe0ZvmhtLT" }
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
    destinations: allContentfulDestinations(
      sort: { order: ASC, fields: name }
    ) {
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
          region
          updatedAt
        }
      }
    }
  }
`

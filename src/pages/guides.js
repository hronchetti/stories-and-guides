import React from "react"
import { graphql } from "gatsby"

import {
  Layout,
  Seo,
  FilterGroup,
  SortButton,
  PhotoCard,
  ActiveFilter,
  FiltersLoader,
} from "../components"

const Guides = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const { heading, seo } = data.pageData
  const allGuides = data.guides.edges

  const [loading, setLoading] = React.useState(false)
  const [guides, setGuides] = React.useState([])
  const [filters, setFilters] = React.useState({
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

  const updateResults = (event) => {
    const changedFilter = event.target.name

    if (
      filters.selected.some(
        (selectedFilter) => selectedFilter === changedFilter
      )
    ) {
      setFilters((curFilters) => ({
        ...curFilters,
        selected: [
          ...curFilters.selected.filter(
            (selectedFilter) => selectedFilter !== changedFilter
          ),
        ],
      }))
    } else {
      setFilters((curFilters) => ({
        ...curFilters,
        selected: [...curFilters.selected, changedFilter],
      }))
    }

    setTimeout(() => {
      setFilters((curFilters) => ({
        ...curFilters,
        visible: false,
      }))
    }, 300)
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
      setGuides(orderResults(results))
    } else {
      setGuides(orderResults(allGuides))
    }
    setTimeout(() => {
      setLoading(false)
    }, 150)
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

  const orderResults = (guides) => {
    if (sortOptions.selected === "Alphabetical") {
      return guides.sort((guide1, guide2) =>
        guide1.node.name.localeCompare(guide2.node.name)
      )
    } else if (sortOptions.selected === "Latest") {
      return guides
        .sort(
          (guide1, guide2) =>
            new Date(guide1.node.updatedAt) - new Date(guide2.node.updatedAt)
        )
        .reverse()
    }
  }

  React.useEffect(() => {
    setGuides(allGuides)
    setFilters({
      all: setUpFilters(allGuides),
      selected: [],
    })
  }, [allGuides])

  React.useLayoutEffect(() => {
    filterGuides()
  }, [filters.selected])

  React.useEffect(() => {
    setLoading(true)
    setGuides(orderResults(guides))
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
      <section className="filter-system">
        <div>
          <FilterGroup
            name="Destinations"
            filters={filters}
            setFilters={setFilters}
            updateResults={updateResults}
          />
        </div>
        <div>
          <SortButton
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            orderResults={orderResults}
          />
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

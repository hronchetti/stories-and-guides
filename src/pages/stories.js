import React from "react"
import { graphql } from "gatsby"

import {
  Layout,
  PhotoCard,
  Seo,
  FilterGroup,
  SortButton,
  FiltersLoader,
  ActiveFilter,
} from "../components"
import { orderResults, updateFilters, removeSelectedFilter } from "../utilities"

const Stories = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const allStories = data.stories.edges
  const { heading, seo } = data.pageData

  const [loading, setLoading] = React.useState(false)
  const [stories, setStories] = React.useState([])
  const [filtersDestinations, setFiltersDestinations] = React.useState({
    name: "Desintations",
    all: [],
    selected: [],
    visible: false,
  })
  const [filtersGuides, setFiltersGuides] = React.useState({
    name: "Guides",
    all: [],
    selected: [],
    visible: false,
  })
  const [sortOptions, setSortOptions] = React.useState({
    selected: "Alphabetical",
    options: ["Alphabetical", "Latest"],
    visible: false,
  })

  const setUpDestinationFilters = (stories) => {
    let destinations = []

    stories.map((story) => {
      if (
        destinations.length === 0 ||
        destinations.some((item) => item !== story.node.destination.name)
      ) {
        destinations.push(story.node.destination.name)
      }
    })

    return destinations
  }

  const setUpGuideFilters = (stories) => {
    let guides = []

    stories.map((story) => {
      if (story.node.guides && story.node.guides.length > 0) {
        story.node.guides.map((guide) => {
          if (
            guides.length === 0 ||
            guides.some((item) => item !== guide.name)
          ) {
            guides.push(guide.name)
          }
        })
      }
    })

    return guides
  }

  const filterStories = () => {
    setLoading(true)

    if (
      filtersDestinations.selected.length > 0 ||
      filtersGuides.selected.length > 0
    ) {
      const results = allStories.filter((story) => {
        let hasGuides = false

        if (story.node.guides && story.node.guides.length > 0) {
          story.node.guides.map((guide) => {
            if (
              filtersGuides.selected.some(
                (selectedFilter) => selectedFilter === guide.name
              )
            ) {
              hasGuides = true
            }
          })
        }

        if (
          filtersDestinations.selected.some(
            (selectedFilter) => selectedFilter === story.node.destination.name
          )
        ) {
          hasGuides = true
        }

        return hasGuides
      })
      setStories(orderResults(results, sortOptions.selected, "story"))
    } else {
      setStories(orderResults(allStories, sortOptions.selected, "story"))
    }

    setTimeout(() => {
      setLoading(false)
    }, 150)
  }

  React.useEffect(() => {
    setStories(allStories)
    setFiltersDestinations({
      name: "Destinations",
      all: setUpDestinationFilters(allStories),
      selected: [],
      visible: false,
    })
    setFiltersGuides({
      name: "Guides",
      all: setUpGuideFilters(allStories),
      selected: [],
      visible: false,
    })
  }, [allStories])

  React.useLayoutEffect(() => {
    filterStories()
  }, [filtersDestinations.selected, filtersGuides.selected])

  React.useEffect(() => {
    setLoading(true)
    setStories(orderResults(stories, sortOptions.selected, "story"))
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
        url={siteUrl + `/stories/`}
        image={seo.image.file.url}
      />
      <section className="filter-system filter-system-multiple-filters">
        <div className="filter-system-multiple-filters-options">
          <FilterGroup
            filters={filtersDestinations}
            setFilters={setFiltersDestinations}
            updateResults={updateFilters}
          />
          <FilterGroup
            filters={filtersGuides}
            setFilters={setFiltersGuides}
            updateResults={updateFilters}
          />
        </div>
        <div className="filter-system-multiple-sort-options">
          <SortButton
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
          />
        </div>
      </section>
      {(filtersDestinations.selected.length > 0 ||
        filtersGuides.selected.length > 0) && (
        <section className="active-filters">
          {filtersDestinations.selected.map((selectedFilter) => (
            <ActiveFilter
              key={selectedFilter}
              prefix="Destination"
              name={selectedFilter}
              removeFn={() =>
                removeSelectedFilter(selectedFilter, setFiltersDestinations)
              }
            />
          ))}
          {filtersGuides.selected.map((selectedFilter) => (
            <ActiveFilter
              key={selectedFilter}
              prefix="Guide"
              name={selectedFilter}
              removeFn={() =>
                removeSelectedFilter(selectedFilter, setFiltersGuides)
              }
            />
          ))}
        </section>
      )}
      {stories && stories.length > 0 && (
        <section
          className={`${
            stories.length > 2 ? "grid-col-4" : "grid-col-2"
          } filter-system-results`}
        >
          <FiltersLoader loading={loading}>
            {stories.map(({ node }) => (
              <PhotoCard
                key={node.contentful_id}
                photo={node.coverPhoto.fluid}
                photoDesc={node.coverPhoto.title}
                title={node.title}
                to={`/stories/${node.slug}/`}
                date={node.createdAt}
              />
            ))}
          </FiltersLoader>
        </section>
      )}
    </Layout>
  )
}

export default Stories

export const pageQuery = graphql`
  query getAllStories {
    site {
      siteMetadata {
        siteUrl
      }
    }
    pageData: contentfulCollectionPage(
      contentful_id: { eq: "nceRXdpw7lGRMrjgblA1R" }
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
    stories: allContentfulStories(sort: { order: ASC, fields: createdAt }) {
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
          title
          createdAt
          destination {
            name
          }
          guides {
            name
          }
          updatedAt
        }
      }
    }
  }
`

import React from "react"
import PropTypes from "prop-types"
import { Tabs, useTabState, usePanelState } from "@bumaga/tabs"
import ReactMarkdown from "react-markdown"
import Img from "gatsby-image"

const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()

  return (
    <button
      className={`tabs-section-tabs-button${isActive ? " active" : ""}`}
      onClick={onClick}
    >
      {children}
      <span className="tabs-section-tabs-button-selector" />
    </button>
  )
}

const Panel = ({ children }) => {
  const isActive = usePanelState()

  return isActive ? (
    <section className="tabs-section-panel">{children}</section>
  ) : null
}

export const TabsSection = ({ heading, tabs }) => (
  <section className="wrapper-height">
    <h2 className="heading-medium">{heading}</h2>
    <div className="tabs-section">
      <Tabs>
        <div className="tabs-section-tabs">
          {tabs &&
            tabs.length > 0 &&
            tabs.map((tab) => <Tab key={tab.contentful_id}>{tab.name}</Tab>)}
          <span className="tabs-section-tabs-border" />
        </div>
        {tabs &&
          tabs.length > 0 &&
          tabs.map((tab) => (
            <Panel key={tab.contentful_id}>
              <Img
                className="tabs-section-panel-photo"
                fluid={tab.photo.fluid}
                alt={tab.photo.title}
              />
              <div className="tabs-section-panel-content">
                <h3 className="heading-medium tabs-section-panel-content-heading">
                  {tab.heading}
                </h3>
                <ReactMarkdown
                  className="rich-text"
                  children={tab.content.content}
                />
              </div>
            </Panel>
          ))}
      </Tabs>
    </div>
  </section>
)

TabsSection.propTypes = {
  heading: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
}

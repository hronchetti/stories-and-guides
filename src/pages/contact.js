import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import stringify from "qs-stringify"
import axios from "axios"
import TrackVisibility from "react-on-screen"

import {
  Button,
  Form,
  Grid,
  Input,
  Layout,
  PhotoCard,
  Seo,
  TextArea,
  Toast,
  SocialSignOff,
} from "../components"

const Contact = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const { seo, contactFormHeading, contactFormPhoto } = data.contactPage
  const latestStories = data.latestStories.edges

  const [toast, setToast] = React.useState({
    type: true,
    message: "Message sent, we'll be in contact soon",
    isVisible: false,
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: stringify(values),
        url: "/",
      })
      // Success
      setToast({
        type: true,
        isVisible: true,
        message: "Message sent, we'll be in contact soon",
      })
      resetForm({})
    } catch (e) {
      // Failed
      console.log(e.response)
      setToast({
        type: false,
        isVisible: true,
        message: "Could not send message, please try again",
      })
    }
    setSubmitting(false)
  }

  return (
    <Layout heading="Contact">
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/contact/`}
        image={seo.image.file.url}
      />
      <TrackVisibility className="contact" partialVisibility once tag="section">
        {({ isVisible }) => (
          <>
            <Formik
              initialValues={{
                name: "",
                email: "",
                message: "",
                "bot-field": "",
                "form-name": "Contact form",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Please enter your name"),
                email: Yup.string()
                  .email("Please enter a valid email address")
                  .required("Please enter your email"),
                message: Yup.string().required("Please enter a message"),
              })}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form
                  className="contact-form"
                  netlify-honeypot="bot-field"
                  data-netlify="true"
                  method="POST"
                  name="Contact form"
                >
                  <h2 className="heading-medium contact-form-heading">
                    {contactFormHeading}
                  </h2>
                  <Field type="hidden" name="bot-field" />
                  <Field type="hidden" name="form-name" />
                  <Input
                    placeholder="Your name"
                    name="name"
                    label="Your name"
                  />
                  <Input
                    placeholder="Your email"
                    name="email"
                    label="Your email"
                  />
                  <TextArea
                    placeholder="Your message"
                    name="message"
                    label="Your message"
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    Subscribe
                  </Button>
                </Form>
              )}
            </Formik>

            <Img
              className={`contact-photo${isVisible ? " active" : ""}`}
              fluid={contactFormPhoto.fluid}
              alt={contactFormPhoto.title}
            />
          </>
        )}
      </TrackVisibility>
      {latestStories && latestStories.length > 0 && (
        <Grid
          itemCount={latestStories.length}
          heading="Latest from the blog"
          linkText="All stories"
          linkTo="/stories/"
        >
          {latestStories.map(({ node }) => (
            <PhotoCard
              key={node.contentful_id}
              title={node.title}
              photo={node.coverPhoto.fluid}
              photoDesc={node.coverPhoto.title}
              to={`/stories/${node.slug}/`}
              date={node.createdAt}
            />
          ))}
        </Grid>
      )}
      <SocialSignOff />
      <Toast
        type={toast.type}
        isVisible={toast.isVisible}
        message={toast.message}
        dismissFunc={() =>
          setToast((toast) => ({ ...toast, isVisible: false }))
        }
      />
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query getContactPage {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contactPage: contentfulContactPage {
      contactFormPhoto {
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
        title
      }
      contactFormHeading
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
    latestStories: allContentfulStories(
      sort: { order: ASC, fields: createdAt }
      limit: 2
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
          title
          createdAt
        }
      }
    }
  }
`

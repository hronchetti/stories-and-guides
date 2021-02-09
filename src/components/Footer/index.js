import React from "react"
import { Link } from "gatsby"
import { Formik, Form } from "formik"
import * as Yup from "yup"

import { Input, Button } from ".."

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <section>
        <button className="scroll-to-top" onClick={() => scrollToTop()}>
          <span className="icon-arrow scroll-to-top-icon" />
          <span className="scroll-to-top-text">Scroll to top</span>
        </button>
      </section>
      <footer className="footer">
        <section className="wrapper-width">
          <div className="footer-upper">
            <ul className="footer-upper-link-group">
              <li>
                <span className="footer-heading">Inspiring travel</span>
              </li>
              <li>
                <Link to="/guides/">Guides</Link>
              </li>
              <li>
                <Link to="/destinations/">Destinations</Link>
              </li>
              <li>
                <Link to="/stories/">Stories</Link>
              </li>
            </ul>
            <ul className="footer-upper-link-group">
              <li>
                <span className="footer-heading">Company</span>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/contact/">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-policy/">Privacy policy</Link>
              </li>
            </ul>
            <Formik
              initialValues={{
                name: "",
                email: "",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string(),
                email: Yup.string()
                  .email("Please enter a valid email address")
                  .required("Please enter your email"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                setSubmitting(false)
              }}
            >
              {({ isSubmitting }) => (
                <Form className="footer-form">
                  <span className="footer-heading">
                    Stories that stay with you
                  </span>
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
                  <Button type="submit" disabled={isSubmitting}>
                    Subscribe
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="footer-lower">
            <span className="footer-lower-copyright">
              &copy; Stories and Guides {new Date().getFullYear()}
            </span>
            <a
              className="footer-lower-link"
              href="https://www.linkedin.com/in/harry-ronchetti/"
              target="_blank"
              rel="noreferrer"
            >
              Site by Harry Ronchetti
            </a>
          </div>
        </section>
      </footer>
    </>
  )
}

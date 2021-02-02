import React from "react"
import { Link } from "gatsby"
import { Formik, Form } from "formik"
import * as Yup from "yup"

export const Footer = () => {
  return (
    <footer className="footer">
      <section className="wrapper-width">
        <div className="footer-upper">
          <ul>
            <li>
              <span>Inspiring travel</span>
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
          <ul>
            <li>
              <span>Company</span>
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
              name: Yup.string().required(""),
              email: Yup.string()
                .email("Must be a valid email address")
                .required(""),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => <Form></Form>}
          </Formik>
        </div>
        <div className="footer-lower">
          <span>&copy; Stories and Guides {new Date().getFullYear()}</span>
          <a
            href="https://www.linkedin.com/in/harry-ronchetti/"
            target="_blank"
            rel="noreferrer"
          >
            Site by Harry Ronchetti
          </a>
        </div>
      </section>
    </footer>
  )
}

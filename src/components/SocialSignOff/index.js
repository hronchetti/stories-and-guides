import React from "react"

export const SocialSignOff = () => (
  <section className="wrapper-height social-sign-off-wrapper">
    <div className="social-sign-off">
      <h3 className="heading-extra-small social-sign-off-heading">
        Can’t get enough of our articles? Follow us on social media
      </h3>
      <div className="social-sign-off-links">
        <a
          href="https://www.instagram.com/storiesandguides/"
          aria-label="Instagram Account"
          target="_blank"
          rel="noopener"
        >
          <span className="hidden">Instagram Account</span>
          <span className="icon-instagram" />
        </a>
        <a
          href="https://www.facebook.com/storiesandguides/"
          aria-label="Facebook Account"
          target="_blank"
          rel="noopener"
        >
          <span className="hidden">Facebook Account</span>
          <span className="icon-facebook" />
        </a>
      </div>
    </div>
  </section>
)

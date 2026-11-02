
import React from "react";
import { Link } from "react-router-dom";
import "./LegalPages.css";

const LAST_UPDATED = "30 October 2026";

// Replace these placeholders before publishing.
const BUSINESS = {
  name: "BundleUpOTT",
  legalName: "[YOUR REGISTERED BUSINESS / LEGAL NAME]",
  email: "[YOUR SUPPORT EMAIL]",
  phone: "+919136305711",
  address: "[YOUR REGISTERED BUSINESS ADDRESS]",
  grievanceOfficer: "[GRIEVANCE OFFICER NAME]",
  grievanceEmail: "[GRIEVANCE EMAIL]",
};

function LegalLayout({ title, subtitle, children }) {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">
          ← Back to BundleUpOTT
        </Link>

        <header className="legal-header">
          <span className="legal-eyebrow">BUNDLEUPOTT · LEGAL</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <span className="legal-updated">
            Last updated: {LAST_UPDATED}
          </span>
        </header>

        <article className="legal-content">
          {children}
        </article>

        <div className="legal-contact">
          <h2>Need help?</h2>
          <p>
            Contact our customer support team for questions about
            these policies or your order.
          </p>
          <a href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
          <a href={`https://wa.me/${BUSINESS.phone.replace(/\D/g, "")}`}>
            WhatsApp support
          </a>
        </div>

        <footer className="legal-footer">
          <Link to="/">Home</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
        </footer>
      </div>
    </main>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Your privacy matters to us. Here's how BundleUpOTT collects, uses and protects your information."
    >
      <section>
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy explains how {BUSINESS.legalName},
          operating the BundleUpOTT platform, collects, uses,
          stores and shares personal information when you visit
          our website, contact us or purchase a subscription
          through our platform.
        </p>
        <p>
          By using our website, you acknowledge that you have
          read this policy. Where consent is legally required,
          we will request it separately and explain the relevant
          purpose.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>Depending on how you use our website, we may collect:</p>
        <ul>
          <li>
            <strong>Contact information:</strong> Name, email
            address and mobile number.
          </li>
          <li>
            <strong>Order information:</strong> Products selected,
            subscription duration, order ID, order status and
            purchase history.
          </li>
          <li>
            <strong>Payment information:</strong> Transaction
            reference, payment status, amount and payment method
            details made available to us by our payment provider.
          </li>
          <li>
            <strong>Support communications:</strong> Messages,
            enquiries and information you provide through email
            or WhatsApp.
          </li>
          <li>
            <strong>Technical information:</strong> IP address,
            browser type, device information, website activity
            and diagnostic logs, where collected.
          </li>
        </ul>
        <p>
          Please do not send passwords, OTPs, card PINs or other
          sensitive authentication information to our support
          team.
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We may use your information to:</p>
        <ul>
          <li>Create and manage customer orders.</li>
          <li>Process payments and verify transactions.</li>
          <li>Deliver purchased products or subscription access.</li>
          <li>Send order confirmations and important updates.</li>
          <li>Respond to customer support requests.</li>
          <li>Detect suspicious transactions and prevent fraud.</li>
          <li>Maintain website security and improve our services.</li>
          <li>Meet applicable legal and accounting obligations.</li>
        </ul>
      </section>

      <section>
        <h2>4. Payments and Payment Providers</h2>
        <p>
          Payments made through our website may be processed
          by Razorpay or another payment provider displayed
          during checkout.
        </p>
        <p>
          Payment providers process payment information under
          their own applicable terms and privacy policies.
          We may receive transaction references, payment
          confirmations, payment status and other information
          needed to reconcile your order.
        </p>
        <p>
          We do not intend to collect or store your full card
          number, card security code, UPI PIN or banking
          password on our website.
        </p>
      </section>

      <section>
        <h2>5. WhatsApp and Customer Support</h2>
        <p>
          If you contact us through WhatsApp, your messages
          and contact information may be processed by WhatsApp
          and its related service providers under their own
          privacy terms.
        </p>
        <p>
          We use support communications to answer enquiries,
          resolve order issues and provide customer assistance.
          We do not promise that WhatsApp is the only available
          support channel.
        </p>
      </section>

      <section>
        <h2>6. Cookies and Similar Technologies</h2>
        <p>
          Our website may use cookies, local storage or similar
          technologies to maintain sessions, remember preferences,
          support website functionality, protect accounts and
          understand website performance.
        </p>
        <p>
          You can manage cookies through your browser settings.
          Disabling certain cookies may affect website features.
        </p>
      </section>

      <section>
        <h2>7. When We Share Information</h2>
        <p>
          We may share necessary information with:
        </p>
        <ul>
          <li>Payment processors for payment processing and verification.</li>
          <li>Hosting and infrastructure providers that operate our website.</li>
          <li>Communication providers used for customer notifications.</li>
          <li>Service providers involved in fulfilling your order.</li>
          <li>Government authorities where disclosure is legally required.</li>
        </ul>
        <p>
          We do not state that we sell personal information.
          We share information only for legitimate operational,
          contractual or legal purposes.
        </p>
      </section>

      <section>
        <h2>8. Data Retention</h2>
        <p>
          We retain personal information only for as long as
          reasonably necessary for the purposes described in
          this policy, including order fulfilment, customer
          support, accounting, security and legal compliance.
        </p>
        <p>
          Certain transaction and business records may need to
          be retained for periods required by applicable law.
        </p>
      </section>

      <section>
        <h2>9. Data Security</h2>
        <p>
          We use reasonable technical and organisational
          safeguards intended to protect information against
          unauthorised access, loss, misuse or disclosure.
          However, no online system can be guaranteed to be
          completely secure.
        </p>
      </section>

      <section>
        <h2>10. Your Privacy Choices and Requests</h2>
        <p>
          Subject to applicable law, you may contact us to
          request access to, correction of or deletion of
          personal information, or to raise a concern about
          how your information is being used.
        </p>
        <p>
          You may also request withdrawal of consent where
          processing is based on consent. Withdrawal does not
          affect processing already lawfully carried out.
          Some information may need to be retained where
          required by law or for legitimate business records.
        </p>
      </section>

      <section>
        <h2>11. Children's Privacy</h2>
        <p>
          Our website is not intended to encourage children
          to make purchases independently. If you believe a
          child has provided personal information without
          appropriate authorisation, please contact us.
        </p>
      </section>

      <section>
        <h2>12. Third-Party Websites and Services</h2>
        <p>
          Our website may link to third-party services,
          subscription providers or payment pages. Those
          services operate under their own terms and privacy
          policies. We are not responsible for the privacy
          practices of websites that we do not control.
        </p>
      </section>

      <section>
        <h2>13. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy to reflect changes
          in our services, business practices or legal
          requirements. The revised version will be published
          on this page with an updated date.
        </p>
      </section>

      <section>
        <h2>14. Contact and Grievances</h2>
        <p><strong>Business:</strong> {BUSINESS.legalName}</p>
        <p><strong>Website:</strong> BundleUpOTT</p>
        <p><strong>Email:</strong> {BUSINESS.email}</p>
        <p><strong>Phone:</strong> {BUSINESS.phone}</p>
        <p><strong>Address:</strong> {BUSINESS.address}</p>
        <p>
          <strong>Grievance Officer:</strong>{" "}
          {BUSINESS.grievanceOfficer}
        </p>
        <p>
          <strong>Grievance Email:</strong>{" "}
          {BUSINESS.grievanceEmail}
        </p>
        <p>
          Please use the above contact details to raise
          privacy-related questions or complaints.
        </p>
      </section>
    </LegalLayout>
  );
}

export function TermsAndConditions() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before purchasing or using services through BundleUpOTT."
    >
      <section>
        <h2>1. Agreement to Terms</h2>
        <p>
          These Terms & Conditions govern your access to and
          use of the BundleUpOTT website and services operated
          by {BUSINESS.legalName}.
        </p>
        <p>
          By accessing our website or placing an order, you
          agree to these terms. If you do not agree, please
          discontinue use of the website.
        </p>
      </section>

      <section>
        <h2>2. Our Services</h2>
        <p>
          BundleUpOTT provides an online platform through which
          customers can browse and purchase subscription-related
          products and services displayed on the website.
        </p>
        <p>
          The exact product, subscription duration, price,
          features and fulfilment method will be shown during
          the purchase process or in the relevant product
          description.
        </p>
        <p>
          Availability and fulfilment may depend on the
          relevant third-party provider and the terms of the
          selected product.
        </p>
      </section>

      <section>
        <h2>3. Customer Information</h2>
        <p>
          You agree to provide accurate contact and order
          information when making a purchase. Incorrect email
          addresses, mobile numbers or other details may delay
          order processing or delivery.
        </p>
        <p>
          You must not impersonate another person or use
          payment methods without proper authorisation.
        </p>
      </section>

      <section>
        <h2>4. Product Descriptions and Availability</h2>
        <p>
          We make reasonable efforts to display product
          descriptions, benefits, limitations, prices and
          availability accurately.
        </p>
        <p>
          Third-party providers may change their features,
          eligibility requirements, usage limits, subscription
          terms or availability. Where a material change affects
          an order, we will handle the issue in accordance with
          applicable law and the circumstances of the purchase.
        </p>
      </section>

      <section>
        <h2>5. Pricing and Payment</h2>
        <p>
          Prices are displayed in Indian Rupees (INR), unless
          otherwise stated. The price shown for the selected
          product and duration at checkout is the amount
          applicable to that order.
        </p>
        <p>
          Payments may be processed through Razorpay or
          another payment method made available at checkout.
          Your order may remain pending until payment is
          successfully verified.
        </p>
        <p>
          A payment initiation screen, QR code or payment
          notification alone does not necessarily mean that
          an order has been confirmed. Please do not make
          duplicate payments while a transaction is being
          checked.
        </p>
      </section>

      <section>
        <h2>6. Order Confirmation and Delivery</h2>
        <p>
          After an order is placed, we may verify the payment
          and order details before fulfilment. An order
          confirmation or payment verification message will
          be provided through the available communication
          channel where applicable.
        </p>
        <p>
          Delivery or activation time may vary depending on
          the product, provider and verification requirements.
          If your order is delayed, please contact customer
          support with your order ID.
        </p>
      </section>

      <section>
        <h2>7. Refunds and Cancellations</h2>
        <p>
          Refund and cancellation requests are assessed based
          on the product purchased, fulfilment status, payment
          status, the reason for the request and applicable
          consumer protection laws.
        </p>
        <p>
          If you have paid but your order has not been
          fulfilled, or if a duplicate or incorrect payment
          has occurred, contact us with your order ID and
          transaction reference so we can investigate.
        </p>
        <p>
          Where a refund is approved, it will be processed
          through the applicable payment channel within a
          reasonable period, subject to payment provider
          processing times and applicable law.
        </p>
        <p>
          Nothing in these terms is intended to remove or
          restrict any refund, cancellation or other right
          that cannot legally be excluded.
        </p>
      </section>

      <section>
        <h2>8. Third-Party Subscription Providers</h2>
        <p>
          Certain products may relate to services operated
          by independent third-party companies. Those
          companies may have their own account requirements,
          usage restrictions, geographic limitations and
          subscription terms.
        </p>
        <p>
          Customers are responsible for complying with the
          applicable provider terms when using those services.
          BundleUpOTT does not control third-party platforms
          or guarantee that their features will remain
          unchanged.
        </p>
        <p>
          Unless expressly stated otherwise, third-party
          brands and logos belong to their respective owners.
          Mention of a brand does not by itself imply
          sponsorship, partnership or endorsement.
        </p>
      </section>

      <section>
        <h2>9. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for unlawful or fraudulent activities.</li>
          <li>Attempt to disrupt, damage or gain unauthorised access to the website.</li>
          <li>Submit false payment details or fraudulent claims.</li>
          <li>Misuse another person's account or personal information.</li>
          <li>Copy, exploit or interfere with website content or systems without permission.</li>
        </ul>
      </section>

      <section>
        <h2>10. Service Interruptions</h2>
        <p>
          Access to our website or a third-party service may
          occasionally be affected by maintenance, technical
          problems, payment provider interruptions or events
          outside our reasonable control.
        </p>
        <p>
          We will make reasonable efforts to address issues
          affecting orders and customer access.
        </p>
      </section>

      <section>
        <h2>11. Intellectual Property</h2>
        <p>
          Website text, design, graphics, branding and
          original content belonging to BundleUpOTT may not
          be copied, republished or commercially exploited
          without permission.
        </p>
        <p>
          Third-party names, logos and trademarks remain
          the property of their respective owners.
        </p>
      </section>

      <section>
        <h2>12. Limitation of Liability</h2>
        <p>
          To the extent permitted by applicable law,
          BundleUpOTT is not responsible for indirect or
          consequential losses arising from circumstances
          outside our reasonable control, including
          third-party platform interruptions.
        </p>
        <p>
          Nothing in these terms excludes liability or
          consumer rights that cannot legally be excluded
          or limited under applicable law.
        </p>
      </section>

      <section>
        <h2>13. Suspension and Termination</h2>
        <p>
          We may restrict access to the website where
          reasonably necessary to investigate fraud,
          protect security, comply with law or address
          misuse of our services.
        </p>
        <p>
          Any action affecting an existing paid order will
          be handled subject to applicable law and the
          customer's rights.
        </p>
      </section>

      <section>
        <h2>14. Changes to These Terms</h2>
        <p>
          We may revise these terms from time to time.
          Updated terms will be published on this page
          with a revised date. Changes will not remove
          rights that customers have already acquired
          under applicable law.
        </p>
      </section>

      <section>
        <h2>15. Governing Law and Disputes</h2>
        <p>
          These terms are governed by the laws of India.
          Disputes will be handled by the appropriate
          courts and consumer dispute resolution forums
          having jurisdiction under applicable law.
        </p>
      </section>

      <section>
        <h2>16. Customer Support and Grievances</h2>
        <p><strong>Business:</strong> {BUSINESS.legalName}</p>
        <p><strong>Email:</strong> {BUSINESS.email}</p>
        <p><strong>Phone:</strong> {BUSINESS.phone}</p>
        <p><strong>Address:</strong> {BUSINESS.address}</p>
        <p>
          <strong>Grievance Officer:</strong>{" "}
          {BUSINESS.grievanceOfficer}
        </p>
        <p>
          <strong>Grievance Email:</strong>{" "}
          {BUSINESS.grievanceEmail}
        </p>
        <p>
          For order-related complaints, please include your
          order ID and relevant transaction reference.
        </p>
      </section>
    </LegalLayout>
  );
}

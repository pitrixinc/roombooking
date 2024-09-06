import React from 'react'
import Head from 'next/head';

const SitePrivacy = () => {
  return (
    <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
    <Head>
      <title>Privacy Policy | Ghana Local Events Booking</title>
      <meta name="description" content="Privacy policy of Ghana Local Events Booking website." />
    </Head>
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 py-16 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Protecting your data is our top priority.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
              <p className="text-lg leading-relaxed">
                Welcome to the Ghana Local Events Booking website. We are committed to protecting your privacy and ensuring that your personal data is secure. This policy outlines how we collect, use, and safeguard your information.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Key Points</h3>
              <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
                <li>Your data is secure with us.</li>
                <li>We only collect essential information.</li>
                <li>You can control your data preferences.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="order-last md:order-first">
              <h2 className="text-3xl font-bold mb-6">2. Information We Collect</h2>
              <p className="text-lg leading-relaxed">
                We collect personal information such as your name, email address, phone number, and payment details. We also collect non-personal information like your IP address, browser type, and browsing behavior to enhance your experience on our site.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-xl font-semibold mb-4">Why We Collect Data</h3>
              <p className="text-lg leading-relaxed">
                Collecting data allows us to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Process your event bookings.</li>
                <li>Communicate effectively with you.</li>
                <li>Improve our services based on your preferences.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">3. How We Use Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Booking & Payments</h3>
              <p className="text-lg leading-relaxed">
                Your information is used to process bookings and secure payments for events. We ensure your payment details are handled securely.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Communication</h3>
              <p className="text-lg leading-relaxed">
                We use your contact information to keep you updated on your bookings and any relevant changes to your reservations.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Service Improvement</h3>
              <p className="text-lg leading-relaxed">
                Your data helps us refine our services, ensuring you have the best possible experience when using our platform.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">4. Sharing Your Information</h2>
          <p className="text-lg leading-relaxed mb-6">
            We do not sell or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website, conducting our business, or servicing you, provided that those parties agree to keep this information confidential.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Third-Party Services</h3>
            <p className="text-lg leading-relaxed">
              We partner with service providers who assist us with payment processing, data analysis, marketing, and other functions. These partners are required to keep your information secure and use it only for the services they provide to us.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">5. Security of Your Information</h2>
          <p className="text-lg leading-relaxed">
            We implement a variety of security measures to maintain the safety of your personal information. These measures include secure servers, encryption, and regular security audits. However, please note that no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">6. Cookies and Tracking Technologies</h2>
          <p className="text-lg leading-relaxed">
            Our website uses cookies and similar tracking technologies to provide you with a tailored experience. You can manage your cookie preferences through your browser settings. Disabling cookies may limit your ability to use certain features on our website.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">7. Third-Party Links</h2>
          <p className="text-lg leading-relaxed">
            Our website may contain links to third-party websites. These websites have their own privacy policies, and we are not responsible for their content or privacy practices. We encourage you to read the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">8. Your Rights</h2>
          <p className="text-lg leading-relaxed">
            You have the right to access, correct, or delete your personal information. You can also opt out of receiving promotional communications from us at any time. If you have any concerns about your data, please contact us at support@ghanabookings.com.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">9. Changes to This Policy</h2>
          <p className="text-lg leading-relaxed">
            We may update this privacy policy from time to time. Any changes will be posted on this page, and the updated policy will take effect immediately upon posting. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">10. Contact Us</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed">
              If you have any questions or concerns about our privacy policy, please contact us at:
            </p>
            <address className="mt-4 not-italic">
              Ghana Local Events Booking<br />
              Accra, Ghana<br />
              Email: <a href="mailto:support@intellitrip.vercel.app" className="text-blue-500 hover:underline">support@intellitrip.vercel.app</a>
            </address>
          </div>
        </section>


      <footer className="text-center mt-12">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Intellitrip. All rights reserved.
        </p>
      </footer>
    </div>
  </div>
  )
}

export default SitePrivacy
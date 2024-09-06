// pages/about.js
import Head from 'next/head';

export default function SiteAboutUs() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <Head>
        <title>About Us | Intellitrip</title>
        <meta name="description" content="Learn more about Intellitrip, our mission, vision, and the team behind the best local events booking platform in Ghana." />
      </Head>

      <header className="bg-gradient-to-r from-green-600 to-green-400 py-16 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-white">
            About Intellitrip
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Discover who we are, what we do, and why we do it.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                At Intellitrip, our mission is to connect people with the rich cultural heritage of Ghana by making local events and festivals accessible to everyone. We strive to provide an easy-to-use platform where users can discover, book, and experience the best that Ghana has to offer.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
              <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
                <li><span className="font-bold">Customer Focus:</span> We put our customers at the heart of everything we do.</li>
                <li><span className="font-bold">Integrity:</span> We operate with honesty, transparency, and accountability.</li>
                <li><span className="font-bold">Innovation:</span> We continuously improve and innovate to meet our customers&apos; needs.</li>
                <li><span className="font-bold">Passion:</span> We are passionate about Ghana and its culture, and we want to share that passion with the world.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="order-last md:order-first">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                Our vision is to become the leading platform for local events and festival bookings in Ghana, providing seamless experiences that enrich the lives of our users and promote the cultural diversity of our nation.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-300 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-xl font-semibold mb-4">What We Envision</h3>
              <p className="text-lg leading-relaxed">
                We envision a world where everyone has the opportunity to explore and participate in Ghana’s vibrant cultural events, contributing to the preservation and celebration of our cultural heritage.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Humble Beginnings</h3>
              <p className="text-lg leading-relaxed">
                Intellitrip started as a small project driven by a passion for connecting people with Ghana’s cultural events. With hard work and dedication, we’ve grown into a trusted platform that serves thousands of users.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Our Growth</h3>
              <p className="text-lg leading-relaxed">
                Over the years, we’ve expanded our offerings, partnering with event organizers, hotels, and local businesses to create an all-in-one solution for event-goers. Our team has also grown, bringing together experts in technology, marketing, and customer service.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Looking Forward</h3>
              <p className="text-lg leading-relaxed">
                As we look to the future, we remain committed to our mission and vision. We will continue to innovate and improve, ensuring that Intellitrip remains the go-to platform for local events and festival bookings in Ghana.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">John Doe</h3>
              <p className="text-lg leading-relaxed">
                <span className="font-bold">Founder & CEO:</span> John is the visionary behind Intellitrip, with a deep love for Ghana’s culture and a passion for technology. He leads the team with a focus on innovation and customer satisfaction.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Jane Smith</h3>
              <p className="text-lg leading-relaxed">
                <span className="font-bold">Head of Marketing:</span> Jane is responsible for getting the word out about Intellitrip. With a background in digital marketing, she ensures that our platform reaches the right audience.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Michael Brown</h3>
              <p className="text-lg leading-relaxed">
                <span className="font-bold">CTO:</span> Michael oversees the technical aspects of Intellitrip, ensuring that our platform is secure, reliable, and user-friendly. He brings years of experience in software development to the team.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed">
              We love hearing from our users! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us at:
            </p>
            <address className="mt-4 not-italic">
              Intellitrip<br />
              Accra, Ghana<br />
              Email: <a href="mailto:support@intellitrip.vercel.app" className="text-green-500 hover:underline">support@intellitrip.vercel.app</a>
            </address>
          </div>
        </section>
      </div>

      <footer className="text-center mt-12 py-8 bg-gray-200 dark:bg-gray-800">
        <p className="text-lg leading-relaxed">
          &copy; {new Date().getFullYear()} Intellitrip. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

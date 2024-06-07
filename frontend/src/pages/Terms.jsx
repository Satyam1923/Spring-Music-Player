import React from "react";

const Terms = () => {
  return (
    <div className="min-h-[40rem] w-full pt-16 rounded-md flex justify-center flex-col antialiased relative overflow-hidden">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          Terms and Conditions
          <div class="divider md:h-[1.5px] sm:h-[1px] my-2"></div>
        </h1>

        <p className="mt-4 mb-8 text-slate-200">
          Welcome to the Spring Music Player! By using our services, you agree
          to comply with and be bound by the following terms and policies.
          Please review these terms carefully.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          1. Acceptance of Terms
        </h2>
        <p className="mb-6 text-slate-200">
          By accessing and using the Spring Music Player website and services,
          you accept and agree to be bound by these Terms and Policy. If you do
          not agree to these terms, you should not use our services.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          2. Description of Service
        </h2>
        <p className="mb-6 text-slate-200">
          Spring Music Player provides a platform for discovering, playing, and
          managing music playlists through the JioSaavn API. Our services are
          available through a web interface accessible at http://localhost:3000/
          and http://localhost:3030/.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          3. User Responsibilities
        </h2>
        <p className="mb-6 text-slate-200">
          Users are responsible for their use of the service, ensuring they do
          not engage in activities that violate any laws, regulations, or
          third-party rights. This includes maintaining the confidentiality of
          their account information and being responsible for all activities
          that occur under their account. Prohibited activities include using
          the service for illegal purposes, attempting to interfere with the
          service's functionality, and distributing malicious software or
          engaging in activities that harm the service or its users.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          4. Intellectual Property
        </h2>
        <p className="mb-6 text-slate-200">
          All content, trademarks, and data on the Spring Music Player website,
          including the design, text, graphics, and software, are the property
          of their respective owners and are protected by applicable
          intellectual property laws.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          5. Privacy Policy
        </h2>
        <p className="mb-6 text-slate-200">
          Your privacy is important to us. We collect and use personal data in
          accordance with our Privacy Policy. We may collect personal
          information such as your name, email address, and usage data to
          provide and improve our services. This data is used to provide and
          maintain our services, communicate with users, and improve our service
          based on user feedback. We do not share personal information with
          third parties except as required by law or to protect our rights.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          6. Limitation of Liability
        </h2>
        <p className="mb-6 text-slate-200">
          Spring Music Player and its developers are not liable for any direct,
          indirect, incidental, or consequential damages arising from the use or
          inability to use our services.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          7. Modification of Terms
        </h2>
        <p className="mb-6 text-slate-200">
          We reserve the right to modify these terms at any time. Changes will
          be effective immediately upon posting on our website. Your continued
          use of the service constitutes your acceptance of the modified terms.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          8. Termination
        </h2>
        <p className="mb-6 text-slate-200">
          We reserve the right to terminate or suspend access to our service
          immediately, without prior notice, for conduct that we believe
          violates these terms or is harmful to other users of the service.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-white">
          9. Governing Law
        </h2>
        <p className="mb-6 text-slate-200">
          These terms shall be governed and construed in accordance with the
          laws, without regard to its conflict of law provisions.
        </p>

        <div className="mt-10">
          <p>
            By using Spring Music Player, you agree to these Terms and Policy.
            Thank you for choosing our service!
          </p>
          <p>
            This Terms and Policy page ensures that users understand their
            responsibilities, the scope of our services, and the legal framework
            within which Spring Music Player operates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;

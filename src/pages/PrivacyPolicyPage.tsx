import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#1F3D2E]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Back */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#1F3D2E] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Recipe Finder
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-[#1F3D2E] p-3 text-white">
              <ShieldCheck size={24} />
            </div>

            <h1 className="text-3xl font-bold md:text-4xl">
              Privacy Policy
            </h1>
          </div>

          <p className="text-sm text-gray-600">
            Last updated: September 29, 2026
          </p>
        </div>

        <div className="space-y-8 rounded-2xl bg-white p-6 shadow-sm md:p-10">
          {/* Introduction */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              1. Introduction
            </h2>

            <p className="leading-7 text-gray-700">
              Welcome to Recipe Finder. This Privacy Policy explains how
              Recipe Finder collects, uses, and protects information when you
              use our website and services.
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              By using Recipe Finder, you agree to the practices described in
              this Privacy Policy.
            </p>
          </section>

          {/* Information */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              2. Information We Collect
            </h2>

            <p className="mb-3 leading-7 text-gray-700">
              Depending on how you use Recipe Finder, we may collect the
              following information:
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Name</li>
              <li>Email address</li>
              <li>Account authentication information</li>
              <li>Recipe searches and interactions</li>
              <li>Information you voluntarily provide to us</li>
            </ul>
          </section>

          {/* Google Login */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              3. Google Sign-In
            </h2>

            <p className="leading-7 text-gray-700">
              Recipe Finder may allow you to sign in using your Google
              account. When you choose Google Sign-In, Google may provide
              basic profile information such as your name, email address, and
              profile information according to the permissions you authorize.
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              We use this information to create or authenticate your Recipe
              Finder account and provide account-related functionality.
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              Recipe Finder does not sell your Google account information to
              third parties.
            </p>
          </section>

          {/* How information is used */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              4. How We Use Information
            </h2>

            <p className="mb-3 leading-7 text-gray-700">
              We may use collected information to:
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Create and manage your account</li>
              <li>Authenticate users</li>
              <li>Provide recipe search functionality</li>
              <li>Improve the Recipe Finder website</li>
              <li>Respond to support requests</li>
              <li>Protect the security of our service</li>
            </ul>
          </section>

          {/* Third party */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              5. Third-Party Services
            </h2>

            <p className="leading-7 text-gray-700">
              Recipe Finder may use third-party services to provide
              functionality such as authentication, hosting, databases, and
              recipe information.
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              These services may process information according to their own
              privacy policies and terms.
            </p>
          </section>

          {/* Data security */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              6. Data Security
            </h2>

            <p className="leading-7 text-gray-700">
              We take reasonable measures to protect information associated
              with your account. However, no method of transmission or
              electronic storage is completely secure.
            </p>
          </section>

          {/* Data retention */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              7. Data Retention
            </h2>

            <p className="leading-7 text-gray-700">
              We retain account information for as long as reasonably
              necessary to provide our services, maintain security, comply
              with applicable requirements, or resolve disputes.
            </p>
          </section>

          {/* User rights */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              8. Your Information
            </h2>

            <p className="leading-7 text-gray-700">
              You may request information about the personal data associated
              with your account. Where applicable, you may also request
              correction or deletion of your information.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              9. Children's Privacy
            </h2>

            <p className="leading-7 text-gray-700">
              Recipe Finder is not intended to knowingly collect personal
              information from children without appropriate authorization.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              10. Changes to This Policy
            </h2>

            <p className="leading-7 text-gray-700">
              We may update this Privacy Policy from time to time. Any
              changes will be posted on this page with an updated revision
              date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              11. Contact
            </h2>

            <p className="leading-7 text-gray-700">
              If you have questions about this Privacy Policy, please contact
              us through the Recipe Finder website.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 flex gap-6 text-sm">
          <Link
            to="/terms"
            className="text-[#1F3D2E] hover:underline"
          >
            Terms of Service
          </Link>

          <Link
            to="/"
            className="text-[#1F3D2E] hover:underline"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
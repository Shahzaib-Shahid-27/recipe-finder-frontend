import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfServicePage() {
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
              <FileText size={24} />
            </div>

            <h1 className="text-3xl font-bold md:text-4xl">
              Terms of Service
            </h1>
          </div>

          <p className="text-sm text-gray-600">
            Last updated: September 29, 2026
          </p>
        </div>

        <div className="space-y-8 rounded-2xl bg-white p-6 shadow-sm md:p-10">
          {/* Acceptance */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              1. Acceptance of Terms
            </h2>

            <p className="leading-7 text-gray-700">
              By accessing or using Recipe Finder, you agree to be bound by
              these Terms of Service. If you do not agree with these terms,
              please do not use the service.
            </p>
          </section>

          {/* Service */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              2. About Recipe Finder
            </h2>

            <p className="leading-7 text-gray-700">
              Recipe Finder is a web application that allows users to search
              for recipes, view recipe information, browse categories, and
              manage an account.
            </p>
          </section>

          {/* Account */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              3. User Accounts
            </h2>

            <p className="leading-7 text-gray-700">
              Some features may require you to create an account. You are
              responsible for providing accurate information and maintaining
              the security of your account credentials.
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              You are responsible for activity that occurs through your
              account.
            </p>
          </section>

          {/* Google */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              4. Google Sign-In
            </h2>

            <p className="leading-7 text-gray-700">
              Recipe Finder may provide Google Sign-In as an authentication
              option. By using Google Sign-In, you authorize Google to
              authenticate your identity and provide the information required
              for account creation or authentication.
            </p>
          </section>

          {/* Acceptable use */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              5. Acceptable Use
            </h2>

            <p className="mb-3 leading-7 text-gray-700">
              You agree not to:
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Use the service for unlawful purposes</li>
              <li>Attempt to gain unauthorized access to the service</li>
              <li>Interfere with the operation of the website</li>
              <li>Attempt to access another user's account</li>
              <li>Abuse or overload the service</li>
              <li>Use automated systems to misuse the service</li>
            </ul>
          </section>

          {/* Recipes */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              6. Recipe Information
            </h2>

            <p className="leading-7 text-gray-700">
              Recipe information displayed by Recipe Finder may be obtained
              from third-party sources. We do not guarantee that all recipe
              information, ingredients, measurements, nutritional information,
              or instructions are complete or accurate.
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              Users should independently verify recipe information before
              preparing or consuming food.
            </p>
          </section>

          {/* Availability */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              7. Service Availability
            </h2>

            <p className="leading-7 text-gray-700">
              We may modify, update, suspend, or discontinue parts of the
              service at any time. We do not guarantee that the website will
              always be available or error-free.
            </p>
          </section>

          {/* Third party */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              8. Third-Party Services
            </h2>

            <p className="leading-7 text-gray-700">
              Recipe Finder may use third-party services for authentication,
              hosting, databases, recipe data, analytics, or other
              functionality. Third-party services may have their own terms
              and policies.
            </p>
          </section>

          {/* Intellectual property */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              9. Intellectual Property
            </h2>

            <p className="leading-7 text-gray-700">
              The Recipe Finder website, design, code, branding, and original
              content may be protected by applicable intellectual property
              laws. You may not copy, reproduce, or redistribute protected
              content without appropriate permission.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              10. Disclaimer
            </h2>

            <p className="leading-7 text-gray-700">
              Recipe Finder is provided on an "as is" and "as available"
              basis. We make no guarantee that the service will be completely
              accurate, secure, uninterrupted, or suitable for every purpose.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              11. Limitation of Liability
            </h2>

            <p className="leading-7 text-gray-700">
              To the extent permitted by applicable law, Recipe Finder and
              its developers are not responsible for losses or damages
              resulting from your use of the service or reliance on information
              provided through the website.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              12. Changes to These Terms
            </h2>

            <p className="leading-7 text-gray-700">
              These Terms of Service may be updated from time to time. Updated
              terms will be posted on this page with a new revision date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              13. Contact
            </h2>

            <p className="leading-7 text-gray-700">
              If you have questions about these Terms of Service, please
              contact us through the Recipe Finder website.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 flex gap-6 text-sm">
          <Link
            to="/privacy-policy"
            className="text-[#1F3D2E] hover:underline"
          >
            Privacy Policy
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
import { useNavigate  } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F1E5] text-[#29271E] transition-colors duration-300 dark:bg-[#0D1510] dark:text-[#F4EBDD]">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 md:py-12">

        {/* Back Button */}
        <button
          // to="/"
           onClick={() => navigate(-1)}
          className="
            mb-8 inline-flex items-center gap-2 rounded-full
            border border-[#D8C9AD]
            px-4 py-2 text-sm font-medium
            text-[#29271E]
            transition-all duration-200
            hover:border-[#F2A52B]
            hover:text-[#D88B16]
            dark:border-[#3A4038]
            dark:text-[#F4EBDD]
            dark:hover:border-[#F2A52B]
            dark:hover:text-[#F2A52B]
          "
        >
          <ArrowLeft size={17} />
          Back to Butcher's Kitchen
        </button>

        {/* Header */}
        <div className="mb-8">

          <div className="mb-4 flex items-center gap-4">

            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-2xl
                bg-[#F2A52B]
                text-[#171811]
                shadow-md
              "
            >
              <ShieldCheck size={27} strokeWidth={2.2} />
            </div>

            <div>
              <h1
                className="
                  font-serif text-3xl font-bold
                  text-[#29271E]
                  sm:text-4xl
                  dark:text-[#F7EEDF]
                "
              >
                Privacy Policy
              </h1>

              <p className="mt-1 text-sm text-[#766E60] dark:text-[#A9A496]">
                Butcher's Kitchen
              </p>
            </div>

          </div>

          <div
            className="
              inline-block rounded-full
              border border-[#D8C9AD]
              bg-[#EFE6D6]
              px-4 py-2
              text-xs font-medium
              text-[#766E60]
              dark:border-[#383E36]
              dark:bg-[#171D18]
              dark:text-[#A9A496]
            "
          >
            Last updated: September 29, 2026
          </div>
        </div>

        {/* Content */}
        <div
          className="
            overflow-hidden rounded-3xl
            border border-[#DED3C0]
            bg-[#FFFDF8]
            shadow-[0_12px_40px_rgba(60,45,20,0.08)]
            dark:border-[#303830]
            dark:bg-[#151D17]
            dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)]
          "
        >
          <div className="space-y-10 p-6 sm:p-8 md:p-10 lg:p-12">

            {/* Introduction */}
            <section>
              <h2 className="policy-heading">1. Introduction</h2>

              <p className="policy-text">
                Welcome to Butcher's Kitchen. This Privacy Policy explains
                how Butcher's Kitchen collects, uses, and protects information
                when you use our website and services.
              </p>

              <p className="policy-text mt-3">
                By using Butcher's Kitchen, you agree to the practices
                described in this Privacy Policy.
              </p>
            </section>

            {/* Information */}
            <section>
              <h2 className="policy-heading">2. Information We Collect</h2>

              <p className="policy-text mb-4">
                Depending on how you use Butcher's Kitchen, we may collect
                the following information:
              </p>

              <ul className="policy-list">
                <li>Name</li>
                <li>Email address</li>
                <li>Account authentication information</li>
                <li>Recipe searches and interactions</li>
                <li>Information you voluntarily provide to us</li>
              </ul>
            </section>

            {/* Google Login */}
            <section>
              <h2 className="policy-heading">3. Google Sign-In</h2>

              <p className="policy-text">
                Butcher's Kitchen may allow you to sign in using your Google
                account. When you choose Google Sign-In, Google may provide
                basic profile information such as your name, email address,
                and profile information according to the permissions you
                authorize.
              </p>

              <p className="policy-text mt-3">
                We use this information to create or authenticate your
                Butcher's Kitchen account and provide account-related
                functionality.
              </p>

              <p className="policy-text mt-3">
                Butcher's Kitchen does not sell your Google account
                information to third parties.
              </p>
            </section>

            {/* How information is used */}
            <section>
              <h2 className="policy-heading">4. How We Use Information</h2>

              <p className="policy-text mb-4">
                We may use collected information to:
              </p>

              <ul className="policy-list">
                <li>Create and manage your account</li>
                <li>Authenticate users</li>
                <li>Provide recipe search functionality</li>
                <li>Improve the Butcher's Kitchen website</li>
                <li>Respond to support requests</li>
                <li>Protect the security of our service</li>
              </ul>
            </section>

            {/* Third Party */}
            <section>
              <h2 className="policy-heading">5. Third-Party Services</h2>

              <p className="policy-text">
                Butcher's Kitchen may use third-party services to provide
                functionality such as authentication, hosting, databases,
                analytics, and recipe information.
              </p>

              <p className="policy-text mt-3">
                These services may process information according to their
                own privacy policies and terms.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="policy-heading">6. Data Security</h2>

              <p className="policy-text">
                We take reasonable measures to protect information associated
                with your account. However, no method of transmission or
                electronic storage is completely secure.
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="policy-heading">7. Data Retention</h2>

              <p className="policy-text">
                We retain account information for as long as reasonably
                necessary to provide our services, maintain security, comply
                with applicable requirements, or resolve disputes.
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="policy-heading">8. Your Information</h2>

              <p className="policy-text">
                You may request information about the personal data associated
                with your account. Where applicable, you may also request
                correction or deletion of your information.
              </p>
            </section>

            {/* Children */}
            <section>
              <h2 className="policy-heading">9. Children's Privacy</h2>

              <p className="policy-text">
                Butcher's Kitchen is not intended to knowingly collect
                personal information from children without appropriate
                authorization.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="policy-heading">10. Changes to This Policy</h2>

              <p className="policy-text">
                We may update this Privacy Policy from time to time. Any
                changes will be posted on this page with an updated revision
                date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="policy-heading">11. Contact</h2>

              <p className="policy-text">
                If you have questions about this Privacy Policy, please
                contact us through the Butcher's Kitchen website.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
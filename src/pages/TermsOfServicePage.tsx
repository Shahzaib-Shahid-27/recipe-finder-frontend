
import { useNavigate  } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfServicePage() {

  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-[#F7F1E5] text-[#29271E] transition-colors duration-300 dark:bg-[#0D1510] dark:text-[#F4EBDD]">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 md:py-12">

        {/* Back Button */}
        <button
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
              <FileText size={27} strokeWidth={2.2} />
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
                Terms of Service
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

            {/* Acceptance */}
            <section>
              <h2 className="policy-heading">
                1. Acceptance of Terms
              </h2>

              <p className="policy-text">
                By accessing or using Butcher's Kitchen, you agree to be
                bound by these Terms of Service. If you do not agree with
                these terms, please do not use the service.
              </p>
            </section>

            {/* About */}
            <section>
              <h2 className="policy-heading">
                2. About Butcher's Kitchen
              </h2>

              <p className="policy-text">
                Butcher's Kitchen is a web application that allows users to
                search for recipes, view recipe information, browse
                categories, and manage an account.
              </p>
            </section>

            {/* Accounts */}
            <section>
              <h2 className="policy-heading">
                3. User Accounts
              </h2>

              <p className="policy-text">
                Some features may require you to create an account. You are
                responsible for providing accurate information and maintaining
                the security of your account credentials.
              </p>

              <p className="policy-text mt-3">
                You are responsible for activity that occurs through your
                account.
              </p>
            </section>

            {/* Google */}
            <section>
              <h2 className="policy-heading">
                4. Google Sign-In
              </h2>

              <p className="policy-text">
                Butcher's Kitchen may provide Google Sign-In as an
                authentication option. By using Google Sign-In, you authorize
                Google to authenticate your identity and provide the
                information required for account creation or authentication.
              </p>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="policy-heading">
                5. Acceptable Use
              </h2>

              <p className="policy-text mb-4">
                You agree not to:
              </p>

              <ul className="policy-list">
                <li>Use the service for unlawful purposes</li>
                <li>Attempt to gain unauthorized access to the service</li>
                <li>Interfere with the operation of the website</li>
                <li>Attempt to access another user's account</li>
                <li>Abuse or overload the service</li>
                <li>Use automated systems to misuse the service</li>
              </ul>
            </section>

            {/* Recipe Information */}
            <section>
              <h2 className="policy-heading">
                6. Recipe Information
              </h2>

              <p className="policy-text">
                Recipe information displayed by Butcher's Kitchen may be
                obtained from third-party sources. We do not guarantee that
                all recipe information, ingredients, measurements,
                nutritional information, or instructions are complete or
                accurate.
              </p>

              <p className="policy-text mt-3">
                Users should independently verify recipe information before
                preparing or consuming food.
              </p>
            </section>

            {/* Availability */}
            <section>
              <h2 className="policy-heading">
                7. Service Availability
              </h2>

              <p className="policy-text">
                We may modify, update, suspend, or discontinue parts of the
                service at any time. We do not guarantee that the website
                will always be available or error-free.
              </p>
            </section>

            {/* Third Party */}
            <section>
              <h2 className="policy-heading">
                8. Third-Party Services
              </h2>

              <p className="policy-text">
                Butcher's Kitchen may use third-party services for
                authentication, hosting, databases, recipe data, analytics,
                or other functionality. Third-party services may have their
                own terms and policies.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="policy-heading">
                9. Intellectual Property
              </h2>

              <p className="policy-text">
                The Butcher's Kitchen website, design, code, branding, and
                original content may be protected by applicable intellectual
                property laws. You may not copy, reproduce, or redistribute
                protected content without appropriate permission.
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="policy-heading">
                10. Disclaimer
              </h2>

              <p className="policy-text">
                Butcher's Kitchen is provided on an "as is" and "as
                available" basis. We make no guarantee that the service will
                be completely accurate, secure, uninterrupted, or suitable
                for every purpose.
              </p>
            </section>

            {/* Liability */}
            <section>
              <h2 className="policy-heading">
                11. Limitation of Liability
              </h2>

              <p className="policy-text">
                To the extent permitted by applicable law, Butcher's Kitchen
                and its developers are not responsible for losses or damages
                resulting from your use of the service or reliance on
                information provided through the website.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="policy-heading">
                12. Changes to These Terms
              </h2>

              <p className="policy-text">
                These Terms of Service may be updated from time to time.
                Updated terms will be posted on this page with a new revision
                date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="policy-heading">
                13. Contact
              </h2>

              <p className="policy-text">
                If you have questions about these Terms of Service, please
                contact us through the Butcher's Kitchen website.
              </p>
            </section>

          </div>
        </div>


      </div>
    </div>
  );
}
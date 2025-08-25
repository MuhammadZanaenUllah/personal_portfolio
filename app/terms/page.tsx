import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | M.Zanaen Ullah",
  description:
    "Terms and Conditions for M.Zanaen Ullah portfolio website. Read our terms of service and usage guidelines.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "usage guidelines",
    "legal terms",
  ],
};

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Agreement to Terms
              </h2>
              <p className="mb-4">
                By accessing and using this website (zanaen.pk), you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
              <p>
                These Terms and Conditions (&quot;Terms&quot;) govern your use
                of M.Zanaen Ullah&apos;s portfolio website operated by M.Zanaen Ullah
                (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Use License
              </h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the
                materials on M.Zanaen Ullah&apos;s website for personal,
                non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>modify or copy the materials</li>
                <li>
                  use the materials for any commercial purpose or for any public
                  display (commercial or non-commercial)
                </li>
                <li>
                  attempt to decompile or reverse engineer any software
                  contained on the website
                </li>
                <li>
                  remove any copyright or other proprietary notations from the
                  materials
                </li>
              </ul>
              <p>
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by us at any time. Upon
                terminating your viewing of these materials or upon the
                termination of this license, you must destroy any downloaded
                materials in your possession whether in electronic or printed
                format.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Disclaimer
              </h2>
              <p className="mb-4">
                The materials on M.Zanaen Ullah&apos;s website are provided on an &apos;as
                is&apos; basis. M.Zanaen Ullah makes no warranties, expressed or
                implied, and hereby disclaims and negates all other warranties
                including without limitation, implied warranties or conditions
                of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
              <p>
                Further, M.Zanaen Ullah does not warrant or make any
                representations concerning the accuracy, likely results, or
                reliability of the use of the materials on its website or
                otherwise relating to such materials or on any sites linked to
                this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Limitations
              </h2>
              <p>
                In no event shall M.Zanaen Ullah or its suppliers be liable for
                any damages (including, without limitation, damages for loss of
                data or profit, or due to business interruption) arising out of
                the use or inability to use the materials on M.Zanaen Ullah&apos;s
                website, even if M.Zanaen Ullah or a M.Zanaen Ullah authorized
                representative has been notified orally or in writing of the
                possibility of such damage. Because some jurisdictions do not
                allow limitations on implied warranties, or limitations of
                liability for consequential or incidental damages, these
                limitations may not apply to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Accuracy of Materials
              </h2>
              <p>
                The materials appearing on M.Zanaen Ullah&apos;s website could
                include technical, typographical, or photographic errors.
                M.Zanaen Ullah does not warrant that any of the materials on its
                website are accurate, complete, or current. M.Zanaen Ullah may
                make changes to the materials contained on its website at any
                time without notice. However, M.Zanaen Ullah does not make any
                commitment to update the materials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Links
              </h2>
              <p className="mb-4">
                M.Zanaen Ullah has not reviewed all of the sites linked to our
                website and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by M.Zanaen Ullah of the site. Use of any such
                linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. User Content
              </h2>
              <p className="mb-4">
                Our website may allow you to post, link, store, share and
                otherwise make available certain information, text, graphics,
                videos, or other material (&quot;Content&quot;). You are responsible for
                the Content that you post to the website, including its
                legality, reliability, and appropriateness.
              </p>
              <p className="mb-4">
                By posting Content to the website, you grant us the right and
                license to use, modify, publicly perform, publicly display,
                reproduce, and distribute such Content on and through the
                website.
              </p>
              <p className="mb-4">
                You retain any and all of your rights to any Content you submit,
                post or display on or through the website and you are
                responsible for protecting those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Prohibited Uses
              </h2>
              <p className="mb-4">You may not use our website:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  For any unlawful purpose or to solicit others to perform
                  unlawful acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>To submit false or misleading information</li>
                <li>
                  To upload or transmit viruses or any other type of malicious
                  code
                </li>
                <li>To collect or track the personal information of others</li>
                <li>
                  To spam, phish, pharm, pretext, spider, crawl, or scrape
                </li>
                <li>For any obscene or immoral purpose</li>
                <li>
                  To interfere with or circumvent the security features of the
                  website
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Intellectual Property Rights
              </h2>
              <p className="mb-4">
                The website and its original content, features, and
                functionality are and will remain the exclusive property of
                M.Zanaen Ullah and its licensors. The website is protected by
                copyright, trademark, and other laws. Our trademarks and trade
                dress may not be used in connection with any product or service
                without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Termination
              </h2>
              <p>
                We may terminate or suspend your access immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms. Upon termination,
                your right to use the website will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Governing Law
              </h2>
              <p>
                These Terms shall be interpreted and governed by the laws of
                Pakistan, without regard to its conflict of law provisions. Our
                failure to enforce any right or provision of these Terms will
                not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. Changes to Terms
              </h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days notice prior to any new
                terms taking effect. What constitutes a material change will be
                determined at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                13. Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions,
                please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>
                  <strong>Email:</strong> contact@zanaen.pk
                </p>
                <p>
                  <strong>Website:</strong> zanaen.pk
                </p>
                <p>
                  <strong>Address:</strong> Pakistan
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                14. Acknowledgment
              </h2>
              <p>
                By using our website, you acknowledge that you have read these
                Terms and Conditions and agree to be bound by them. If you do
                not agree to these Terms and Conditions, you must not use our
                website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

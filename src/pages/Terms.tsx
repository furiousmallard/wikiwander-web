import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-teal hover:text-teal-dark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to WikiWanderer
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-2">
          Terms of Use
        </h1>
        <p className="text-text-secondary mb-8">
          Last updated: March 10, 2026
        </p>

        <div className="prose prose-navy max-w-none">
          <p className="text-text-secondary mb-6">
            Welcome to WikiWanderer! By using our app, you agree to these Terms of
            Use. Please read them carefully.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            1. Service Description
          </h2>
          <p className="text-text-secondary mb-4">
            WikiWanderer is an iOS application that provides:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Access to Wikipedia's featured articles through an enhanced reading experience</li>
            <li>Daily discovery of curated Wikipedia content</li>
            <li>Tracking of your reading journey and exploration streaks</li>
            <li>Ability to save and share your Wikipedia wanderings</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            2. Subscription and Payment
          </h2>
          <p className="text-text-secondary mb-4">
            WikiWanderer may offer subscription-based features:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Subscriptions are billed through Apple's App Store</li>
            <li>Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period</li>
            <li>You can manage or cancel your subscription through your App Store account settings</li>
            <li>Refunds are handled according to Apple's App Store policies</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            3. Acceptable Use
          </h2>
          <p className="text-text-secondary mb-4">
            When using WikiWanderer, you agree not to:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Use the app for any unlawful purpose</li>
            <li>Attempt to reverse engineer or modify the app</li>
            <li>Use automated systems to access the app beyond reasonable use</li>
            <li>Share your subscription with others</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            4. Content and Intellectual Property
          </h2>
          <p className="text-text-secondary mb-6">
            Wikipedia content displayed in WikiWanderer is provided by Wikipedia
            and is subject to Wikipedia's licensing terms. WikiWanderer's app
            design, features, and original content are owned by Mallard
            Foundries.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            5. Your Data
          </h2>
          <p className="text-text-secondary mb-6">
            Your reading history and preferences remain your data. We store this
            information locally on your device to provide the service. See our{' '}
            <Link to="/privacy" className="text-teal hover:text-teal-dark">
              Privacy Policy
            </Link>{' '}
            for more details.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            6. Disclaimer of Warranties
          </h2>
          <p className="text-text-secondary mb-6">
            WikiWanderer is provided "as is" without warranties of any kind,
            either express or implied. We do not guarantee that the app will be
            uninterrupted, error-free, or that Wikipedia content will always be
            available.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            7. Limitation of Liability
          </h2>
          <p className="text-text-secondary mb-6">
            To the maximum extent permitted by law, Mallard Foundries shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use of WikiWanderer.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            8. Changes to the Service
          </h2>
          <p className="text-text-secondary mb-6">
            We reserve the right to modify, suspend, or discontinue WikiWanderer
            at any time. We will provide reasonable notice of significant
            changes when possible.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            9. Termination
          </h2>
          <p className="text-text-secondary mb-6">
            You may stop using WikiWanderer at any time by deleting the app. We
            may terminate or suspend your access if you violate these Terms.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            10. Changes to These Terms
          </h2>
          <p className="text-text-secondary mb-6">
            We may update these Terms from time to time. Continued use of
            WikiWanderer after changes constitutes acceptance of the new Terms.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            11. Contact Us
          </h2>
          <p className="text-text-secondary mb-6">
            If you have any questions about these Terms, please{' '}
            <Link to="/support" className="text-teal hover:text-teal-dark">
              contact us
            </Link>
            .
          </p>
        </div>

        <footer className="mt-12 pt-8 border-t border-navy/10">
          <p className="text-sm text-text-secondary text-center">
            A project of{' '}
            <a
              href="https://mallardfoundries.com"
              className="text-teal hover:text-teal-dark transition-colors"
            >
              Mallard Foundries
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-teal hover:text-teal-dark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to WikiWander
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-2">
          Privacy Policy
        </h1>
        <p className="text-text-secondary mb-8">
          Last updated: March 10, 2026
        </p>

        <div className="prose prose-navy max-w-none">
          <p className="text-text-secondary mb-6">
            WikiWander is committed to protecting your privacy. This Privacy
            Policy explains how we handle information when you use our iOS app.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-text-secondary mb-4">
            WikiWander is designed with privacy in mind. We collect minimal
            information:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>
              <strong>Local app data:</strong> Your reading history, saved
              articles, and preferences are stored locally on your device
            </li>
            <li>
              <strong>Usage analytics:</strong> We may collect anonymous usage
              statistics to improve the app experience
            </li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-text-secondary mb-4">
            Any information we collect is used solely to:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Provide and maintain the WikiWander service</li>
            <li>Track your reading streaks and journey history</li>
            <li>Improve app performance and user experience</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            Data Storage and Security
          </h2>
          <p className="text-text-secondary mb-6">
            Your data is stored locally on your device. We do not operate
            backend servers that store your personal reading history or
            preferences. Wikipedia content is fetched directly from Wikipedia's
            public API.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            Third-Party Services
          </h2>
          <p className="text-text-secondary mb-6">
            WikiWander connects to Wikipedia's public API to fetch article
            content. Your requests go directly to Wikipedia's servers. We
            recommend reviewing Wikipedia's privacy policy for information about
            how they handle requests.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            Your Control Over Your Data
          </h2>
          <p className="text-text-secondary mb-4">
            You have full control over your data:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6 space-y-2">
            <li>Clear your reading history at any time within the app</li>
            <li>Delete the app to remove all locally stored data</li>
            <li>Manage app permissions through iOS Settings</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            Children's Privacy
          </h2>
          <p className="text-text-secondary mb-6">
            WikiWander does not knowingly collect personal information from
            children under 13. If you are a parent or guardian and believe your
            child has provided us with personal information, please contact us.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            Changes to This Policy
          </h2>
          <p className="text-text-secondary mb-6">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-text-secondary mb-6">
            If you have any questions about this Privacy Policy, please{' '}
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

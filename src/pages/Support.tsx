import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// TODO: Replace with your Tally form ID
const TALLY_FORM_ID = 'GxrlDQ';

export default function Support() {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy dark:text-text-primary-dark mb-8">
          Support
        </h1>

        <div className="prose prose-navy dark:prose-invert max-w-none">
          <h2 className="font-serif text-xl font-bold text-navy dark:text-text-primary-dark mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 mb-12">
            <div>
              <h3 className="font-semibold text-navy dark:text-text-primary-dark mb-2">
                How does the Daily Wander work?
              </h3>
              <p className="text-text-secondary dark:text-text-secondary-dark">
                Each day, WikiWander presents you with Wikipedia's featured
                article of the day. This becomes your starting point for
                exploration. Follow links that interest you and see where your
                curiosity takes you!
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-navy dark:text-text-primary-dark mb-2">
                How are reading streaks calculated?
              </h3>
              <p className="text-text-secondary dark:text-text-secondary-dark">
                Your streak increases each day you read at least one article in
                WikiWander. Miss a day, and your streak resets. Build a habit of
                daily exploration!
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-navy dark:text-text-primary-dark mb-2">
                Can I save articles for later?
              </h3>
              <p className="text-text-secondary dark:text-text-secondary-dark">
                Yes! You can save any article to your reading list. Your saved
                articles are stored locally on your device and available
                offline.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-navy dark:text-text-primary-dark mb-2">
                Is my reading history private?
              </h3>
              <p className="text-text-secondary dark:text-text-secondary-dark">
                Absolutely. Your reading history is stored only on your device.
                We don't track or store your browsing activity on any servers.
                See our{' '}
                <Link to="/privacy" className="text-teal hover:text-teal-dark">
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-navy dark:text-text-primary-dark mb-2">
                How do I share my journey?
              </h3>
              <p className="text-text-secondary dark:text-text-secondary-dark">
                Tap the share button on any journey to create a beautiful visual
                summary of your Wikipedia rabbit hole. Share it with friends to
                show them where your curiosity took you!
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-navy dark:text-text-primary-dark mb-2">
                Does WikiWander work offline?
              </h3>
              <p className="text-text-secondary dark:text-text-secondary-dark">
                WikiWander caches recently viewed articles for offline reading.
                Saved articles are also available offline. New articles require
                an internet connection to load.
              </p>
            </div>
          </div>

          <h2 className="font-serif text-xl font-bold text-navy dark:text-text-primary-dark mb-4">
            Contact Us
          </h2>
          <p className="text-text-secondary dark:text-text-secondary-dark mb-6">
            Can't find what you're looking for? Send us a message and we'll get
            back to you.
          </p>

          <div className="bg-card dark:bg-card-dark rounded-2xl p-6">
            <iframe
              data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
              loading="lazy"
              width="100%"
              height="300"
              frameBorder="0"
              title="Contact form"
              className="min-h-[300px]"
            />
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-navy/10 dark:border-white/10">
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark text-center">
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

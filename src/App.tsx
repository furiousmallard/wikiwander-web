import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Footprints,
  Share2,
  Flame,
  ExternalLink,
  CloudSun,
} from 'lucide-react';

// Types
interface DailyArticle {
  title: string;
  summary: string;
  thumbnail?: string;
  url: string;
  date: string;
}

// Helper to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00Z');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

// Fetch today's date formatted for Wikipedia API
function getTodayForWikipedia(): { year: string; month: string; day: string } {
  const now = new Date();
  return {
    year: String(now.getUTCFullYear()),
    month: String(now.getUTCMonth() + 1).padStart(2, '0'),
    day: String(now.getUTCDate()).padStart(2, '0'),
  };
}

// Fetch daily article from our API or fallback to Wikipedia
async function fetchDailyArticle(): Promise<DailyArticle> {
  // Try our API first
  try {
    const response = await fetch('/api/daily-wander');
    if (response.ok) {
      return response.json();
    }
  } catch {
    // Fall through to Wikipedia fallback
  }

  // Fallback: fetch directly from Wikipedia
  const { year, month, day } = getTodayForWikipedia();
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/feed/featured/${year}/${month}/${day}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch daily article');
  }

  const data = await response.json();
  const tfa = data.tfa;

  if (!tfa) {
    throw new Error('No featured article today');
  }

  return {
    title: tfa.title,
    summary: tfa.extract,
    thumbnail: tfa.thumbnail?.source,
    url: tfa.content_urls.desktop.page,
    date: `${year}-${month}-${day}`,
  };
}

// Components
function Hero() {
  return (
    <section className="pt-16 pb-12 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <img
          src="/appicon.png"
          alt="WikiWanderer app icon"
          className="w-24 h-24 mx-auto mb-6 shadow-xl"
          style={{ borderRadius: '22%' }}
        />
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
          WikiWanderer
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          Let's get lost in Wikipedia
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download on the App Store
        </a>
      </div>
    </section>
  );
}

function DailyWanderCard() {
  const [article, setArticle] = useState<DailyArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDailyArticle()
      .then(setArticle)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-center text-navy mb-6">
            Today's Daily Wander
          </h2>
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <div className="skeleton h-48 w-full" />
            <div className="p-6">
              <div className="skeleton h-4 w-32 mb-4 rounded" />
              <div className="skeleton h-7 w-3/4 mb-3 rounded" />
              <div className="skeleton h-4 w-full mb-2 rounded" />
              <div className="skeleton h-4 w-full mb-2 rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden p-8 text-center">
            <CloudSun className="w-12 h-12 mx-auto mb-4 text-gold" />
            <h2 className="font-serif text-xl font-bold text-navy mb-2">
              Check back later for today's wander
            </h2>
            <p className="text-text-secondary">
              We're preparing something interesting for you.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center text-navy mb-6">
          Today's Daily Wander
        </h2>
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <p className="text-sm font-semibold text-gold uppercase tracking-wide mb-2">
              {formatDate(article.date)}
            </p>
            <h3 className="font-serif text-2xl font-bold text-navy mb-3">
              {article.title}
            </h3>
            <p className="text-text-secondary line-clamp-3 mb-4">
              {article.summary}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal hover:text-teal-dark font-medium transition-colors"
            >
              Read on Wikipedia
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <p className="text-center mt-4 text-sm text-text-secondary">
          Follow{' '}
          <a
            href="https://bsky.app/profile/wikiwander.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:text-teal-dark transition-colors"
          >
            @wikiwander.bsky.social
          </a>{' '}
          for daily wanders
        </p>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Compass,
      label: 'Daily discovery',
      description: 'Start each day with a featured article',
    },
    {
      icon: Footprints,
      label: 'Rabbit hole trails',
      description: 'Track your journey through Wikipedia',
    },
    {
      icon: Share2,
      label: 'Share your wander',
      description: 'Show friends where curiosity took you',
    },
    {
      icon: Flame,
      label: 'Track your streaks',
      description: 'Build a habit of daily exploration',
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.label} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-teal/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-teal" />
              </div>
              <h3 className="font-semibold text-navy mb-1">
                {feature.label}
              </h3>
              <p className="text-sm text-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScreenshotImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setError(true);
    e.currentTarget.style.display = 'none';
  };

  if (error) return null;

  return (
    <div className="flex-shrink-0 w-48 md:w-64 rounded-3xl overflow-hidden shadow-xl bg-navy/10 relative">
      {!loaded && (
        <div className="skeleton w-full aspect-[9/19.5]" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto ${loaded ? '' : 'absolute inset-0 opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

function Screenshots() {
  const screenshots = [
    { src: '/screenshots/homescreen.webp', alt: 'WikiWanderer home screen' },
    { src: '/screenshots/wheretonext.webp', alt: 'WikiWanderer article view' },
    { src: '/screenshots/journey.webp', alt: 'WikiWanderer journey tracker' },
  ];

  return (
    <section className="py-16 px-6 bg-navy/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center text-navy mb-10">
          See it in action
        </h2>
        <div className="flex justify-center gap-4 md:gap-8 overflow-x-auto pb-4">
          {screenshots.map((screenshot) => (
            <ScreenshotImage
              key={screenshot.src}
              src={screenshot.src}
              alt={screenshot.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary mb-6">
          <Link to="/privacy" className="hover:text-teal transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-teal transition-colors">
            Terms of Use
          </Link>
          <Link to="/support" className="hover:text-teal transition-colors">
            Support
          </Link>
        </div>
        <p className="text-sm text-text-secondary">
          A project of{' '}
          <a
            href="https://mallardfoundries.com"
            className="text-teal hover:text-teal-dark transition-colors"
          >
            Mallard Foundries
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <DailyWanderCard />
      <Features />
      <Screenshots />
      <Footer />
    </div>
  );
}

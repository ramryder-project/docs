import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    title: 'One Home for Many Projects',
    description:
      'Give every memx-lab repository a shared technical front door, common language, and clear navigation.',
  },
  {
    title: 'Markdown-First Documentation',
    description:
      'Most content lives in simple Markdown files, so writing docs feels lightweight instead of heavyweight.',
  },
  {
    title: 'Open Source Presentation',
    description:
      'Combine a polished homepage, project index, roadmap, and design docs in the style people expect from mature projects.',
  },
];

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>memx-lab documentation</p>
        <h1 className={styles.title}>A shared docs hub for the memx-lab ecosystem</h1>
        <p className={styles.subtitle}>
          Publish a clear technical portal, document multiple related
          projects, and keep everything easy to maintain in Markdown.
        </p>
        <div className={styles.actions}>
          <Link className="button button--primary button--lg" to="/docs/overview">
            Start reading
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/projects">
            Explore projects
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {features.map((feature) => (
            <article key={feature.title} className={styles.card}>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className={clsx(styles.section, styles.band)}>
      <div className="container">
        <div className={styles.quickStart}>
          <div>
            <p className={styles.eyebrow}>docs structure</p>
            <h2>Keep shared concepts in one documentation hub</h2>
            <p>
              Use one dedicated portal for shared concepts and documentation
              index pages. Let each repository keep its own deep,
              project-specific details.
            </p>
          </div>
          <div className={styles.snippet}>
            <pre>
              <code>{`memx-docs
docs/
  overview.md
  projects.md
  architecture.md
  roadmap.md
src/pages/index.tsx`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Home"
      description="memx-lab documentation portal"
    >
      <HomepageHeader />
      <main>
        <FeatureGrid />
        <QuickStart />
      </main>
    </Layout>
  );
}

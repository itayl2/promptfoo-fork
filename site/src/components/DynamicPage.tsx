import React from 'react';
import Layout from '@theme/Layout';
import styles from './DynamicPage.module.css';

interface PageContent {
  title: string;
  content: string;
  features?: string[];
}

interface DynamicPageProps {
  pageContent: PageContent;
}

export default function DynamicPage(props: DynamicPageProps): React.ReactElement {
  const { pageContent } = props;
  const { title, content, features } = pageContent;

  return (
    <Layout title={title}>
      <main className={styles.dynamicPage}>
        <header className={styles.dynamicHeader}>
          <h1>{title}</h1>
          <p>{content}</p>
        </header>
        {features && features.length > 0 && (
          <section className={styles.featuresSection}>
            <h2>Features</h2>
            <ul className={styles.featureList}>
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </Layout>
  );
}

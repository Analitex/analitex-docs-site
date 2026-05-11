import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import {projectLinks} from '../config/projectLinks';
import styles from './index.module.css';

const highlights = [
  {
    title: 'Официальная документация платформы',
    description:
      'Этот сайт является официальной документацией по сервису оцифровки продаж на маркетплейсах.',
  },
  {
    title: 'Инструкции и правила',
    description:
      'Здесь собраны инструкции, регламенты, ответы на частые вопросы и материалы по работе с данными продаж.',
  },
  {
    title: 'Единая база знаний',
    description:
      'Используйте разделы документации как основной источник актуальной информации для пользователей и команды.',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={styles.heroBackdrop} />
      <div className="container">
        <p className={styles.kicker}>Официальная документация</p>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.primaryButton)}
            to="/docs/intro">
            Открыть документацию
          </Link>
        </div>
        <div className={styles.pills}>
          <span>Оцифровка продаж</span>
          <span>Маркетплейсы</span>
          <span>Инструкции</span>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Главная | ${siteConfig.title}`}
      description="Официальная документация Analitex, сервиса оцифровки продаж на маркетплейсах.">
      <HomepageHeader />
      <main className={styles.mainSection}>
        <div className={clsx('container', styles.grid)}>
          {highlights.map((item) => (
            <article key={item.title} className={styles.card}>
              <Heading as="h2" className={styles.cardTitle}>
                {item.title}
              </Heading>
              <p className={styles.cardDescription}>{item.description}</p>
            </article>
          ))}
        </div>
        <div className={clsx('container', styles.linksSection)}>
          <Heading as="h2" className={styles.linksTitle}>
            Ссылки проекта
          </Heading>
          <div className={styles.linksGrid}>
            {projectLinks.map((item) => (
              <Link
                key={item.url}
                className={styles.linkCard}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer">
                <span className={styles.linkName}>{item.title}</span>
                <span className={styles.linkDescription}>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

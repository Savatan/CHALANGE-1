'use client';

import { useRef, useState } from 'react';
import styles from './News.module.scss';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function NewsClient({ posts = [] }: { posts: Post[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const IMAGE_COUNT = 4;
  const images = posts.map((_, i) => {
    const index = (i % IMAGE_COUNT) + 1;
    return `/images/news-${index}.png`;
  });

  const visiblePosts = posts;

  const CARD_STEP = 500;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -CARD_STEP, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: CARD_STEP, behavior: 'smooth' });
  };

  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Новости и блог</h2>
        </div>
        <div className={styles.separator} />

        <div className={styles.sliderRow}>
          {!showAll && (
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={scrollLeft}
            >
              ←
            </button>
          )}

          <div
            ref={sliderRef}
            className={showAll ? styles.grid : styles.slider}
          >
          {visiblePosts.map((post, index) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.imageWrapper}>

                <img
                  src={images[index]}
                  alt={post.title}
                  className={styles.image}
                />
              </div>

              <div className={styles.content}>
                <span className={styles.date}>27.03.2000г</span>
                <h3>Как подготовиться к протезированию зубов</h3>
                <p>
                  Решаясь на такую процедуру, каждый пациент надеется, что зубной протез будет
                  функциональным, удобным, эстетичным и прослужит долгие годы. При этом необходимо
                </p>
              </div>
            </article>
          ))}
        </div>

        {!showAll && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={scrollRight}
          >
            →
          </button>
        )}
      </div>

      <div className={styles.buttonWrapper}>
          <button
            className={styles.allButton}
            type="button"
            onClick={() => {
              setShowAll((prev) => {
                const next = !prev;
                if (!next) {
                  sliderRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
                }
                return next;
              });
            }}
          >
            {showAll ? 'Скрыть публикации' : 'Все публикации'} 
          </button>
        </div>
      </div>
    </section>
  );
}

import styles from './Values.module.scss';

export default function Values() {
  return (
    <section className={styles.values}>
      <div className={styles.lineTop} />
      <h2 className={styles.title}>Наши ценности</h2>

      <div className={styles.grid}>
        <div className={styles.item}>
          <div className={styles.text}>
            <div className={styles.headingRow}>
              <span className={styles.number}>01</span>
              <h3>Стандарты сервиса</h3>
            </div>
            <p>
              Каждый пациент достоин особого отношения к нему,
              врачи рассчитывают на лечение у лучших докторов
              с применением новейших технологий.
            </p>
          </div>
          <div className={styles.image}>
            <img src="/images/diamonds.png" alt="" />
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.text}>
            <div className={styles.headingRow}>
              <span className={styles.number}>03</span>
              <h3>Современные технологии</h3>
            </div>
            <p>
              Используем современное оборудование и проверенные
              методы лечения.
            </p>
          </div>
          <div className={styles.image}>
            <img src="/images/microscope.png" alt="" />
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.text}>
            <div className={styles.headingRow}>
              <span className={styles.number}>02</span>
              <h3>Квалифицированные доктора</h3>
            </div>
            <p>
              Каждый пациент достоин особого отношения к нему,
              врачи рассчитывают на лечение у лучших докторов.
            </p>
          </div>
          <div className={styles.image}>
            <img src="/images/tooth.png" alt="" />
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.text}>
            <div className={styles.headingRow}>
              <span className={styles.number}>04</span>
              <h3>Забота о детях</h3>
            </div>
            <p>
              Комфортное лечение детей с вниманием к каждому пациенту.
            </p>
          </div>
          <div className={styles.image}>
            <img src="/images/kids.png" alt="" />
          </div>
        </div>
      </div>
      <div className={styles.lineBottom} />
    </section>
  );
}

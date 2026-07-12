import styles from '../../../pages/ProfilePage/profile-page.module.css';

const ProfileSkeleton = () => (
    <section className={styles.profileSection} aria-busy="true">
        <header className={styles.header}>
            <span className={`${styles.avatar} ${styles.skeleton}`} />
            <div className={styles.identity}>
                <span className={`${styles.skeleton} ${styles.skeletonTitle}`} />
                <span className={`${styles.skeleton} ${styles.skeletonText}`} />
            </div>
        </header>

        <hr />

        <dl className={styles.infoList}>
            {Array.from({ length: 3 }).map((_, index) => (
                <div className={styles.infoRow} key={index}>
                    <span className={`${styles.skeleton} ${styles.skeletonText}`} />
                    <span className={`${styles.skeleton} ${styles.skeletonText}`} />
                </div>
            ))}
        </dl>

        <hr />

        <footer className={styles.settings}>
            <span className={`${styles.skeleton} ${styles.skeletonButton}`} />
            <span className={`${styles.skeleton} ${styles.skeletonButton}`} />
        </footer>
    </section>
);

export default ProfileSkeleton;

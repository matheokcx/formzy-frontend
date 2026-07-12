import { lazy, Suspense } from 'react';
import styles from './profile-page.module.css';
import ProfileSkeleton from '../../components/UI/Profile/ProfileSkeleton.tsx';

const ProfileCard = lazy(() => import('../../components/UI/Profile/ProfileCard.tsx'));

const ProfilePage = () => (
    <main className={styles.profilePage}>
        <Suspense fallback={<ProfileSkeleton />}>
            <ProfileCard />
        </Suspense>
    </main>
);

export default ProfilePage;

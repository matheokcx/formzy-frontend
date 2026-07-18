import FormList from '@/components/UI/Form/FormList/FormList.tsx';
import Sidebar from '@/components/UI/Form/Sidebar/Sidebar.tsx';
import styles from './forms-page.module.css';
import { useState } from 'react';
import type { FormStatus } from '@/types';

const FormsPage = () => {
    const [statusFilter, setStatusFilter] = useState<FormStatus>(
        (localStorage.getItem('form-status-filter') as FormStatus) ?? 'all',
    );

    const handleFilterChange = (filter: FormStatus): void => {
        localStorage.setItem('form-status-filter', filter);
        setStatusFilter(filter);
    };

    return (
        <main className={styles.page}>
            <Sidebar statusFilter={statusFilter} handleFilterChange={handleFilterChange} />
            <section className={styles.listSection}>
                <FormList statusFilter={statusFilter} />
            </section>
        </main>
    );
};

export default FormsPage;

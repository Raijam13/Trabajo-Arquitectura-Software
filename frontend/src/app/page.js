"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir al usuario a la página "home"
    router.push('/frontpage');
  }, [router]);

  return (
    <div className={styles.container}>
      <h1>Redirigiendo... aguarda p caumsa</h1>
    </div>
  );
}

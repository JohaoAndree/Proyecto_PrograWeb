import React from 'react';
import styles from './styles.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div className={styles.StatCard}>
      <div className={styles.StatIcon}>
        {icon}
      </div>
      <div className={styles.StatInfo}>
        <span className={styles.StatLabel}>{label}</span>
        <span className={styles.StatValue}>{value}</span>
      </div>
    </div>
  );
};

export default StatCard;

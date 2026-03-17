import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => {
  return (
    <div 
      className={`${styles.SkeletonBase} ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
};

export const SkeletonTable: React.FC = () => (
  <div className={styles.SkeletonTableContainer}>
    {[...Array(5)].map((_, i) => (
      <div key={i} className={styles.SkeletonTableRow}>
        <Skeleton width="20%" height="25px" />
        <Skeleton width="40%" height="25px" />
        <Skeleton width="15%" height="25px" />
        <Skeleton width="10%" height="25px" />
        <Skeleton width="10%" height="25px" />
      </div>
    ))}
  </div>
);

export const SkeletonCard: React.FC = () => (
  <div className={styles.SkeletonCardContainer}>
    <Skeleton width="50px" height="50px" borderRadius="12px" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Skeleton width="40%" height="12px" />
      <Skeleton width="70%" height="24px" />
    </div>
  </div>
);

export default Skeleton;

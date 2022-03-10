import React from 'react';
import styles from './file-status.module.scss';

export function FileStatus(props) {
  const { fileName, isPresent } = props;

  return (
    <div className={styles.file}>
      <span className={isPresent && styles.fileNamePresent}>
        {fileName}
      </span>
      {isPresent ? (
        <span className={styles.filePresent}>
          - processed &#x1f44d;
        </span>
      ) : (
        <span className={styles.fileNotPresent}>
          - missing
        </span>
      )}
    </div>
  );
}


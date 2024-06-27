import styles from './LikeButton.module.css';

function LikeButton(props) {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        checked={props.isCheckedLike}
        onChange={props.onChangeLike}
        className={styles.checkbox}
      />
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill={props.isCheckedLike ? 'red' : 'black'}
        className={styles.icon}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.12 3.12 5 5.5 5c1.74 0 3.41 1.01 4.5 2.44C11.09 6.01 12.76 5 14.5 5 16.88 5 18 6.12 18 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="none"
        />
      </svg>
    </label>
  );
}

export default LikeButton;

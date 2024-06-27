import styles from './BookMarkButton.module.css';

function BookMarkButton(props) {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        checked={props.isCheckedBook}
        onChange={props.onChangeBook}
        className={styles.checkbox}
      />
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill={props.isCheckedBook ? '#9B8273' : 'black'}
        className={styles.icon}
      >
        <path
          d="M6 2C4.9 2 4 2.9 4 4V20.5C4 20.78 4.22 21 4.5 21C4.67 21 4.84 20.93 4.95 20.8L12 14.5L19.05 20.8C19.16 20.93 19.33 21 19.5 21C19.78 21 20 20.78 20 20.5V4C20 2.9 19.1 2 18 2H6Z"
          stroke="none"
        />
      </svg>
    </label>
  );
}

export default BookMarkButton;

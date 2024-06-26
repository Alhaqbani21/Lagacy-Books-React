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
      {/*  */}
      <svg
        viewBox="-4 0 30 30"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlnssketch="http://www.bohemiancoding.com/sketch/ns"
        fill={props.isCheckedBook ? '#9B8273' : 'white'}
        className={styles.icon}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <title>bookmark</title> <desc>Created with Sketch Beta.</desc>{' '}
          <defs> </defs>{' '}
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill={props.isCheckedBook ? '#9B8273' : 'white'}
            sketchtype="MSPage"
          >
            {' '}
            <g
              id="Icon-Set"
              sketchtype="MSLayerGroup"
              transform="translate(-417.000000, -151.000000)"
              fill={props.isCheckedBook ? '#9B8273' : 'white'}
            >
              {' '}
              <path
                d="M437,177 C437,178.104 436.104,179 435,179 L428,172 L421,179 C419.896,179 419,178.104 419,177 L419,155 C419,153.896 419.896,153 421,153 L435,153 C436.104,153 437,153.896 437,155 L437,177 L437,177 Z M435,151 L421,151 C418.791,151 417,152.791 417,155 L417,177 C417,179.209 418.791,181 421,181 L428,174 L435,181 C437.209,181 439,179.209 439,177 L439,155 C439,152.791 437.209,151 435,151 L435,151 Z"
                id="bookmark"
                sketchtype="MSShapeGroup"
              >
                {' '}
              </path>{' '}
            </g>{' '}
          </g>{' '}
        </g>
      </svg>
      {/*  */}
      {/* <svg
        fill={isChecked ? '#9B8273' : 'white'}
        version="1.1"
        id="XMLID_298_"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        xml:space="preserve"
        className={styles.icon}
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <g id="favorite">
            {' '}
            <path d="M12,23.2l-0.6-0.5C8.7,20.7,0,13.5,0,7.3C0,3.8,2.9,1,6.5,1c2.2,0,4.3,1.1,5.5,2.9l0,0l0,0C13.2,2.1,15.3,1,17.5,1 C21.1,1,24,3.8,24,7.3c0,6.3-8.7,13.4-11.4,15.5L12,23.2z M6.5,2.9C4,2.9,2,4.8,2,7.2c0,4.1,5.1,9.5,10,13.4 c4.9-3.9,10-9.3,10-13.4c0-2.4-2-4.3-4.5-4.3c-1.6,0-3,0.8-3.8,2L12,7.6L10.3,5C9.5,3.7,8.1,2.9,6.5,2.9z"></path>{' '}
          </g>{' '}
        </g>
      </svg> */}
      {/*  */}
    </label>
  );
}

export default BookMarkButton;

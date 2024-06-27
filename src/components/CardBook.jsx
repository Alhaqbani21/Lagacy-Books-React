import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeButton from './LikeButton/LikeButton.jsx';
import BookMarkButton from './BookMarkButton/BookMarkButton.jsx';

function CardBook({ rank, title, book_image, onClickView }) {
  const [isCheckedLike, setIsCheckedLike] = useState(false);
  const [isCheckedBook, setIsCheckedBook] = useState(false);
  const userId = localStorage.getItem('userId');
  const url1 = `https://667ba97dbd627f0dcc9358df.mockapi.io/LagacyBookstore/${userId}`;

  useEffect(() => {
    if (userId) {
      axios.get(url1).then((response) => {
        const userData = response.data;
        const booksLiked = userData.booksLiked || [];
        const booksBookMarked = userData.booksBookMarked || [];
        setIsCheckedLike(booksLiked.includes(rank));
        setIsCheckedBook(booksBookMarked.includes(rank));
      });
    }
  }, [rank, url1, userId]);

  const handleChangeLike = () => {
    axios.get(url1).then((response) => {
      const userData = response.data;
      const booksLiked = userData.booksLiked || [];
      const updatedBooksLiked = isCheckedLike
        ? booksLiked.filter((bookRank) => bookRank !== rank)
        : [...booksLiked, rank];

      axios
        .put(url1, { booksLiked: updatedBooksLiked })
        .then((response) => {
          setIsCheckedLike(!isCheckedLike);
        })
        .catch((error) => {
          console.error('Error updating like status:', error);
        });
    });
  };

  const handleChangeBook = () => {
    axios.get(url1).then((response) => {
      const userData = response.data;
      const booksBookMarked = userData.booksBookMarked || [];
      const updatedbooksBookMarked = isCheckedBook
        ? booksBookMarked.filter((bookRank) => bookRank !== rank)
        : [...booksBookMarked, rank];

      axios
        .put(url1, { booksBookMarked: updatedbooksBookMarked })
        .then((response) => {
          setIsCheckedBook(!isCheckedBook);
        })
        .catch((error) => {
          console.error('Error updating bookmark status:', error);
        });
    });
  };

  return (
    <div className="w-[18rem] border rounded-lg shadow-2xl bg-[#707487]">
      <div className="w-full h-[250px]">
        <img
          className="rounded-t-lg w-full h-full object-cover"
          src={book_image}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5 my-7">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h5>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse"></div>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={onClickView} className="btn btn-primary text-white">
            View Book
          </button>
          <div className="flex gap-5 justify-center items-center">
            {userId && (
              <>
                <LikeButton
                  isCheckedLike={isCheckedLike}
                  onChangeLike={handleChangeLike}
                />
                <BookMarkButton
                  isCheckedBook={isCheckedBook}
                  onChangeBook={handleChangeBook}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBook;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeButton from './LikeButton/LikeButton.jsx';
import BookMarkButton from './BookMarkButton/BookMarkButton.jsx';

function CardBook({ rank, title, book_image }) {
  const [isCheckedLike, setIsCheckedLike] = useState(false);
  const [isCheckedBook, setIsCheckedBook] = useState(false);
  const userId = localStorage.getItem('userId');
  const url1 = `https://667ba97dbd627f0dcc9358df.mockapi.io/LagacyBookstore/${userId}`;
  if (userId) {
    useEffect(() => {
      axios.get(url1).then((response) => {
        const userData = response.data;
        const booksLiked = userData.booksLiked || [];
        const booksBookMarked = userData.booksBookMarked || [];
        if (booksLiked.includes(rank)) {
          setIsCheckedLike(true);
        }
        if (booksBookMarked.includes(rank)) {
          setIsCheckedBook(true);
        }
      });
    }, [rank, url1]);
  }

  function handleChangeLike() {
    axios.get(url1).then((response) => {
      const userData = response.data;
      const booksLiked = userData.booksLiked || [];

      let updatedBooksLiked;
      if (isCheckedLike) {
        updatedBooksLiked = booksLiked.filter((bookRank) => bookRank !== rank);
      } else {
        updatedBooksLiked = [...booksLiked, rank];
      }

      axios
        .put(url1, { booksLiked: updatedBooksLiked })
        .then((response) => {
          console.log(response.data);
          setIsCheckedLike(!isCheckedLike);
        })
        .catch((error) => {
          console.error('Error updating like status:', error);
        });
    });
  }
  function handleChangeBook() {
    axios.get(url1).then((response) => {
      const userData = response.data;
      const booksBookMarked = userData.booksBookMarked || [];

      let updatedbooksBookMarked;
      if (isCheckedLike) {
        updatedbooksBookMarked = booksBookMarked.filter(
          (bookRank) => bookRank !== rank
        );
      } else {
        updatedbooksBookMarked = [...booksBookMarked, rank];
      }

      axios
        .put(url1, { booksBookMarked: updatedbooksBookMarked })
        .then((response) => {
          console.log(response.data);
          setIsCheckedBook(!isCheckedBook);
        })
        .catch((error) => {
          console.error('Error updating like status:', error);
        });
    });
  }

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
          <button className="btn btn-primary text-white">View Book</button>
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

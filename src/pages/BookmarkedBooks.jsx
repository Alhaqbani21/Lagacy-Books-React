import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import imagePlaceholder from '../assets/imagePlaceholder.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardBook from '../components/CardBook';
import Footer from '../components/Footer';

function BookmarkedBooks() {
  const userId = localStorage.getItem('userId');
  const url1 = `https://667ba97dbd627f0dcc9358df.mockapi.io/LagacyBookstore/${userId}`;
  const [imageUrl, setImageUrl] = useState(imagePlaceholder);
  const [editAlert, setEditAlert] = useState(false);
  const [showAvatarModel, setShowAvatarModel] = useState(false);
  const [inputImageUrl, setInputImageUrl] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [booksBookMarked, setBooksBookMarked] = useState([]);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchData();
    } else {
      setError('No allowed Access');
    }
  }, [userId]);

  if (error) {
    throw Error;
  }

  const fetchData = () => {
    axios.get(url1).then((response) => {
      const userData = response.data;
      if (userData.imgUrl) {
        setImageUrl(userData.imgUrl);
      }
      if (userData.booksBookMarked && userData.booksBookMarked.length > 0) {
        fetchBooks(userData.booksBookMarked);
      } else {
        setBooksBookMarked([]);
      }
    });
  };

  const fetchBooks = (bookmarkedBookIds) => {
    const url2 = `https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?api-key=s2775g3di5VkoX0jmyif1P9Px78znALO`;

    axios.get(url2).then((response) => {
      const books = response.data.results.books;
      const bookmarkedBooksData = books.filter((book) =>
        bookmarkedBookIds.includes(book.rank)
      );
      setBooksBookMarked(bookmarkedBooksData);
    });
  };

  const imageChanger = (e) => {
    setInputImageUrl(e.target.value);
    setErrorAlert(false);
    if (e.target.value === '') {
      setImageUrl(imagePlaceholder);
    } else {
      setImageUrl(e.target.value);
    }
  };

  const changeImage = () => {
    if (inputImageUrl !== '') {
      axios.put(url1, { imgUrl: inputImageUrl }).then((response) => {
        setEditAlert(true);
        setInputImageUrl('');
        setTimeout(() => setEditAlert(false), 2000);
      });
    } else {
      setErrorAlert(true);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <NavBar
          rightTitle="Logout"
          rightTitleLink="./Login"
          img={imageUrl}
          onClickAvatar={() => setShowAvatarModel(true)}
        />
        {editAlert && (
          <div className="alert alert-success fixed z-50 w-60 top-20 right-5">
            <span>Avatar has been updated</span>
          </div>
        )}
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
          open={showAvatarModel}
        >
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-primary">
              Update Your Avatar
            </h3>
            <div className="avatar flex-col justify-center items-center gap-5 max-md:max-w-screen w-full my-3">
              <div className="w-[360px] h-[360px] max-md:w-full max-md:h-auto flex justify-center items-center flex-col">
                <div>Profile Image</div>
                <img
                  className="w-full h-full object-cover rounded"
                  src={imageUrl}
                  alt="Avatar"
                />
              </div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Change Avatar</span>
                </div>
                <input
                  type="url"
                  placeholder="https://image.jpeg"
                  className="input input-bordered w-full max-w-xs"
                  value={inputImageUrl}
                  onChange={imageChanger}
                />
                {errorAlert && (
                  <label className="text-warning">Invalid URL</label>
                )}
              </label>
            </div>
            <div className="modal-action">
              <div className="flex gap-5">
                <button
                  className="btn"
                  onClick={() => setShowAvatarModel(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    changeImage();
                    setShowAvatarModel(false);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </dialog>

        <div className="container mx-auto py-8">
          <div className="divider divider-primary text-4xl max-md:text-2xl">
            Bookmarked Books
          </div>
          <div className="flex justify-center items-center my-10 gap-10 md:gap-20 flex-wrap md:px-10">
            {booksBookMarked.length > 0 ? (
              booksBookMarked.map((book) => (
                <CardBook
                  key={book.rank}
                  rank={book.rank}
                  title={book.title}
                  book_image={book.book_image}
                  onClickView={() => {
                    navigate(`../${book.rank}`);
                  }}
                />
              ))
            ) : (
              <p className="text-lg text-center">No Bookmarked books found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookmarkedBooks;

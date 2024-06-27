import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import HeroLanding from '../components/HeroLanding';
import CardBook from '../components/CardBook';
import SearchInput from '../components/SearchInput';
import Footer from '../components/Footer';
import imagePlaceholder from '../assets/imagePlaceholder.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [inputSearch, setInputSearch] = useState('');
  const userId = localStorage.getItem('userId');
  const url1 = `https://667ba97dbd627f0dcc9358df.mockapi.io/LagacyBookstore/${userId}`;
  const url2 = `https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?api-key=s2775g3di5VkoX0jmyif1P9Px78znALO`;
  const [imageUrl, setImageUrl] = useState(imagePlaceholder);
  const [inputImageUrl, setInputImageUrl] = useState('');
  const [showAvatarModel, setShowAvatarModel] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [editAlert, setEditAlert] = useState(false);
  const [featuresAlert, setfeaturesAlert] = useState(false);
  const [userData, setUserData] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [likes, setLikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchBooks();
  }, []);

  const fetchData = () => {
    if (userId) {
      axios.get(url1).then((response) => {
        const userData = response.data;
        setUserData(userData);
        setLikes(userData.booksLiked || []);
        setBooksData(userData.booksBookmarked || []);
        if (userData.imgUrl) {
          setImageUrl(userData.imgUrl);
        }
      });
    }
  };

  const fetchBooks = () => {
    axios.get(url2).then((response) => {
      const books = response.data.results.books;
      const uniqueBooks = books.filter(
        (book, index, self) =>
          index === self.findIndex((b) => b.rank === book.rank)
      );
      setBooksData(uniqueBooks);
      setFilteredBooks(uniqueBooks);
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
        setShowAvatarModel(false);
        setTimeout(() => setEditAlert(false), 2000);
      });
    } else {
      setErrorAlert(true);
    }
  };

  const handleSearchBooks = () => {
    let filtered = booksData;

    if (inputSearch !== '') {
      filtered = booksData.filter((book) =>
        book.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  return (
    <div>
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
      {featuresAlert && (
        <div className="alert alert-warning text-white fixed z-50 w-64 top-20 right-5">
          <span>Sign up to use this feature</span>
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
              <button className="btn" onClick={() => setShowAvatarModel(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  changeImage();
                }}
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <HeroLanding />
      <div className="flex justify-center items-center pt-20 flex-col bg-base-200">
        <div className="divider divider-primary text-5xl max-md:text-2xl">
          Most popular Books
        </div>
        <div className="my-5 flex justify-center items-center gap-5 rounded-lg p-5 max-md:flex-col w-[80%]">
          <SearchInput
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchBooks();
              }
            }}
          />
          <button
            onClick={handleSearchBooks}
            className="btn btn-primary text-white"
          >
            Search
          </button>
          <button
            onClick={() => {
              if (!userId) {
                setfeaturesAlert(true);
                setTimeout(() => {
                  setfeaturesAlert(false);
                }, 2000);
              } else {
                navigate('./FavoriteBooks');
              }
            }}
            className="btn btn-ghost bg-[#707487] text-white"
          >
            Favorite books
          </button>
          <button
            onClick={() => {
              if (!userId) {
                setfeaturesAlert(true);
                setTimeout(() => {
                  setfeaturesAlert(false);
                }, 2000);
              } else {
                navigate('./BookmarkedBooks');
              }
            }}
            className="btn btn-ghost bg-[#B9785F] text-white"
          >
            Bookmarked books
          </button>
        </div>
        <div className="flex justify-center items-center my-10 gap-10 md:gap-20 flex-wrap md:px-10">
          {filteredBooks.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 my-10 px-10">
              {filteredBooks.map((item) => (
                <CardBook
                  key={item.rank}
                  rank={item.rank}
                  title={item.title}
                  book_image={item.book_image}
                  onClickView={() => {
                    navigate(`./${item.rank}`);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-2xl text-primary h-[30vh]">
              Oops! No results found.
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

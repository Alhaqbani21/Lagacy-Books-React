import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import HeroLanding from '../components/HeroLanding';
import CardBook from '../components/CardBook';
import SearchInput from '../components/SearchInput';
import Footer from '../components/Footer';
import imagePlaceholder from '../assets/imagePlaceholder.png';
import axios from 'axios';

function LandingPage() {
  const [inputSearch, setinputSearch] = useState('');
  const userId = localStorage.getItem('userId');
  const url1 = `https://667ba97dbd627f0dcc9358df.mockapi.io/LagacyBookstore/${userId}`;
  const url2 = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=s2775g3di5VkoX0jmyif1P9Px78znALO`;
  const [imageUrl, setimageUrl] = useState(imagePlaceholder);
  const [inputImageUrl, setinputImageUrl] = useState('');
  const [showAvatarModel, setshowAvatarModel] = useState(false);
  const [errorAlert, seterrorAlert] = useState(false);
  const [editAlert, seteditAlert] = useState(false);
  const [data, setdata] = useState([]);
  const [databooks, setdataBooks] = useState([]);
  const [filteredDataBooks, setFilteredDataBooks] = useState([]);
  const [likes, setLikes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
    fetchBooks();
  }, []);

  const fetchData = () => {
    axios.get(url1).then((response) => {
      const userData = response.data;
      setdata(userData);
      setLikes(userData.booksLiked || []);
      setBookmarks(userData.booksBookmarked || []);
      if (userData.imgUrl) {
        setimageUrl(userData.imgUrl);
      }
    });
  };

  const fetchBooks = () => {
    axios.get(url2).then((response) => {
      const books = response.data.results.books;
      setdataBooks(books);
      setFilteredDataBooks(books);
    });
  };

  const imageChanger = (e) => {
    setinputImageUrl(e.target.value);
    seterrorAlert(false);
    if (e.target.value === '') {
      setimageUrl(imagePlaceholder);
    } else {
      setimageUrl(e.target.value);
    }
  };

  const changeImage = () => {
    if (inputImageUrl !== '') {
      axios.put(url1, { imgUrl: inputImageUrl }).then((response) => {
        seteditAlert(true);
        setinputImageUrl('');
        setTimeout(() => seteditAlert(false), 2000);
      });
    } else {
      seterrorAlert(true);
    }
  };

  const handleSearchBooks = () => {
    let filtered = databooks;

    if (inputSearch !== '') {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
    }

    setFilteredDataBooks(filtered);
  };

  return (
    <div>
      <NavBar
        rightTitle="Logout"
        rightTitleLink="./Login"
        img={imageUrl}
        onClickAvatar={() => setshowAvatarModel(true)}
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
              <button className="btn" onClick={() => setshowAvatarModel(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  changeImage();
                  setshowAvatarModel(false);
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
            onChange={(e) => setinputSearch(e.target.value)}
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
        </div>
        <div className="flex justify-center items-center my-10 gap-10 md:gap-20 flex-wrap md:px-10">
          {filteredDataBooks.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 my-10 px-10">
              {filteredDataBooks.map((item) => (
                <CardBook
                  key={item.rank}
                  rank={item.rank}
                  title={item.title}
                  book_image={item.book_image}
                />
              ))}
            </div>
          ) : (
            <div className="text-2xl text-primary h-[30vh]">
              Ooops No Result
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

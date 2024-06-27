import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import imagePlaceholder from '../assets/imagePlaceholder.png';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const userId = localStorage.getItem('userId');
  const url1 = `https://667ba97dbd627f0dcc9358df.mockapi.io/LagacyBookstore/${userId}`;
  const [imageUrl, setimageUrl] = useState(imagePlaceholder);
  const [editAlert, seteditAlert] = useState(false);
  const [showAvatarModel, setshowAvatarModel] = useState(false);
  const [inputImageUrl, setinputImageUrl] = useState('');
  const [errorAlert, seterrorAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    axios.get(url1).then((response) => {
      const userData = response.data;
      if (userData.imgUrl) {
        setimageUrl(userData.imgUrl);
      }
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

  useEffect(() => {
    // Fetch list of books
    axios
      .get(
        'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=s2775g3di5VkoX0jmyif1P9Px78znALO'
      )
      .then((response) => {
        // Assuming response.data.results.books is the array of books
        const books = response.data.results.books;
        // Find the specific book based on id (assuming id matches rank)
        const foundBook = books.find((book) => book.rank === parseInt(id));
        setBook(foundBook); // Set the found book to state
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
      <div className="bg-base-300 min-h-[90vh] flex justify-center items-center max-md:pt-5">
        <div className="max-w-[70%] max-md:w-[100%] bg-[#BCCCCB] rounded-lg shadow-lg overflow-hidden ">
          <div className="p-4 ">
            <div className="flex items-center mb-4 max-md:flex-col gap-10 ">
              <div className="flex-col justify-center items-center mb-4 max-md:flex-col gap-10 ">
                <h2 className="text-3xl font-semibold mb-4  text-white max-md:text-center">
                  {book.title}
                </h2>
                <img
                  src={book.book_image}
                  alt={book.title}
                  className="w-96 h-full object-cover rounded-lg mr-4 border-2 "
                />
              </div>
              <div className="font-bold ">
                <p className="text-3xl text-secondary font-bold">
                  {book.author}
                </p>
                <p className="text-secondary text-lg font-bold">
                  Publisher: {book.publisher}
                </p>
                <p className="text-secondary mt-2 text-lg max-md:w-[100%] w-[80%]">
                  {book.description}
                </p>
                <p className="text-secondary font-semibold mt-4">
                  ${book.price}
                </p>
                <div className="mt-4">
                  <p className="text-gray-600">Buy Now:</p>
                  <ul className="list-none pl-4">
                    {book.buy_links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate('../');
                }}
                className="btn btn-primary text-white self-end"
              >
                Back To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetails;

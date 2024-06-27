import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

function NavBar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    if (props.rightTitle === 'Logout') {
      localStorage.clear();
    }
  };

  return (
    <div className="navbar bg-base-300 text-base-content h-24 max-md:h-auto max-md:flex-col max-md:items-start">
      <div className="flex-1 max-md:w-full max-md:flex max-md:justify-between">
        <ul className="menu flex justify-center items-center">
          <li>
            <Link className=" flex justify-center items-center" to={'../'}>
              <img className="w-10" src={logo} alt="Logo" />
              <p className="text-2xl ">Lagacy Books</p>
            </Link>
          </li>
        </ul>
        {props.nameDetails && (
          <p className="mx-2 max-md:mt-2 max-md:text-lg">
            Welcome <span className="text-green-700">{props.nameDetails}</span>
          </p>
        )}

        <button
          className="max-md:block md:hidden px-2 py-1 text-xl"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      <div
        className={`flex-none max-md:w-full max-md:mt-2 ${
          menuOpen ? 'max-md:block' : 'max-md:hidden'
        }`}
      >
        <ul className="menu menu-horizontal px-1 text-xl max-md:flex max-md:flex-col max-md:items-start gap-5">
          {localStorage.getItem('userId') ? (
            <>
              <li className="max-md:w-full max-md:mb-2">
                <Link onClick={handleLogout} to={props.rightTitleLink}>
                  {props.rightTitle === 'Logout' ? (
                    <span className="text-red-500">{props.rightTitle}</span>
                  ) : (
                    props.rightTitle
                  )}
                </Link>
              </li>

              {props.img && (
                <li
                  onClick={props.onClickAvatar}
                  className="max-md:w-full max-md:flex-col flex flex-row"
                >
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={props.img} alt="Avatar" />
                    </div>
                    {props.name}
                  </div>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="max-md:w-full max-md:mb-2">
                <Link to="/Login">Login</Link>
              </li>
              <li className="max-md:w-full max-md:mb-2">
                <Link to="/SignUp">Sign Up</Link>
              </li>
            </>
          )}

          <li className="max-md:w-full max-md:flex-col flex flex-row">
            {props.endDelete && (
              <Link
                className=""
                onClick={() => {
                  props.endDelete === 'Delete Account'
                    ? props.onClickDelete()
                    : 0;
                }}
                // to={'../'}
              >
                {props.endDelete === 'Delete Account' ? (
                  <span className="text-red-900">{props.endDelete}</span>
                ) : (
                  props.endDelete
                )}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

import React from 'react';

function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-4 border-t-[1px] border-gray-400">
      <aside>
        <p>
          Copyright © ${new Date().getFullYear()} - All right reserved by Lagacy
          Books
        </p>
      </aside>
    </footer>
  );
}

export default Footer;

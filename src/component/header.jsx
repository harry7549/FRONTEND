"use client";

import Link from "next/link";

export default function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <img src="images/ngo-logo.png" alt="Support Our Heroes" />
        </div>
        <nav>
          <ul>
            <li>
              <Link href="Home">Home</Link>
            </li>
            <li>
              <Link href="Projects">Projects</Link>
            </li>
            <li>
              <Link href="About">About</Link>
            </li>
            <li>
              <Link href="Indian Army">Indian Army</Link>
            </li>
            <li>
              <Link href="Letters of Appreciation">
                Letters of Appreciation
              </Link>
            </li>
            <li>
              <Link href="Our FAQs">Our FAQs</Link>
            </li>
            <li>
              <Link href="Contact Us">Contact Us</Link>
            </li>
          </ul>
        </nav>
        <div className="upper-btn">
          <button className="btn-1">Log in</button>
          <button className="btn-2">Donate</button>
        </div>
      </header>
    </>
  );
}

import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="py-6 px-8">
      <div className="flex justify-center align-middle w-xl mx-auto max-w-4xl ">
        <p>
          Website create by{' '}
          <Link
            href={'https://www.linkedin.com/in/luc-schenherr-810205140/'}
            title="Schnherr Luc's Linkedin"
            className="hover:underline"
          >
            Schenherr Luc
          </Link>
        </p>
      </div>
    </footer>
  );
}

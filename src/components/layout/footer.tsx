import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-sm">
          &copy; {currentYear} UrbanWiz Communications. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

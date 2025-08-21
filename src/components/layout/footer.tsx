import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} ClarityLink Communications. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

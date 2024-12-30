import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="flex flex-col items-center p-16 space-y-4">
        <div className="mb-5">
          <Link href="/" className="font-bold text-5xl">
            RateMy<span className="text-primary">Schools</span>
          </Link>
        </div>

        <div className="space-x-6">
          <Link href="/blog">Blog</Link>
          <Link href="/all-schools">All Schools</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="flex space-x-1 text-xs">
          <Link href="/terms-and-conditions" className="hover:text-gray-600">
            Terms & Conditions
          </Link>

          <span>•</span>

          <Link href="/privacy-policy" className="hover:text-gray-600">
            Privacy Policy
          </Link>

          <span>•</span>

          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

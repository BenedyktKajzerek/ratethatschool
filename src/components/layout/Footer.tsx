import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background text-black">
      <div className="flex flex-col items-center space-y-4 p-16">
        <div className="mb-5">
          <Link href="/" className="text-5xl font-bold">
            RateMy<span className="text-primary">Schools</span>
          </Link>
        </div>

        <div className="space-x-6">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/all-schools" className="hover:underline">
            All Schools
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>

        <div className="flex space-x-1 text-xs">
          <Link href="/terms-and-conditions" className="hover:text-gray-500">
            Terms & Conditions
          </Link>

          <span>•</span>

          <Link href="/privacy-policy" className="hover:text-gray-500">
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

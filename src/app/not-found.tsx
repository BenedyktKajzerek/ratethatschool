import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1200px] justify-center py-24">
      <p className="text-6xl font-semibold text-primary">404</p>
      <div className="ml-8 border-l border-gray-200 pl-8">
        <h1 className="text-6xl font-semibold text-black">Page not found</h1>
        <Link href="/" className="mt-4 block font-light text-primary">
          Go home
        </Link>
      </div>
    </div>
  );
}

import { PopularCity } from "@/components/ui/PopularCity";
import { PopularSchool } from "@/components/ui/PopularSchool";
import Link from "next/link";
import Image from "next/image";
import a from "../../public/review.svg";
import b from "../../public/search.svg";

export default function Home() {
  return (
    <>
      <div>
        {/* HERO SECTION */}
        <section className="h-[560px] bg-slate-300 items-center flex justify-center flex-col space-y-3">
          <h1 className="text-4xl font-medium text-white mb-2">
            Your resource for schools reviews
          </h1>

          <input
            className="py-3 px-6 rounded-lg w-[760px]"
            type="text"
            name=""
            id=""
            aria-label="School Search Input"
            placeholder="Search for your school"
          />

          <Link href="/all-schools">
            <p className="text-white text-sm">All Schools</p>
          </Link>
        </section>

        {/* HOW-TO SECTION */}
        <section className=" bg-white py-8 space-y-8 md:py-16 w-11/12 m-auto max-w-[1200px]">
          <div className="space-y-8 md:space-y-0 text-center md:text-left md:space-x-16 md:justify-center md:flex md:items-center">
            <div className="w-full md:w-1/4 space-y-4">
              <h3 className="text-2xl">Find your school</h3>
              <p>
                We've collected dorm reviews from over 2+ schools world wide.
                Search for your school to get started.
              </p>
            </div>

            <div className="w-1/2 md:w-1/3 relative">
              <Image src={b} alt="" className="w-full md:w-80 h-60" />
            </div>
          </div>

          <div className="space-y-8 md:space-y-0 text-center md:text-left md:space-x-16 md:justify-center md:flex md:items-center md:flex-row-reverse">
            <div className="w-full md:w-1/4 space-y-4">
              <h3 className="text-2xl">Write an anonymous review</h3>
              <p>
                Share your experience at your school by writing a review. Your
                reviews are completely anonymous.
              </p>
            </div>

            <div className="mx-auto w-1/2 md:w-1/3">
              <Image src={a} alt="" className="w-full md:w-80 h-60" />
            </div>
          </div>
        </section>

        {/* POPULAR SECTION */}
        <section className="w-[1200px] m-auto">
          <div className="space-y-8">
            {/* Popular Schools */}
            <div>
              <h3 className="text-center text-2xl">Popular Cities</h3>
              <div>
                <div className="overflow-x-scroll flex space-x-8 p-4">
                  <PopularCity />
                  <PopularCity />
                  <PopularCity />
                  <PopularCity />
                  <PopularCity />
                  <PopularCity />
                  <PopularCity />
                  <PopularCity />
                </div>
                {/* <button>Left</button> */}
                {/* <button>Right</button> */}
              </div>
            </div>

            {/* Popular Cities */}
            <div>
              <h3 className="text-center text-2xl">Popular Schools</h3>
              <div>
                <div className="overflow-x-scroll flex space-x-8 p-4">
                  <PopularSchool />
                  <PopularSchool />
                  <PopularSchool />
                  <PopularSchool />
                  <PopularSchool />
                  <PopularSchool />
                  <PopularSchool />
                  <PopularSchool />
                </div>
                {/* <button>Left</button> */}
                {/* <button>Right</button> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

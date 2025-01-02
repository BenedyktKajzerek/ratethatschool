import { PopularCity } from "@/components/PopularCity";
import { PopularSchool } from "@/components/PopularSchool";
import Link from "next/link";
import Image from "next/image";
import reviewImg from "../../public/review.svg";
import searchImg from "../../public/search.svg";
import schoolImg from "../../public/school-illustration.jpg";
import Container from "@/components/layout/Container";
import SchoolSearchInput from "@/components/SchoolSearchInput";

export default function Home() {
  return (
    <>
      <div>
        {/* HERO SECTION */}
        <section
          style={{
            // linear-gradient for black layer over the img
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url(${schoolImg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex h-[560px] flex-col items-center justify-center space-y-3 px-6 text-white sm:px-8 lg:px-10"
        >
          <h1 className="mb-2 text-center text-2xl font-medium md:text-4xl">
            Your resource for schools reviews
          </h1>

          <SchoolSearchInput />

          <Link href="/all-schools">
            <p className="text-sm">All Schools</p>
          </Link>
        </section>

        {/* HOW-TO SECTION */}
        <Container>
          <section className="m-auto w-11/12 max-w-[1200px] space-y-8 bg-white py-8 md:py-16">
            <div className="space-y-8 text-center md:flex md:items-center md:justify-center md:space-x-16 md:space-y-0 md:text-left">
              <div className="w-full space-y-4 md:w-1/4">
                <h3 className="text-2xl">Find your school</h3>
                <p>
                  We've collected dorm reviews from over 2+ schools world wide.
                  Search for your school to get started.
                </p>
              </div>
              <div className="mx-auto w-1/2 md:w-1/3">
                <Image
                  src={searchImg}
                  alt=""
                  className="max-h-60 w-full md:w-80"
                />
              </div>
            </div>

            <div className="space-y-8 text-center md:flex md:flex-row-reverse md:items-center md:justify-center md:space-x-16 md:space-y-0 md:text-left">
              <div className="w-full space-y-4 md:w-1/4">
                <h3 className="text-2xl">Write an anonymous review</h3>
                <p>
                  Share your experience at your school by writing a review. Your
                  reviews are completely anonymous.
                </p>
              </div>
              <div className="mx-auto w-1/2 md:w-1/3">
                <Image
                  src={reviewImg}
                  alt=""
                  className="max-h-60 w-full md:w-80"
                />
              </div>
            </div>
          </section>
        </Container>

        {/* POPULAR SECTION */}
        <Container>
          <section className="m-auto max-w-[1200px]">
            <div className="space-y-8">
              {/* Popular Schools */}
              <div>
                <h3 className="text-center text-2xl">Popular Cities</h3>
                <div>
                  <div className="flex space-x-8 overflow-x-scroll p-4">
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
                  <div className="flex space-x-8 overflow-x-scroll p-4">
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
        </Container>
      </div>
    </>
  );
}

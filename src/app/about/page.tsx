import schoolImg from "@/../public/school-gym-illustration.jpg";

export default function About() {
  return (
    <>
      <div
        style={{
          // linear-gradient for black layer over the img
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url(${schoolImg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex h-[300px] items-center justify-center"
      >
        <h1 className="text-3xl capitalize text-white">About</h1>
      </div>

      <div className="mx-auto max-w-[1200px] space-y-6 py-8 text-gray-700">
        <h1 className="text-3xl font-medium">RateMySchools</h1>

        <p>
          At RateMySchools, we know that which school you choose plays a big
          role in shaping your life experience. That's why we've built a
          platform where students can share honest reviews and real opinions
          about schools. Whether you're picking your middle-school, high-school
          or college, these reviews come directly from students like you, giving
          you valuable insights before you make a decision.
        </p>

        <p>
          But RateMySchools isn't just about reviews—it's about creating a
          community where students help each other navigate school life. By
          contributing your own school ratings and experiences, you're providing
          real value to future students. Together, we're building a network of
          authentic feedback that can make school living better for everyone.
        </p>
      </div>
    </>
  );
}

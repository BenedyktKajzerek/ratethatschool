export default function About() {
  return (
    <>
      <div className="flex h-52 items-center justify-center bg-gray-100 text-3xl font-medium">
        <h1>About</h1>
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

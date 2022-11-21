function Contact() {
  return (
    <div className="flex flex-col gap-[4rem] font-['average'] max-w-[1200px] mx-auto w-full h-full mt-[6rem]">
      <div className="flex flex-col gap-[2rem]">
        <h2 className="text-xl">Contact Us</h2>
        <p>
          Please email us at{" "}
          <a className="underline" href="mailto:ssw.toronto@gmail.com">
            ssw.toronto@gmail.com
          </a>{" "}
          for any inquiries.
        </p>
      </div>
      <div className="flex flex-col gap-[2rem]">
        <h2 className="text-xl">Meet the Team</h2>
        <ul className="flex flex-col gap-[0.2rem]">
          <li>
            <p>
              <a
                className="underline"
                href="https://www.linkedin.com/in/michaellakim/"
                target="_blank"
                rel="noreferrer"
              >
                Michaella Kim
              </a>
              , Product Owner and Project Manager
            </p>
          </li>
          <li>
            <p>
              <a
                className="underline"
                href="https://www.linkedin.com/in/seungmin-shin-/"
                target="_blank"
                rel="noreferrer"
              >
                Seungmin Shin
              </a>
              , Front-end Developer
            </p>
          </li>
          <li>
            <p>
              <a
                className="underline"
                href="https://www.linkedin.com/in/woongo/"
                target="_blank"
                rel="noreferrer"
              >
                Woong O
              </a>
              , Front-end Developer
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;

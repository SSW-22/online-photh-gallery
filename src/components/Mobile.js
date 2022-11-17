function Mobile() {
  return (
    <div className="z-[99] absolute flex items-center justify-center w-screen h-screen bg-[#ffffff]">
      <div className="font-['average'] flex flex-col items-center">
        <h2 className="text-[1.8rem] mx-[4rem] text-center">
          Welcome to Online Photo Gallery
        </h2>
        <p className="text-[1.1rem] mt-[4rem] mx-[2rem] text-center">
          Sorry, we do not support mobile or tablet view at the moment. Kindly
          use desktop view for best experience.
        </p>
      </div>
    </div>
  );
}

export default Mobile;

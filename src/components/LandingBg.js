function LandingBg() {
  return (
    <div className="flex mx-auto bg-white static max-w-[1800px] h-[calc(100vh-6rem)] pt-[14rem] gap-[8rem] px-[7rem]">
      <div className="font-[100] text-white mix-blend-difference absolute max-w-[1800px] top-[10rem] px-[7rem] inset-x-0 mx-auto w-full h-[40%] flex flex-col justify-between font-['average'] ">
        <h1 className="text-[6rem] flex justify-start">Welcome to</h1>
        <h1 className="text-[6rem] flex justify-center">Online</h1>
        <h1 className="text-[6rem] flex justify-end">Photo Gallery</h1>
      </div>
      <div className="flex flex-wrap w-full pb-[7rem]">
        <img
          className="w-[50%] h-[50%] object-cover p-[0.5rem]"
          src="https://source.unsplash.com/random/&1"
          alt="rendom img"
        />
        <img
          className="w-[50%] h-[50%] object-cover p-[0.5rem]"
          src="https://source.unsplash.com/random/&2"
          alt="rendom img"
        />
        <img
          className="w-[100%] h-[50%] object-cover p-[0.5rem]"
          src="https://source.unsplash.com/random/&3"
          alt="rendom img"
        />
      </div>
      <div className="flex w-full h-full pt-[10rem]">
        <img
          className="w-full rounded-t-full"
          src="https://source.unsplash.com/ctXf1GVyf9A"
          alt="main img"
        />
      </div>
      <div className="flex flex-col w-full pb-[7rem]">
        <img
          className="h-[50%] object-cover p-[0.5rem]"
          src="https://source.unsplash.com/random/&4"
          alt="rendom img"
        />
        <img
          className="h-[50%] object-cover p-[0.5rem]"
          src="https://source.unsplash.com/random/&5"
          alt="rendom img"
        />
      </div>
      <div className="fixed inset-x-0 bottom-0 flex justify-center">
        <p className="pr-[0.2rem] text-[0.8rem]">©</p>
        <p className="pb-[1rem]">2022 opg.com</p>
      </div>
    </div>
  );
}

export default LandingBg;

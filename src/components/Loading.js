function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <svg
          className="animate-spin"
          width="45"
          height="45"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 8.4142 1.16421 8.75 0.75 8.75C0.33579 8.75 0 8.4142 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C7.58579 16 7.25 15.6642 7.25 15.25C7.25 14.8358 7.58579 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5Z"
            fill="url(#paint0_linear_1_3)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_3"
              x1="3.67484e-07"
              y1="13"
              x2="8"
              y2="15.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#212121" stopOpacity="0.03" />
              <stop offset="1" stopColor="#212121" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div>
        <p className="font-[average] mt-[1rem]">Loading</p>
      </div>
    </div>
  );
}

export default Loading;

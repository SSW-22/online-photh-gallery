import { motion } from "framer-motion";
import uuid from "react-uuid";
import landing1 from "../asset/landing1.jpg";
import landing2 from "../asset/landing2.jpg";
import landing3 from "../asset/landing3.jpg";
import landing4 from "../asset/landing4.jpg";
import landing5 from "../asset/landing5.jpg";
import landingmain from "../asset/door.jpg";

const heading1 = ["W", "e", "l", "c", "o", "m", "e", " ", "t", "o"];
const heading2 = ["O", "n", "l", "i", "n", "e"];
const heading3 = [
  "P",
  "h",
  "o",
  "t",
  "o",
  " ",
  "G",
  "a",
  "l",
  "l",
  "e",
  "r",
  "y",
];

const container = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 2.5,
      staggerChildren: 0.05,
    },
  },
};
const container2 = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 2.8,
      staggerChildren: 0.05,
    },
  },
};
const container3 = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 3.1,
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function LandingBg() {
  return (
    <div className="font-['average'] flex flex-col mx-auto bg-white static max-w-[1800px] h-[calc(100vh-8rem)] pt-[12rem] px-[7rem]">
      <div className="font-[100] absolute max-w-[1800px] top-[10rem] px-[7rem] inset-x-0 mx-auto w-full h-[30%] flex flex-col justify-between">
        <motion.h1
          className="text-[6rem] m-0 flex justify-start"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {heading1.map((heading) => {
            return heading === " " ? (
              <motion.span key={uuid()} variants={item}>
                &nbsp;
              </motion.span>
            ) : (
              <motion.span key={uuid()} variants={item}>
                {heading}
              </motion.span>
            );
          })}
        </motion.h1>
        <motion.h1
          className="text-[6rem] m-0 flex justify-center"
          variants={container2}
          initial="hidden"
          animate="visible"
        >
          {heading2.map((heading) => {
            return heading === " " ? (
              <motion.span key={uuid()} variants={item}>
                &nbsp;
              </motion.span>
            ) : (
              <motion.span key={uuid()} variants={item}>
                {heading}
              </motion.span>
            );
          })}
        </motion.h1>
        <motion.h1
          className="text-[6rem] m-0 flex justify-end"
          variants={container3}
          initial="hidden"
          animate="visible"
        >
          {heading3.map((heading) => {
            return heading === " " ? (
              <motion.span key={uuid()} variants={item}>
                &nbsp;
              </motion.span>
            ) : (
              <motion.span key={uuid()} variants={item}>
                {heading}
              </motion.span>
            );
          })}
        </motion.h1>
      </div>
      <div className="flex h-full gap-4 pb-[3rem]">
        <div className="flex flex-wrap w-full pt-[1rem]">
          <motion.img
            className="w-[50%] h-[50%] object-cover p-[0.5rem]"
            src={landing1}
            alt="rendom img"
            animate={{
              y: [50, 0, -50, 50, 0],
              scale: [1, 1, 1, 1, 1],
              opacity: [0, 1, 0, 0, 1],
            }}
            transition={{
              duration: 2.5,
              type: "spring",
              times: [0.45, 0.6, 0.7, 0.8, 1],
            }}
          />
          <motion.img
            className="w-[50%] h-[50%] object-cover p-[0.5rem]"
            src={landing2}
            alt="rendom img"
            animate={{
              y: [50, 0, -50, 50, 0],
              scale: [1, 1, 1, 1, 1],
              opacity: [0, 1, 0, 0, 1],
            }}
            transition={{
              duration: 2.5,
              type: "spring",
              times: [0.3, 0.6, 0.7, 0.8, 1],
            }}
          />
          <motion.img
            className="w-[100%] h-[50%] object-cover p-[0.5rem]"
            src={landing3}
            alt="rendom img"
            animate={{
              y: [50, 0, -50, 50, 0],
              scale: [1, 1, 1, 1, 1],
              opacity: [0, 1, 0, 0, 1],
            }}
            transition={{
              duration: 2.5,
              type: "spring",
              times: [0, 0.6, 0.7, 0.8, 1],
            }}
          />
        </div>
        <div className="flex justify-center items-end w-full h-full">
          {/* <motion.img
          className="w-full rounded-t-full"
          src="https://source.unsplash.com/ctXf1GVyf9A"
          alt="main img"
        /> */}
          <motion.img
            className="w-[85%] min-h-[500px] p-[0.5rem]"
            // src="https://source.unsplash.com/qPPWNeFVLFQ"
            src={landingmain}
            alt="main img"
            animate={{
              y: [-30, -50, 0],
              scale: [1.1, 1.1, 1],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 2.5,
              type: "spring",
              times: [0, 0.8, 1],
            }}
          />
        </div>
        <div className="flex flex-col w-full h-full">
          <motion.img
            className="h-[50%] object-cover p-[0.5rem]"
            // src="https://source.unsplash.com/MHNjEBeLTgw"
            src={landing4}
            alt="rendom img"
            animate={{
              y: [50, 0, -50, 50, 0],
              scale: [1, 1, 1, 1, 1],
              opacity: [0, 1, 0, 0, 1],
            }}
            transition={{
              duration: 2.5,
              type: "spring",
              times: [0.1, 0.6, 0.7, 0.8, 1],
            }}
          />
          <motion.img
            className="h-[50%] object-cover p-[0.5rem]"
            // src="https://source.unsplash.com/WEQbe2jBg40"
            src={landing5}
            alt="rendom img"
            animate={{
              y: [50, 0, -50, 50, 0],
              scale: [1, 1, 1, 1, 1],
              opacity: [0, 1, 0, 0, 1],
            }}
            transition={{
              duration: 2.5,
              type: "spring",
              times: [0.3, 0.6, 0.7, 0.8, 1],
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-full min-h-[2rem]">
        <p className="pr-[0.2rem] text-[0.8rem]">©</p>
        <p>2022 opg.com</p>
      </div>
    </div>
  );
}

export default LandingBg;

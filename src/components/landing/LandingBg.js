import { motion } from "framer-motion";
import uuid from "react-uuid";
import landing1 from "../../asset/landing1.jpg";
import landing2 from "../../asset/landing2.jpg";
import landing3 from "../../asset/landing3.jpg";
import landing4 from "../../asset/landing4.jpg";
import landing5 from "../../asset/landing5.jpg";
import landingmain from "../../asset/door.jpg";
import LandingHeader from "./LandingHeader";

const headingText = [
  { type: "heading1", text: "Welcome to" },
  { type: "heading2", text: "Oneline" },
  { type: "heading3", text: "Photo Gallery" },
];

const container = {
  visible: {
    transition: {
      delayChildren: 2.2,
      staggerChildren: 0.025,
    },
  },
};

function LandingBg() {
  return (
    <div className="font-['average'] flex flex-col mx-auto bg-white static max-w-[1800px] h-[calc(100vh-8rem)] pt-[12rem] px-[7rem]">
      <div className="font-[100] absolute max-w-[1800px] top-[10rem] px-[7rem] inset-x-0 mx-auto w-full h-[30%] flex flex-col justify-between">
        <motion.div
          key={uuid()}
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <div>
            {headingText.map((item) => {
              return (
                <LandingHeader text={item.text} type={item.type} key={uuid()} />
              );
            })}
          </div>
        </motion.div>
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
    </div>
  );
}

export default LandingBg;

import { motion } from "framer-motion";
import uuid from "react-uuid";

function Wrapper({ children }) {
  return <span>{children}</span>;
}

function LandingHeader({ type, text }) {
  const item = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  const splitWords = text.split(" ");
  const words = [];

  Object.values(splitWords).forEach((item) => {
    words.push(item.split(""));
  });

  words.map((word) => {
    return word.push("\u00A0");
  });

  return (
    <div
      className={`text-[6rem] m-0 flex ${
        type === "heading1" && "justify-start"
      } ${type === "heading2" && "justify-center"} ${
        type === "heading3" && "justify-end"
      }`}
    >
      {words.map((word, index) => {
        return (
          <Wrapper key={uuid()}>
            {words[index].flat().map((element) => {
              return (
                <span
                  key={uuid()}
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                >
                  <motion.span
                    key={uuid()}
                    style={{ display: "inline-block" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </div>
  );
}

export default LandingHeader;

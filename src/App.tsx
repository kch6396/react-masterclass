import styled from "styled-components";
import { AnimatePresence, motion, transform } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 50vw;
  height: 70%;
`;

const Box = styled(motion.div)<{ transformOrigin?: string }>`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transform-origin: ${(props) => props.transformOrigin} !important;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  border-radius: 4px;
  border: none;
  background-color: white;
  padding: 10px 8px;
  font-weight: 900;
  cursor: pointer;
`;

const Ball = styled(motion.div)`
  background-color: white;
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
`;

const boxVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const buttonVariants = {
  initial: { scale: 1, color: "#114ebd" },
  click: { scale: 1.1, color: "#f26e15" },
};

function App() {
  const [id, setId] = useState<string | null>(null);
  const [position, setPosition] = useState<"2" | "3">("2");

  const transformPosition = (n: string) => {
    switch (n) {
      case "1":
        return "bottom right";
      case "2":
        return "bottom left";
      case "3":
        return "top right";
      case "4":
        return "top left";
    }
  };

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            variants={boxVariants}
            whileHover="hover"
            initial="initial"
            transformOrigin={transformPosition(n)}
            onClick={() => setId(n)}
            layoutId={n}
            key={n}
          >
            {position === n && (
              <Ball layoutId="ball" transition={{ duration: 0.5 }} />
            )}
          </Box>
        ))}
      </Grid>
      <Button
        onClick={() => setPosition((prev) => (prev === "2" ? "3" : "2"))}
        variants={buttonVariants}
        initial="initial"
        animate={position === "3" ? "click" : "initial"}
      >
        Switch
      </Button>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <Box
              layoutId={id as string}
              style={{
                width: "25%",
                height: "35%",
                backgroundColor: "rgba(255,255,255,1)",
                cursor: "default",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;

// DarkModeToggle.tsx
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

const ToggleWrapper = styled.div<{ isDark: boolean }>`
  width: 60px;
  height: 30px;
  border-radius: 30px;
  background-color: ${({ isDark }) => (isDark ? "#444" : "#ddd")};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ToggleButton = styled.div<{ isDark: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${({ isDark }) => (isDark ? "#222" : "#fff")};
  position: absolute;
  top: 2px;
  left: ${({ isDark }) => (isDark ? "32px" : "2px")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease, background-color 0.3s ease;
  font-size: 16px;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  return (
    <Center>
      <ToggleWrapper isDark={isDark} onClick={() => setIsDark((prev) => !prev)}>
        <ToggleButton isDark={isDark}>{isDark ? "🌙" : "☀️"}</ToggleButton>
      </ToggleWrapper>
    </Center>
  );
};

export default DarkModeToggle;

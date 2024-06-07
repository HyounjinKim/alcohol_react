import styled from "@emotion/styled";

export const CardImage = styled.img`
object-fit: cover;
transform: scale(1.0);
transition: transform 0.5s;
  :hover {
    animation: scale-up-down 1s forwards; /* 1초 동안 애니메이션 실행 */
  }

  @keyframes scale-up-down {
    0% {
      transform: scale(1.0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1.0);
    }
  }
`;

import styled from 'styled-components';
import colors from './styles/colors';
import japanImage from '/images/japan_9.jpg';

export const AppWrapper = styled.div`
  position: relative;
  z-index: 1;
  font-family: 'Roboto Mono', monospace;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  background-image: url(${japanImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  min-height: 100vh;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: -100px;
  padding: 0;
  flex-wrap: wrap;
`;

export const Header = styled.h1`
  color: ${colors.seasalt};
  font-family: 'Carlito', 'Roboto Mono', monospace;
  font-size: 2.6rem;
  margin: 0;
  padding: 0;
  font-weight: 400;
  text-align: center;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const LogoOneContainer = styled.div`
  width: 35rem;
  height: 40rem;
`;

export const LogoTwoContainer = styled.div`
  width: 35rem;
  height: 40rem;
`;

export const ThreeDWebGroupContainer = styled.div`
  width: 50rem;
  height: 25rem;
`;

export const DeloitteDigitalLogoContainer = styled.div`
  width: 80rem;
  height: 40rem;

  @media (max-width: 450px) {
    width: 45rem;
    height: 25rem;
    margin-bottom: 5rem;
  }

  @media (max-width: 650px) {
    margin-bottom: 5rem;
  }
`;

export const BackgroundCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0; 
  pointer-events: none; 
`;

export const Title = styled.h1`
  color: ${colors.seasalt};
  font-size: 3.8rem;
  margin: 0;
  letter-spacing: 1.0rem;
  text-transform: lowercase;
  padding: 0;
  font-weight: 300;
`;

export const ContactRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  align-items: flex-start;
  margin-bottom: 3rem;
`;

export const WebLinkContainer = styled.div`
  color: ${colors.seasalt};  
  position: absolute;
  bottom: 30px;
  right: 40px;
  font-size: 16px;
  letter-spacing: 2px;

  a {
    font-family: 'Carlito', 'Roboto Mono', monospace;
    color: #6c757dff;
    text-decoration: underline;
    text-underline-offset: 4px;

    &:hover {
      color: #fff;
    }
  }
`;

export const Email = styled.p`
  color: ${colors.seasalt};
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  text-decoration: none;
  z-index: 3;
`;

export const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

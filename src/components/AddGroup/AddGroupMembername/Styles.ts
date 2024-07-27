import * as I from 'assets/icon';
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Fly = styled(I.Fly)`
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5%;
  height: 5%;
`;

export const Text = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 22%;
  text-decoration: underline;
  text-underline-offset: 5px;
`;

export const InportNameContainer = styled.div`
  display: absolute;
  justify-content: center;
  z-index: 10;
`;

export const InportNameBox = styled.div`
  top: -110px;
  left: 40px;
  position: relative;
  width: 400px;
  height: 120px;
  gap: 0.3%;
`;

export const NextArrow = styled(I.NextArrowCircle)`
  position: absolute;
  bottom: calc(28% - 12px - 36.5px);
  right: calc(35% - 12.5px - 59px);
  z-index: 15;
  width: 9%;
  height: 9%;
  cursor: pointer;
`;

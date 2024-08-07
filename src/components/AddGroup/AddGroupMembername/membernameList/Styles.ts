import * as I from 'assets/icon';
import styled from 'styled-components';

/*리스트 영역 */
export const nameLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30px;
  align-items: center;
  /* 전체 스크롤바 */
  ::-webkit-scrollbar {
    width: 12px;
  }

  /* 스크롤바의 트랙 */
  ::-webkit-scrollbar-track {
    background: none;
  }

  /* 스크롤바 핸들 */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.backgroundPrimary};
    border-radius: 10px;
  }

  /* 스크롤바 핸들 호버 */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const nameList = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 190px;
  height: 140px;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: none;
  flex-wrap: wrap;
  top: 40px;
`;

export const nameFolder = styled(I.File)`
  position: absolute;
  width: 200px;
  z-index: 0;
  align-items: center;
`;

export const nameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  background: none;
  margin: 1px;
  width: 58px; /* 고정된 너비 */
  height: 20px; /* 고정된 높이 */
  &:hover .nameButton {
    display: inline;
  }
`;

export const NowImportName = styled(I.NowInportName)`
  position: absolute;
  width: 61px;
  z-index: 0;
  align-items: center;
`;

export const name = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  z-index: 5;
  font-size: 0.7rem;
  color: #3c73ae;
`;

export const nameButton = styled(I.xCircle)`
  flex-shrink: 0;
  position: relative;
  width: 12px;
  height: 20px;
  border: 0;
  background: none;
  font-size: 10;
  color: black;
  cursor: pointer;
  display: none;
`;

/*입력 영역 */

export const nameCreatelayout = styled.div`
  position: absolute;
  margin-top: 210px;
  align-items: center;
`;

export const MemberInput = styled(I.InputName)`
  position: absolute;
  width: 190px;
  left: 10px;
  z-index: 10;
`;
export const inputname = styled.input`
  display: inline-block;
  position: relative;
  padding: 0 20px 0 30px;
  width: 100%;
  height: 40px;
  background: none;
  z-index: 30;
  align-items: center;
  &::placeholder {
    color: ${({ theme }) => theme.colors.tertiary};
    opacity: 1;
  }
`;

export const inputplus = styled(I.PlusCircle)`
  position: absolute;
  top: 50%;
  right: 25px;
  margin-top: -10px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 30;
`;

import React, { useEffect, useState } from 'react';
import * as S from './Styles';
import VoteContainer from '../VoteContainer/VoteContainer';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { agendasList } from 'recoil/states/vote';
import axios from 'axios';
import { getCookie } from 'utils/UseCookies';
import { shareGroupId } from 'recoil/states/share_group';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = getCookie('access-token') || process.env.REACT_APP_REFRESH_TOKEN;

const VoteList: React.FC = () => {
  const navigate = useNavigate();
  const groupId = useRecoilValue(shareGroupId);
  const [agendas, setAgendas] = useRecoilState(agendasList);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 안건 목록 조회 API 함수
  const fetchAgendas = async (page: number) => {
    if (!groupId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${SERVER_URL}/agendas`, {
        params: {
          shareGroupId: groupId,
          page,
          size: itemsPerPage,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const { agendaDetailInfoList, totalPages } = response.data.data;
      console.log('Fetched Agendas:', agendaDetailInfoList);
      setAgendas((prevAgendas) => [...prevAgendas, ...agendaDetailInfoList]); // 기존 데이터에 추가
      setTotalPages(totalPages);
    } catch (error: any) {
      setError(error.message || 'Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendas(currentPage);
  }, [groupId, currentPage]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, currentPage, totalPages]);

  const handleClickBtn = (i: number) => {
    navigate('/vote/detail', { state: { agendaData: agendas[i] } });
  };

  if (isLoading && agendas.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {agendas.map((ag, i) => (
        <S.Layout key={ag.agendaId} onClick={() => handleClickBtn(i)}>
          <S.TextLayout>{ag.title}</S.TextLayout>
          <S.VoteContainer>
            <VoteContainer data={ag.agendaPhotoInfoList} />
          </S.VoteContainer>
        </S.Layout>
      ))}
      {isLoading && <div>Loading more...</div>}
    </div>
  );
};

export default VoteList;

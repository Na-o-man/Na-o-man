import React, { useEffect, useState } from 'react';
import * as S from './Styles';
import Header from 'components/Header/Header';
import DropDown from './DropDown';
import ShareGroupImageList, {
  itemProp,
} from 'components/ShareGroup/ShareGroupImageList/ShareGroupImageList';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import { getPhotosAll, getPhotosEtc } from 'apis/getPhotosAll';
import { getPhotos } from 'apis/getPhotos';

const ShareGroupDetailPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const nav = useNavigate();
  const isAllPhoto = location.state.isAllPhoto;
  const isEtcPhoto = location.state.isEtcPhoto;
  const groupId = location.state.shareGroupId;
  const [requestData, setRequestData] = useState({
    shareGroupId: location.state.shareGroupId,
    profileId: location.state.profileId,
    size: 20,
  });
  const [items, setItems] = useState<itemProp[]>([]);
  const [maxPage, setMaxPage] = useState(0);
  const names = [];
  names.push(`${location.state.name}`);

  const handleApi = async (page: number): Promise<void> => {
    // page가 있으면 page를 넣어줌
    const reqDataWithPage = {
      ...requestData,
      page: page,
    };
    try {
      if (isAllPhoto || requestData.profileId === 0) {
        const { status, data } = await getPhotosAll(reqDataWithPage);
        console.log(status, data);
        if (status === 200) {
          setItems(data.photoInfoList);
          setMaxPage(data.totalPages);
        }
      } else if (isEtcPhoto || requestData.profileId === -1) {
        const { status, data } = await getPhotosEtc(reqDataWithPage);
        if (status === 200) {
          setItems(data.photoInfoList);
          setMaxPage(data.totalPages);
        }
      } else {
        const { status, data } = await getPhotos(
          page > 0 ? reqDataWithPage : requestData,
        );
        if (status === 200) {
          setItems(data.photoInfoList);
          setMaxPage(data.totalPages);
        }
      }
      if (page === 0) {
        setIsLoading(false);
      }
    } catch (e) {
      alert('앨범 조회 중 오류가 발생하였습니다');
      nav(`group/${groupId}`);
    }
  };

  const getApi = async (page?: number): Promise<void> => {
    if (typeof page === 'undefined') {
      setIsLoading(true);
    }
    await handleApi(page || 0);
  };

  useEffect(() => {
    getApi();
  }, [requestData]);

  if (isLoading) {
    return (
      <S.CloudLayout>
        <Loading />
      </S.CloudLayout>
    );
  }
  return (
    <S.Layout>
      <S.TopRectContainer>
        <S.TopRect />
        <S.DropDownContainer>
          <DropDown
            groupId={location.state.shareGroupId}
            setter={setRequestData}
          />
        </S.DropDownContainer>
      </S.TopRectContainer>
      <Header backarrow checkbtn />
      <ShareGroupImageList
        items={items}
        maxPage={maxPage}
        getApi={getApi}
        shareGroupId={location.state.shareGroupId}
      />
    </S.Layout>
  );
};

export default ShareGroupDetailPage;

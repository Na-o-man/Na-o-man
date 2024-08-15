// Share Group 1,2페이지 레이아웃
import React, { useEffect } from 'react';
import Header from 'components/Header/Header';
import * as S from './Styles';
import ShareGroupFolderView from 'components/ShareGroup/ShareGroupFolderView/ShareGroupFolderView';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  shareGroupListState,
  shareGroupMemberListState,
} from 'recoil/states/share_group';
import { getShareGroupMembers } from 'apis/getMyShareGroup';

interface profile {
  profileId: number; // 프로필 id
  name: string; // 프로필 이름
  image: string; // URL 형식
  memberId: number | null; // 해당 프로필로 참여한 회원의 id. 생략할지 고민중
}

interface filteredProfile {
  profileId: number; // 프로필 id
  name: string; // 프로필 이름
  image: string; // URL 형식
  memberId: number; // 해당 프로필로 참여한 회원의 id
}

interface ShareGroup {
  shareGroupId: number; // 공유 그룹 id
  name: string; // 공유 그룹 이름
  image: string; // 공유 그룹 이미지 URL
  memberCount: number; // 공유 그룹에 참여한 회원 수
  createdAt: string; // 공유 그룹 생성일
}

const ShareGroupFolder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shareGroupMember, setShareGroupMember] = useRecoilState(
    shareGroupMemberListState,
  );
  const [shareGroupList, setShareGroupList] =
    useRecoilState(shareGroupListState);

  useEffect(() => {
    getShareGroupMembers(Number(id)).then((res) => {
      if (res.data.hasOwnProperty('shareGroupId')) {
        const currentShareGroupItem: ShareGroup = {
          shareGroupId: res.data.shareGroupId,
          name: res.data.name,
          image: res.data.image,
          memberCount: res.data.memberCount,
          createdAt: res.data.createdAt,
        };
        setShareGroupList([...shareGroupList, currentShareGroupItem]);
      }
      if (res.data.hasOwnProperty('profileInfoList')) {
        console.log(res.data.profileInfoList);
        // memberId가 null인 프로필은 제외
        const fileterdProfileInfoLists: filteredProfile[] =
          res.data.profileInfoList.filter(
            (profile: profile) => profile.memberId !== null,
          );
        console.log(fileterdProfileInfoLists);
        // 전체 사진 폴더와 기타 폴더 추가
        setShareGroupMember([
          ...fileterdProfileInfoLists,
          {
            profileId: 0,
            name: '전체 사진',
            image: '',
            memberId: 0,
            isAllPhoto: true,
          },
          {
            profileId: 0,
            name: '기타',
            image: '',
            memberId: 0,
            isEtcPhoto: true,
          },
        ]);
      }
    });
  }, [id]);

  return (
    <S.Layout isRightCloud={false}>
      <Header hamburger />
      {shareGroupMember && <ShareGroupFolderView />}
    </S.Layout>
  );
};

export default ShareGroupFolder;

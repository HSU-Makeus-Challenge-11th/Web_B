import type { Metadata } from "next";
import { ProfileEditPage } from "../../../../views/profile/profile-edit-page";

export const metadata: Metadata = {
  title: "내 정보 수정",
  // 로그인한 사람만 보는 개인 페이지라 검색 결과에 노출하지 않음
  robots: { index: false },
};

export default function Page() {
  return <ProfileEditPage />;
}

import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { Link } from "@tanstack/react-router";
import { FormField } from "../../components/auth/form-field";
import { useMeQuery, useUpdateMeMutation } from "../../hooks/use-personal";
import { getApiError } from "../../api/members";

export function EditProfilePage() {
  const profile = useMeQuery().data!;
  const update = useUpdateMeMutation();
  const [nickname, setNickname] = useState(profile.nickname);
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");
  const valid = nickname.trim().length >= 2 && nickname.trim().length <= 12;
  async function save(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid || update.isPending) return;
    setMessage("");
    try { await update.mutateAsync(nickname.trim()); setMessage("변경사항을 저장했어요."); }
    catch (error) { setMessage(getApiError(error)); }
  }
  function chooseAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 2 * 1024 * 1024) {
      setMessage("2MB 이하의 PNG, JPG, WEBP 이미지를 선택해 주세요."); return;
    }
    const reader = new FileReader();
    reader.onload = () => { setAvatar(String(reader.result)); setMessage(""); };
    reader.readAsDataURL(file);
  }
  return <main className="profile-page edit-page"><form onSubmit={save}>
    <div className="profile-title"><div><h1>내 정보 수정</h1><p className="field-hint">닉네임을 변경할 수 있어요. 이미지는 저장되지 않는 미리보기예요.</p></div>
      <button className="primary-button" disabled={!valid || update.isPending}>{update.isPending ? "저장 중" : "변경사항 저장"}</button></div>
    <div className="edit-grid"><div className="avatar-upload">
      <label htmlFor="profile-image"><span className="avatar"><img src={avatar || "/icons/person.svg"} alt="선택한 프로필" /></span><strong>프로필 이미지</strong><span>선택 사항 · 최대 2MB</span></label>
      <input id="profile-image" type="file" accept="image/png,image/jpeg,image/webp" onChange={chooseAvatar} />
    </div><div>
      <FormField id="profile-nickname" label="닉네임" value={nickname} placeholder="2–12자"
        onChange={event => { setNickname(event.target.value); setMessage(""); }}
        error={!valid ? "닉네임은 2–12자로 입력해 주세요." : undefined} />
      <FormField id="profile-email" label="이메일" type="email" value={profile.email} readOnly />
      {message && <p role="status" className="form-success">{message}</p>}
      <Link className="profile-return" to="/me">내 정보로 돌아가기</Link>
    </div></div>
  </form><div className="withdraw"><div><strong>회원 탈퇴</strong><p>탈퇴하면 작성한 평점, 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.</p></div>
    <button type="button" disabled title="회원 탈퇴 기능은 준비 중이에요.">회원 탈퇴</button></div></main>;
}

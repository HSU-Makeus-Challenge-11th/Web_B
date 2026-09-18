type StudyMember = {
  id: number;
  name: string;
  role: "leader" | "member";
  githubId?: string;
};

const members: StudyMember[] = [
  {
    id: 1,
    name: "광수",
    role: "leader",
    githubId: "gwangsu123",
  },
  {
    id: 2,
    name: "지수",
    role: "member",
  },
];

function createMemberCard(id: number): string {
  const foundMember = members.find((member) => member.id === id);

  if (!foundMember) {
    return "존재하지 않는 회원입니다.";
  }

  const displayGithubId = foundMember.githubId ?? "등록되지 않음";

  return (
    foundMember.name +
    " 님, 역할: " +
    foundMember.role +
    ", GitHub: " +
    displayGithubId
  );
}

console.log(createMemberCard(1));
console.log(createMemberCard(2));
console.log(createMemberCard(999));
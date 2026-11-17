type MemberRole = "Leader" | "Member";

interface Member {
    Id: number;
    name: string;
    role: MemberRole;
    githubId?: string;
}

const members: Member[] = [
    { Id: 1, name: "서현", role: "Leader", githubId: "woosh0901-sys" },
    { Id: 2, name: "현수", role: "Member" },
];

function findMemberById(id: number) {
    const foundMember = members.find((member) => member.Id === id);

    if (foundMember) {
        console.log(foundMember.Id + ": " + foundMember.name + " 님, " + foundMember.role + " (GitHub: " + (foundMember.githubId ?? "아이디 없음") + ")");
    } else {
        console.log("스터디 회원이 존재하지 않습니다.");
    }
}

findMemberById(1);
findMemberById(2);
findMemberById(3);
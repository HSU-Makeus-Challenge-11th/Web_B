type MemberRole = "leader" | "member";

type Member = {
    id: number;
    name: string;
    role: MemberRole;
    github?: string;
};

const members: Member[] = [
    {
        id: 1,
        name: "철수",
        role: "leader",
        github: "chulsoo"
    },
    {
        id: 2,
        name: "영희",
        role: "member"
    }
];

function findMember(id: number): string {
    const member = members.find((member) => member.id === id);

    // 회원이 존재하지 않는 경우
    if (member === undefined) {
        return "존재하지 않는 회원입니다.";
    }

    // GitHub 아이디가 없는 경우
    if (member.github === undefined) {
        return `${member.name}님은 GitHub 아이디가 없습니다.`;
    }

    return `${member.name}님의 GitHub 아이디는 ${member.github}입니다.`;
}

console.log(findMember(1));
console.log(findMember(2));
console.log(findMember(999));
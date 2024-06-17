/* eslint-disable spellcheck/spell-checker -- disabled spellcheck for member names */

export const members: Member[] = [
  {
    avatar: "/members/ilia.webp",
    description:
      "Ilia is a full-stack developer with over 10 years of experience in software development. Exceptionally proficient in technologies and innovative approaches. He successfully leads the project, acting not only as a technical leader but also as the visionary inspiration for the entire team. The primary developer of both front-end and back-end, having fully implemented efficient database interaction. His persistence and enthusiasm inspire the team to achieve high results.",
    id: "ilia",
    name: "Ilia Liubinskii, Ph.D.",
    roles: ["Full-stack Developer", "Team Lead", "Product Owner"]
  },
  {
    avatar: "/members/david.webp",
    description:
      "David is a QA engineer with over three years of experience in testing web applications, desktop applications, and APIs. He is an enthusiastic individual dedicated to self-improvement and mastering his craft. He completed a front-end development course. Leveraging his leadership experience, he not only contributed as a full-stack developer and tester but also took on the role of project manager, successfully assembling a team and streamlining internal interactions.",
    id: "david",
    name: "David Liubinskii",
    roles: ["Full-stack Developer", "QA Engineer"]
  },
  {
    avatar: "/members/ksenia.webp",
    description:
      "Since completing a full-stack developer course in 2022, Ksenia has been actively involved in various pet projects and startups, continually honing and refining her programming skills. As a participant in the project, she has taken on the role of implementing the design of the front-end, showcasing her ability to transform design concepts into functional and visually appealing interfaces.",
    id: "ksenia",
    name: "Ksenia",
    roles: ["Full-stack Developer"]
  },
  {
    avatar: "/members/katia.webp",
    description:
      "As a software tester with a deep understanding of testing approaches and techniques, Katia successfully tested both the API and front-end, ensuring a significant level of trust in the reliability and quality of our web application and confidence in the software's performance.",
    id: "ekaterina",
    name: "Ekaterina",
    roles: ["QA Engineer"]
  }
];

export interface Member {
  readonly avatar: string;
  readonly description: string;
  readonly id: string;
  readonly name: string;
  readonly roles: string[];
}

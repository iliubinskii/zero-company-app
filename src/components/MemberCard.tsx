import type { Member } from "../members";
import React from "react";

export const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  const defaultAvatar = "/members/member.webp";
  const avatarSrc = member.avatar ? member.avatar : defaultAvatar;

  return (
    <div className="flex min-w-72 max-w-3xl h-72 items-start p-4 border border-gray-300 rounded-2xl shadow-lg overflow-y-auto">
      <div className="flex flex-col justify-center items-center mr-4 w-1/3">
        <img
          alt={member.name}
          className="w-40 h-40 rounded-full p-2"
          src={avatarSrc}
        />
        {member.roles.map((role, index) => (
          <span className="font-sb" key={index}>
            {role}
          </span>
        ))}
      </div>
      <div className="flex flex-col w-2/3">
        <span className="text-lg font-bold pb-2">{member.name}</span>
        <span className="overflow-y-auto max-44">{member.description}</span>
      </div>
    </div>
  );
};

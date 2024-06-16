import type { Member } from "../members";
import React from "react";

export const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  const defaultAvatar = "/members/member.webp";
  const avatarSrc = member.avatar ? member.avatar : defaultAvatar;

  return (
    <div className="flex h-full items-start p-6 border border-gray-300 rounded-2xl shadow-lg overflow-y-auto">
      <div className="flex flex-col justify-center items-center mr-4 w-1/3 min-w-40">
        <img
          alt={member.name}
          className="w-40 h-40 rounded-full p-2"
          src={avatarSrc}
        />
        {member.roles.map((role, index) => (
          <div className="font-sb" key={index}>
            {role}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-2/3">
        <div className="text-lg font-bold pb-2">{member.name}</div>
        <div className="overflow-y-auto max-44 pb-4">{member.description}</div>
      </div>
    </div>
  );
};

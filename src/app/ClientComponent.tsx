"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

/**
 * Client component.
 * @returns The rendered component.
 */
export default function ClientComponent(): React.ReactElement {
  const data = [
    {
      description: `
        Drop in a legal foundation into your project at a very early
        stage.
      `,
      image: { height: 900, src: "/digital-sign.webp", width: 1600 },
      title: "Create a virtual company"
    },
    {
      description: `
        With our legally backed process, you can attract contributors
        for a share in your company.
      `,
      image: { height: 900, src: "/IPO.webp", width: 1600 },
      title: "Receive contributions"
    },
    {
      description: `
        We design a seamless process of asset transfer to the company,
        where you can manage them collectively with your team.
      `,
      image: { height: 900, src: "/unicorn.webp", width: 1600 },
      title: "Secure company assets"
    }
  ];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-3 px-10 max-w-[1000px]">
        {data.map(
          ({ description, image: { height, src, width }, title }, key) => (
            <Card className="overflow-hidden" key={key}>
              <CardHeader
                className="m-0 rounded-none"
                color="transparent"
                floated={false}
                shadow={false}
              >
                <Image
                  alt="ui/ux review check"
                  height={height}
                  src={src}
                  width={width}
                />
              </CardHeader>
              <CardBody>
                <Typography color="blue-gray" variant="h4">
                  {title}
                </Typography>
                <Typography
                  className="mt-3 font-normal"
                  color="gray"
                  variant="lead"
                >
                  {description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button>Read More</Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

import { ContentPage, Header2, Paragraphs } from "../components";
import { Fallback } from "../components/Fallback";
import { NextPage } from "next";
import React from "react";
import { lang } from "../langs";
import { useRouter } from "next/router";

// eslint-disable-next-line no-warning-comments -- Ok
// TODO: Add real content
const Page: NextPage = () => {
  const router = useRouter();

  if (router.isFallback) return <Fallback />;

  return (
    <ContentPage>
      <Header2>{lang.HowZeroCompanyWorks}</Header2>
      <Paragraphs>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil eius
          animi nemo eligendi fugit iure tempora dolorem cumque sint autem,
          ipsum nam. Ad, ipsum. Sed labore iure cum voluptates quos!
        </p>
        <p>
          Quia quibusdam quaerat esse amet fuga magnam ipsum nesciunt
          perferendis, itaque necessitatibus aperiam quo in, quasi accusantium.
          Eaque explicabo sunt expedita tempore quae maxime vero in. Beatae
          nesciunt adipisci soluta.
        </p>
        <p>
          Sed fuga animi totam autem iusto nihil iure dicta blanditiis
          perspiciatis aut distinctio, eligendi iste nam expedita tenetur
          labore? Tempora porro recusandae eum quidem. Voluptatibus explicabo
          voluptatem dignissimos iure laboriosam.
        </p>
        <p>
          Repellat hic quos aliquid voluptate delectus, suscipit reiciendis, non
          exercitationem atque necessitatibus omnis numquam sapiente labore!
          Obcaecati, quidem quaerat. Architecto voluptates esse suscipit eaque
          omnis voluptas rerum doloribus, autem laborum.
        </p>
        <p>
          Aspernatur, nam laborum eligendi sed nostrum cum? Consectetur eligendi
          ullam rerum non eaque vitae, voluptas maxime totam et deleniti
          pariatur itaque ut id consequuntur nesciunt aliquam tenetur ducimus,
          officiis alias.
        </p>
      </Paragraphs>
    </ContentPage>
  );
};

export default Page;

import React from "react";
import Layout from "../components/layout";
import Head from "next/head";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro";
import { getBio, lastUpdatedDate } from "../lib/api";
import TextRotating from "../components/utils/text-rotating";
import { ScrollableBox } from "../components/utils/scrollable";
export default function Bio({ data }) {

  console.log(data)
  
  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>

      <TransitionTilt>
      <ScrollableBox>

        <div className="px-6 md:px-12 lg:px-24">
          <PostIntro
            title={data.title}
            content={data.intro}
          ></PostIntro>
        </div>

        <div className="p-24">
          <TextRotating leadText={data.textLoop.lead} rotatingWords={data.textLoop.textCollection.items}/>
        </div>

        <div className="p-24">
          <TextRotating leadText={data.textLoop.lead} rotatingWords={data.textLoop.textCollection.items}/>
        </div>
        </ScrollableBox>

      </TransitionTilt>

      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const data = (await getBio(preview)) ?? [];
  return {
    props: {
      data,
    },
  };
}

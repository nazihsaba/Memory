import Head from "next/head";
import { Fragment } from "react";

import { MongoClient } from "mongodb";

import MemoryList from "../components/memories/MemoryList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Our memories</title>
        <meta
          name="description"
          content="Browse a huge list of highly active memories!"
        />
      </Head>
      <MemoryList memories={props.memories} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {

//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://nazih2001:nazih2001@cluster1.h3hvpfv.mongodb.net/memories?retryWrites=true&w=majority"
  );
  const db = client.db();

  const memoriesCollection = db.collection("memories");

  const memories = await memoriesCollection.find().toArray();

  client.close();

  return {
    props: {
      memories: memories.map((memory) => ({
        title: memory.title,
        address: memory.address,
        image: memory.image,
        id: memory._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

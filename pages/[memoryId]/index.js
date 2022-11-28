import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MemoryDetail from "../../components/memories/MemoryDetail";

function MemoryDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.memoryData.title}</title>
        <meta name="description" content={props.memoryData.description} />
      </Head>
      <MemoryDetail
        image={props.memoryData.image}
        title={props.memoryData.title}
        address={props.memoryData.address}
        description={props.memoryData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://nazih2001:nazih2001@cluster1.h3hvpfv.mongodb.net/memories?retryWrites=true&w=majority"
  );
  const db = client.db();

  const memoriesCollection = db.collection("memories");

  const memories = await memoriesCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: memories.map((memory) => ({
      params: { memoryId: memory._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const memoryId = context.params.memoryId;

  const client = await MongoClient.connect(
    "mongodb+srv://nazih2001:nazih2001@cluster1.h3hvpfv.mongodb.net/memories?retryWrites=true&w=majority"
  );
  const db = client.db();

  const memoriesCollection = db.collection("memories");

  const selectedMemory = await memoriesCollection.findOne({
    _id: ObjectId(memoryId),
  });

  client.close();

  return {
    props: {
      memoryData: {
        id: selectedMemory._id.toString(),
        title: selectedMemory.title,
        image: selectedMemory.image,
        address: selectedMemory.address,
        description: selectedMemory.description,
      },
    },
  };
}

export default MemoryDetails;

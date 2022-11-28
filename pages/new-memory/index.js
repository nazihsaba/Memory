import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import NewMemoryForm from "../../components/memories/NewMemoryForm";

function NewMemoryPage() {
  const router = useRouter();

  async function addMemoryHandler(enteredMemoryData) {
    const response = await fetch("/api/new-memory", {
      method: "POST",
      body: JSON.stringify(enteredMemoryData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a memory of us!</title>
        <meta name="description" content="add your own memory!" />
      </Head>
      <NewMemoryForm onAddMemory={addMemoryHandler} />
    </Fragment>
  );
}

export default NewMemoryPage;

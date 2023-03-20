// our-domain.com/new-meetup

import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

function NewMeetupPage() {
  const router = useRouter();

  const addMeetup = async (meetUp) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetUp),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="add a new meetup to your meetups, this line will be shown in searches like google."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetup} />;
    </Fragment>
  );
}

export default NewMeetupPage;

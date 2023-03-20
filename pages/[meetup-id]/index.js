import MeetupDetails from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function MeetUpPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export default MeetUpPage;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://tomass:amarbamba12@cluster0.xmfwbnk.mongodb.net/meetups?retryWrites=true&w=majority" // meetups - name of database
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: true, // with fallback - the paths that are not includes - will dynamically be generated with a request.
    paths: meetups.map((m) => ({ params: { "meetup-id": m._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params["meetup-id"];

  const client = await MongoClient.connect(
    "mongodb+srv://tomass:amarbamba12@cluster0.xmfwbnk.mongodb.net/meetups?retryWrites=true&w=majority" // meetups - name of database
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  selectedMeetup.id = selectedMeetup._id.toString();
  delete selectedMeetup._id;

  return {
    props: {
      meetupData: selectedMeetup,
    },
  };
}

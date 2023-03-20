import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title> 
        <meta name="description" content="Browse a hugh list of meetups"/>  {/* Teh text that will be shown on searches ! */}
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export default HomePage;

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;

//   // fetch data from API - will execute on every request. but will appear slower than getStaticProps.

//   return {
//     props:{
//       meetups: allMeetups
//     }
//   }
// }

// if we import in our client side something and using it only in getStaticProps(), nextJS will make sure it doesn't get to the client
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://tomass:amarbamba12@cluster0.xmfwbnk.mongodb.net/meetups?retryWrites=true&w=majority" // meetups - name of database
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((m) => {
        return {
          title: m.title,
          image: m.image,
          address: m.address,
          description: m.description,
          id: m._id.toString(),
        };
      }),
    },
    revalidate: 1, // will get the data again every 10 seconds IF there are requests in the web.
  };
}
// always return an object !!

//  WE DONT NEED TO IMPORT ANYWHERE

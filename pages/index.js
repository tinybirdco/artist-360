import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Item from "../components/SimpleList/Item";

const SimpleList = dynamic(() => import("../components/SimpleList"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const token = process.env.NEXT_PUBLIC_TOKEN;

  return (
    <div>
      <Head>
        <title>Artist 360 by Galeo and Tinybird</title>
        <meta name="description" content={`Artist 360 by Galeo and Tinybird`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="Content">
        <div style={{ gridColumn: "1/6" }}>
          <h1 className="as-font--huge-bold no-spacing-3 mv-34">
            <span>Real-time</span>
            <img
              className="mr-6 ml-6"
              src="/tinybird.svg"
              alt="Tinybird"
              title="Tinybird"
            />
            <span>analytics</span>
            <br />
            <span>by</span>
            <img className="Avatar mr-6 ml-6" src="/music.png" />
            <span>platform and</span>
            <br />
            <span>genre or</span>
            <img className="Avatar mr-6 ml-6" src="/artist.png" />
            <span>artist</span>
          </h1>
        </div>

        <div style={{ gridColumn: "1/6" }}>
          <hr style={{ border: "0", borderTop: "1px solid #F2F2F2" }} />
        </div>

        {/* <SimpleList
          size={"3/6"}
          title={"Top Albums"}
          endpoint={"ranking_by"}
          item={({ album_name, plays, song_id }) => (
            <Item
              key={album_name}
              title={album_name}
              figure={plays}
              desc={name}
              showGraph={true}
              endpoint={"evolution_plays_income_from_mv"}
              songId={song_id}
              type={"album"}
              filters={{
                country,
                source: service,
                album: album_name,
                artist: name,
                token,
              }}
              graphKey={"plays"}
              label={"Streams"}
            />
          )}
          filters={{
            country,
            source: service,
            artist: name,
            by: "album_name",
            token,
          }}
          label={"Streams"}
        />

        <SimpleList
          size={"1/3"}
          title={"Top Songs"}
          endpoint={"ranking_by"}
          item={({ song_title, plays, song_id }) => (
            <Item
              key={song_title}
              title={song_title}
              figure={plays}
              songId={song_id}
              type={"song"}
              desc={name}
              showGraph={false}
              label={"Streams"}
            />
          )}
          filters={{
            country,
            source: service,
            artist: name,
            by: "song_title",
            token,
          }}
          label={"Streams"}
        /> */}
      </main>

      <Footer />
    </div>
  );
}

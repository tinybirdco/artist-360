import Head from "next/head";
import dynamic from "next/dynamic";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ArtistItem from "../components/SimpleList/ArtistItem";
import SongItem from "../components/SimpleList/SongItem";
import CountryItem from "../components/SimpleList/CountryItem";
import numeral from "numeral";
import Genres from "../components/Genres";

const SimpleList = dynamic(() => import("../components/SimpleList"), {
  ssr: false,
});

const CountryList = dynamic(() => import("../components/CountryList"), {
  ssr: false,
});

const INTERVAL = 5000;

export default function Home() {
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
            <img
              className="Avatar mr-6 ml-6"
              src="/music.png"
              alt="Music"
              title="Music"
            />
            <span>platform and</span>
            <br />
            <span>genre or</span>
            <img
              className="Avatar mr-6 ml-6"
              src="/artist.png"
              alt="Artist"
              title="Artist"
            />
            <span>artist</span>
          </h1>

          <img
            style={{
              position: "absolute",
              right: 0,
              top: "120px",
            }}
            src="/graph.svg"
          />
        </div>

        <div style={{ gridColumn: "1/6" }}>
          <hr style={{ border: "0", borderTop: "1px solid #F2F2F2" }} />
        </div>

        <SimpleList
          interval={INTERVAL}
          size={"1/4"}
          title={"Top Artists"}
          endpoint={"ranking_by"}
          item={({ artist, plays }) => {
            return (
              <ArtistItem
                endpoint={"evolution_plays_income_from_mv"}
                key={artist}
                title={artist}
                figure={plays}
                dataId={artist}
                type={"artist"}
                filters={{
                  artist,
                  token,
                }}
                graphKey={"plays"}
                desc={"-"}
                showGraph={true}
                label={"Streams"}
              />
            );
          }}
          filters={{
            by: "artist",
            token,
          }}
          label={"Streams"}
        />

        <SimpleList
          interval={INTERVAL}
          size={"4/6"}
          title={"Top Songs"}
          endpoint={"ranking_by"}
          item={({ song_title, plays, song_id }) => (
            <SongItem
              key={song_title}
              title={song_title}
              figure={plays}
              desc={"-"}
              showGraph={false}
              endpoint={"evolution_plays_income_from_mv"}
              dataId={song_id}
              type={"song"}
              label={"Streams"}
            />
          )}
          filters={{
            by: "song_title",
            token,
          }}
          label={"Streams"}
        />

        <Genres size={"1/6"} />

        <CountryList
          interval={INTERVAL}
          size={"1/6"}
          title={"Top Countries"}
          endpoint={"ranking_by"}
          item={({ country, plays }) => (
            <CountryItem
              key={country}
              title={country}
              desc={
                <>
                  <span className="as-color--main">
                    {numeral(plays).format(",")}
                  </span>{" "}
                  Streams
                </>
              }
            />
          )}
          filters={{
            by: "country",
            token,
          }}
          label={"Streams"}
        />
      </main>
      <Footer />
    </div>
  );
}

import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import ServiceFilter from "../../components/ServiceFilter";
import CountryDropdown from "../../components/CountryDropdown";
import Footer from "../../components/Footer";
import Item from "../../components/SimpleList/Item";

const SimpleList = dynamic(() => import("../../components/SimpleList"), {
  ssr: false,
});

const Performance = dynamic(() => import("../../components/Performance"), {
  ssr: false,
});

const Plays = dynamic(() => import("../../components/Plays"), {
  ssr: false,
});

export default function Artist() {
  const [country, setCountry] = useState(null);
  const [service, setService] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();
  const {
    query: { name },
  } = router;
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const normalizedName = name
    ? name.replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  async function _fetchArtistData() {
    const res = await fetch(`/api/artist/${name}`)
      .then((r) => r.json())
      .then((d) => d);

    if (res.avatar) {
      setAvatar(res.avatar);
    }
  }

  useEffect(
    function () {
      if (name) {
        _fetchArtistData();
      }
    },
    [name]
  );

  return (
    <div>
      <Head>
        <title>Artist 360 · {normalizedName}</title>
        <meta name="description" content={`Artist 360 · ${normalizedName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header name={name} />

      <main className="Content">
        <div style={{ gridColumn: "1/6" }}>
          <h1 className="as-font--huge-bold no-spacing-3">
            <span>Real-time</span>
            <svg
              className="mr-6 ml-6"
              width="48"
              height="48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="12" fill="url(#paint0_linear)" />
              <path
                opacity=".6"
                d="M38 12.398L29.259 10l-3.076 6.873L38 12.397zM29.78 29.27l-7.966-3.234L16.936 38l12.844-8.73z"
                fill="#fff"
              />
              <path
                d="M10 22.316l19.641 7.03 3.221-15.019L10 22.316z"
                fill="#fff"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="49.737"
                  y1="0"
                  x2="-8.794"
                  y2="-.393"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#22CD88" />
                  <stop offset=".982" stopColor="#04BAF5" />
                </linearGradient>
              </defs>
            </svg>
            <span>analytics:</span>
            <br />
            {avatar ? (
              <img
                className="Avatar as-bkg--tuna mr-6"
                src={avatar}
                title={name}
                alt={name}
              />
            ) : (
              <span className="Avatar as-bkg--tuna mr-6"></span>
            )}

            <span>{normalizedName}</span>
          </h1>
        </div>

        <div style={{ gridColumn: "4/6" }}></div>

        <div style={{ gridColumn: "1/6" }}>
          <hr style={{ border: "0", borderTop: "1px solid #F2F2F2" }} />
        </div>

        <div style={{ gridColumn: "1/6" }} className="flex-between-center">
          <ServiceFilter
            value={service}
            onChange={(service) => setService(service)}
          />
          <CountryDropdown
            country={country}
            onChange={(country) => setCountry(country)}
          />
        </div>

        <Plays
          size={"1/4"}
          endpoint={{
            rt: "evolution_plays_income_per_second",
            fixed: "evolution_plays_income_from_mv",
          }}
          filters={{
            country,
            source: service,
            artist: name,
            token,
          }}
        />

        <Performance
          size={"4/6"}
          endpoint={"evolution_plays_income_from_mv"}
          filters={{
            country,
            source: service,
            artist: name,
            token,
          }}
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
        />
        <SimpleList
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
      </main>

      <Footer />
    </div>
  );
}

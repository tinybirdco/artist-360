import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import ServiceFilter from "../../components/ServiceFilter";
import Footer from "../../components/Footer";
import ArtistPageItem from "../../components/SimpleList/Item";

const SimpleList = dynamic(() => import("../../components/SimpleList"), {
  ssr: false,
});

const Performance = dynamic(() => import("../../components/Performance"), {
  ssr: false,
});

const Plays = dynamic(() => import("../../components/Plays"), {
  ssr: false,
});

const CountryDropdown = dynamic(
  () => import("../../components/CountryDropdown"),
  {
    ssr: false,
  }
);

const INTERVAL = 3000;

export default function Artist() {
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();
  const {
    query: { name, country, service },
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
        setAvatar(null);
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
          <h1 className="as-font--huge-bold no-spacing-3 mv-34">
            <Link href="/">
              <a className="as-color--main">Real-time</a>
            </Link>
            <img
              className="mr-6 ml-6"
              src="/tinybird.svg"
              alt="Tinybird"
              title="Tinybird"
            />
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

        <div style={{ gridColumn: "1/6" }}>
          <hr style={{ border: "0", borderTop: "1px solid #F2F2F2" }} />
        </div>

        <div style={{ gridColumn: "1/6" }} className="flex-between-center">
          <ServiceFilter
            value={service}
            onChange={(s) =>
              router.push(
                {
                  pathname: "/artist/[name]",
                  query: { name, service: s, country },
                },
                null,
                {
                  scroll: false,
                }
              )
            }
          />
          <CountryDropdown
            country={country}
            onChange={(c) =>
              router.push(
                {
                  pathname: "/artist/[name]",
                  query: { name, service, country: c },
                },
                null,
                {
                  scroll: false,
                }
              )
            }
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
          interval={INTERVAL}
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
          interval={INTERVAL}
          size={"1/3"}
          title={"Top Songs"}
          endpoint={"ranking_by"}
          item={({ song_title, plays, song_id }) => (
            <ArtistPageItem
              key={song_title}
              title={song_title}
              figure={plays}
              dataId={song_id}
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
          interval={INTERVAL}
          size={"3/6"}
          title={"Top Albums"}
          endpoint={"ranking_by"}
          item={({ album_name, plays, song_id }) => (
            <ArtistPageItem
              key={album_name}
              title={album_name}
              figure={plays}
              desc={name}
              showGraph={true}
              endpoint={"evolution_plays_income_from_mv"}
              dataId={song_id}
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

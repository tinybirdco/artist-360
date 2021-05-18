import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

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

const INTERVAL_REFRESH = 3000;

export default function Artist() {
  const [country, setCountry] = useState(null);
  const [service, setService] = useState(null);
  const router = useRouter();
  const {
    query: { name },
  } = router;
  const token = process.env.NEXT_PUBLIC_TOKEN;

  const normalizedName = name
    ? name.replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  return (
    <div>
      <Head>
        <title>Artist 360 · {normalizedName}</title>
        <meta name="description" content={`Artist 360 · ${normalizedName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header></header>

      <main className="Content">
        <div style={{ gridColumn: "1/6" }}>
          <h1 className="as-font--huge-bold no-spacing-3">
            <span>Real-time</span>
            <span className="Avatar as-bkg--tuna mr-6 ml-6"></span>
            <span>analytics:</span>
            <br />
            <span className="Avatar as-bkg--tuna mr-6"></span>
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
          item={({ song_title, plays }) => (
            <Item
              key={song_title}
              title={song_title}
              figure={plays}
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
          item={({ album_name, plays }) => (
            <Item
              key={album_name}
              title={album_name}
              figure={plays}
              desc={name}
              showGraph={true}
              endpoint={"evolution_plays_income_from_mv"}
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

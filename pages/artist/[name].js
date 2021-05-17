import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import ServiceFilter from "../../components/ServiceFilter";
import CountryDropdown from "../../components/CountryDropdown";
import Footer from "../../components/Footer";

const SimpleList = dynamic(() => import("../../components/SimpleList"), {
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

        {/* <div className="Card Content-threeFirst"></div>
        <div className="Card Content-twoSecond"></div> */}

        <SimpleList
          interval={INTERVAL_REFRESH}
          size={"1/3"}
          title={"Top Songs"}
          endpoint={"whatever"}
          filters={{
            country,
            service,
            artist: name,
          }}
          label={"Streams"}
        />
        <SimpleList
          interval={INTERVAL_REFRESH}
          size={"3/6"}
          title={"Top Albums"}
          endpoint={"whatever"}
          filters={{
            country,
            service,
            artist: name,
          }}
          label={"Streams"}
        />
      </main>

      <Footer />
    </div>
  );
}

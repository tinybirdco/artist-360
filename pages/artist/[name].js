import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import SimpleList from "../../components/SimpleList";

const INTERVAL_REFRESH = 3000;

export default function Artist() {
  const [country, setCountry] = useState(null);
  const [service, setService] = useState(null);
  const router = useRouter();
  const {
    query: { name },
  } = router;

  // console.log(name);

  return (
    <div>
      <Head>
        <title>Artist 360 · Whatever</title>
        <meta name="description" content="Artist 360 · Whatever" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header></header>

      <main className="Content">
        <div className="Content-threeFirst">
          <h1 className="as-font--huge-bold no-spacing-3">
            <span>Real-time</span>
            <span className="Avatar as-bkg--tuna mr-6 ml-6"></span>
            <span>analytics</span>
            <br />
            <span className="Avatar as-bkg--tuna mr-6"></span>
            <span>{name}</span>
          </h1>
        </div>

        <div className="Content-twoSecond"></div>

        <div className="Content-full">
          <hr />
        </div>

        <div className="Content-threeFirst">paco</div>

        <div className="Content-twoSecond">paco</div>

        <div className="Card Content-threeFirst"></div>
        <div className="Card Content-twoSecond"></div>

        <SimpleList
          interval={INTERVAL_REFRESH}
          size={"1/3"}
          title={"Top Songs"}
          endpoint={"whatever"}
          filters={{
            country,
            service,
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
          }}
          label={"Streams"}
        />
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}

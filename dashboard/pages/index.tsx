import Head from "next/head";
import Navbar from "../components/Nav";
import Serving from "../components/Home-Serving";
export default function Home() {
  return (
    <>
      <Head>
        <title>Neptune | Home</title>
      </Head>
      <Navbar />
      <div className="hero min-h-screen px-10 pt-2 pb-10">
        <div className="flex-col justify-center hero-content lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold">Neptune</h1>
            <p className="mb-1">
              Configure moderation and much more with the most easy-to-use
              dashboard!
            </p>
            <Serving />
          </div>
          <div className="flex-shrink-0 w-52 h-52 shadow-xl rounded-full hover:shadow-2xl transition transform-gpu hover:scale-90 hover:cursor-move">
            <img src="./ariel.png" />
          </div>
        </div>
      </div>
    </>
  );
}

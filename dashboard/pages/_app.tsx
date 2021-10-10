import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-800">
      <Component {...pageProps} />{" "}
    </div>
  );
}

export default MyApp;

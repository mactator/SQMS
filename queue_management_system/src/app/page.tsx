import Link from "next/link";

export default async function Home() {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await sleep(1000);
  return <div></div>;
}

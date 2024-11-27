import Link from "next/link";

export default async function Home() {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await sleep(2000);
  return (
    <div>
      {/* <Link href={"/account"} className="btn btn-primary">
        {" "}
        Your Uncle
      </Link> */}
    </div>
  );
}

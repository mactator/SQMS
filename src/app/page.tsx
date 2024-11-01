import Link from "next/link";
import "@/styles/ticket.css";

export default async function Home() {
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await sleep(3000);  
  return (
    <div>
        {/* <div id="raffle-red" className="entry raffle">
        <div className="no-scale"></div>
  </div> */}
    

      <Link href={"/account"} className="btn btn-primary">
        {" "}
        Your Uncle
      </Link>
    </div>
  );
}

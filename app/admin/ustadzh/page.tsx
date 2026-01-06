import UstadzhCRUDPage from "./client";
import { GetAllUstadzh } from "./serv";

export default async function Page() {
    const data  = await GetAllUstadzh();
    console.log("Ustadzh Data:", data);

    return(
        <UstadzhCRUDPage ustadzh={data} />
    )
}
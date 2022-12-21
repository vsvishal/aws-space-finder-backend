import { handler } from "../../services/SpacesTable/Create";


const event = {
    body: {
        location: "Pune",
    }
}
handler(event as any, {} as any);

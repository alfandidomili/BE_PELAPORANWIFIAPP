import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
   deleteEvidenceMitra,
   getEviden,
   getEvidenceById,
   insertEviden,
   updateEviden,
} from "../controllers/evidenceController.js";
const eviden = Router();

eviden.get("/eviden", getEviden);
eviden.post("/eviden/create", insertEviden);
eviden.delete("/eviden/:idEviden", deleteEvidenceMitra);
eviden.put("/eviden/update/:idEviden", updateEviden);
eviden.get("/eviden/:idEviden", getEvidenceById);

export default eviden;

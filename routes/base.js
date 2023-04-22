import { Router } from "express";
import { configManager } from "../utils/config.js";

const router = Router();

router.get("/", (_, res, __) => {
    res.render("index", { title: "Main page" , acts: configManager.activites, events: configManager.events});
});

router.get("/contact", (_, res, __) => {
    res.render("contact", { title: "Contact" })
});

router.get("/ProductionScientifique/reverseEngineering", (_, res, __) => {
    res.render("reverseEngineering", { title: "Reverse Engineering" })
});

router.get("/ProductionScientifique/communicationScientifique", (_, res, __) => {
    res.render("communicationScientifique", { title: "Communication Scientifique" })
});




export default router;

import { Router } from "express";
import { configManager } from "../utils/config.js";

const router = Router();

router.get("/", (_, res, __) => {
    // A list of parner name and logo link objects
    const partners = [];
    partners.push({ name: "L’École Nationale Supérieure d Arts et Métiers de Rabat", img: "/static/img/ensamrabat.png" });
    partners.push({ name: "Pro Cura Medici – Management Medical GmbH", img: "/static/img/prccuramedici.png" });
    partners.push({ name: "PharmaTrace", img: "/static/img/pharmatrace.jpg" });
    partners.push({ name: "International Competencies Morocco (ICM)", img: "/static/img/icmorocco.svg"});
    res.render("index", {
        title: "Main page", acts: configManager.activites, events: configManager.events, partners, videos : configManager.videos
    });

});

router.get("/evenements", (_, res, __) => {
    res.render("evenements", {events: configManager.events});
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
router.get("/propos", (_, res, __) => {
    res.render("propos", { title: "propos" })
});



export default router;

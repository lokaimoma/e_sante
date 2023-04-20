import {Router} from "express";

const router = Router();

router.get("/", (_, res, __) => {
    res.render("index", {title: "Main page", ha: "Loco"})
});

router.get("/partenariats", (_, res, __) => {
    res.render("partenariats", {title: "Partenariats"})
});

router.get("/contact", (_, res, __) => {
    res.render("contact", {title: "Contact"})
});

router.get("/activites", (_, res, __) => {
    res.render("activites", {title: "Activités"})
});

router.get("/membres", (_, res, __) => {
    res.render("membres", {title: "Membres"})
});

router.get("/evenements", (_, res, __) => {
    res.render("evenements", {title: "Événements"})
});


router.get("/ProductionScientifique/reverseEngineering", (_, res, __) => {
    res.render("reverseEngineering", {title: "Reverse Engineering"})
});

router.get("/ProductionScientifique/communicationScientifique", (_, res, __) => {
    res.render("communicationScientifique", {title: "Communication Scientifique"})
});


export default router;

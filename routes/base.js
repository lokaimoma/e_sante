import {Router} from "express";
import configManager from "#utils/config.js";

const router = Router();

router.get("/", (_, res, __) => {
      res.render('index', { title: 'Main page', events: configManager.events });
});

router.get("/partenariats", (_, res, __) => {
    res.render("partenariats", {title: "Partenariats"})
});

router.get("/contact", (_, res, __) => {
    res.render("contact", {title: "Contact"})
});

router.get("/membres", (_, res, __) => {
    res.render("membres", {title: "Membres"})
});


router.get("/ProductionScientifique/reverseEngineering", (_, res, __) => {
    res.render("reverseEngineering", {title: "Reverse Engineering"})
});

router.get("/ProductionScientifique/communicationScientifique", (_, res, __) => {
    res.render("communicationScientifique", {title: "Communication Scientifique"})
});




export default router;

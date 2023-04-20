import {Router} from "express";

const router = Router();

router.get("/", (_, res, __) => {

    // this array is just temporary | my idea was to pass events as param
    const events = [
        { title: "Event 1", imgurl: "image1.jpg" },
        { title: "Event 2", imgurl: "image2.jpg" },
        { title: "Event 3", imgurl: "image3.jpg" }
      ];
    
      res.render('index', { title: 'Main page', events: events });
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

import {Router} from "express";

const router = Router();

router.get("/", (_, res, __) => {
    res.render("index", {title: "Main page", ha: "Loco"})
});



export default router;

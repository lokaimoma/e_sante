import {Router} from "express";

const router = Router();

router.get("/", (_, res, __) => {
    res.render("index", {title: "Index page", ha: "Loco"})
});


export default router;

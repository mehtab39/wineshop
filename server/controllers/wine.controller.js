const express = require("express");
const Wine = require("../models/wine.model");
const router = express.Router();
router.post("/suggestions", async (req, res) => {
    try {
        let search = req.body.search;
        Wine.find({
            winery: {
                $regex: search,
                $options: 'i'
            }
        }, function (err, result) {
            if (err) {
                return res.status(500).json({
                    err: err
                })
            }
            return res.status(200).json({
                result
            })
        });
    } catch (e) {
        return res.send({
            status: "failed",
            message: e.message
        });
    }
})

router.get("/wine", async (req, res) => {
    try {
        let sorting = 1;
        const page = +req.query.page || 1;
        const size = +req.query.size || 20;
        const skip = (page - 1) * size;

        req.query.sort && req.query.sort == "desc" && (sorting = -1)

        const wine = await Wine.find().sort({
            "rating.average": sorting
        }).skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil(await Wine.find({}).countDocuments() / size)
        console.log('totalPages:', totalPages)
        
        if (page > totalPages) {
            return res.status(404).send("error");
        }
        return res.json({
            wine,
            totalPages,
            page
        })


    } catch (e) {
      
        return res.send({
            e
        });
    }
})

module.exports = router;
"use strict";

const router = require('express').Router();

router.get('/test', (req, res) => {
    res.json({
        status: "success"
    });
});

module.exports = router;
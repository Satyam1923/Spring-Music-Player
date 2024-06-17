import {getChart} from "billboard-top-100";
import express from "express";

const router = express.Router();
const cache = {};

router.get("/", async (req, res) => {
    const cacheKey = 'artist-100';
    const cachedData = cache[cacheKey];
    if (cachedData) {
      console.log('Using cached data');
      return res.json(cachedData);
    }
    getChart(cacheKey, (err, chart) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      cache[cacheKey] = chart; 
      res.status(200).json(chart);
    });
});


export default router;

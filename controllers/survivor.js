const Survivor = require("../modals/survivor");

exports.Survivors = {
  create: (req, res, next) => {
    try {
      if (
        !(
          req.body.name &&
          req.body.age &&
          req.body.gender &&
          req.body.lastLocation.latitude &&
          req.body.lastLocation.longitude
        )
      ) {
        res.status(400).json("Please input all values");
      }
      const newSurvivor = new Survivor({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        lastLocation: {
          latitude: req.body.lastLocation.latitude,
          longitude: req.body.lastLocation.longitude,
        },
      });
      newSurvivor
        .save()
        .then((data) => {
          req.survivordata = data;
          next();
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getById: (req, res) => {
    try {
      Survivor.findById({ _id: req.params.id })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      if (req.body.report >= 3) {
        const survivor = await Survivor.findOne({ _id: req.params.id });
        survivor.infected = true;
        survivor
          .save()
          .then((data) => {
            return res.json(data);
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateLocation: async (req, res) => {
    try {
   
        const survivor = await Survivor.findOne({ _id: req.params.id });
        survivor.lastLocation.latitude = req.body.latitude;
        survivor.lastLocation.longitude = req.body.longitude;
        survivor
          .save()
          .then((data) => {
            return res.json(data);
          })
          .catch((err) => {
            return res.status(400).json(err);
          });

    } catch (error) {
      return res.status(500).json(error);
    }
  },
  infectedSurvivors: async (req, res) => {
    try {
      const totalSurvivors = await Survivor.find().countDocuments();
      Survivor.find({ infected: true })
        .countDocuments()
        .then((data) => {
          const percentage = (data / totalSurvivors) * 100;
          res.json(percentage);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  nonInfectedSurvivors: async (req, res) => {
    try {
      const totalSurvivors = await Survivor.find().countDocuments();
      Survivor.find({ infected: false })
        .countDocuments()
        .then((data) => {
          const percentage = (data / totalSurvivors) * 100;
          res.json(percentage);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

const CronJobModel = require("../models/CronJob");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const cronJob = request.body;
      await CronJobModel.create(cronJob);
      return response.status(201).json({ notification: "OK" });
    } catch (err) {
      console.error(`cronJob creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await CronJobModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`CronJob getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await CronJobModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`cronJob getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await CronJobModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`cronJob delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

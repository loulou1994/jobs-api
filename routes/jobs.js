const express = require('express');
const router = express.Router();

const {
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router
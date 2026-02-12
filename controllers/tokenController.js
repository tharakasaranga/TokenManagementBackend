const Token = require('../models/Token');
const createToken = async (req, res, next) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      res.status(400);
      throw new Error('Mobile number is required');
    }

    const token = await Token.create({
      mobileNumber,
      status: 'PENDING',
    });

    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};


const getTokens = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
     const query = status ? { status } : {};

    const startIndex = (page - 1) * limit;

    const tokens = await Token.find(query)
      .sort({ createdAt: -1 }) 
      .limit(limit * 1)
      .skip(startIndex);

    const count = await Token.countDocuments(query);

    res.status(200).json({
      tokens,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalTokens: count,
    });
  } catch (error) {
    next(error);
  }
};


const updateTokenStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    

    if (!['PENDING', 'SERVED', 'CANCELLED'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const token = await Token.findById(req.params.id);

    if (!token) {
      res.status(404);
      throw new Error('Token not found');
    }


    token.status = status;
    const updatedToken = await token.save();

    res.status(200).json(updatedToken);
  } catch (error) {
    next(error);
  }
};

module.exports = { createToken,  getTokens,  updateTokenStatus,};
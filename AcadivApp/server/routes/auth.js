const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Escape special characters in role number
const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// ==================================
// SIGNUP
// ==================================
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, city, selectedField } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Yeh email pehle se registered hai!',
      });
    }

    let roleNumber;
    let roleExists = true;

    while (roleExists) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      roleNumber = `ACADIV-${randomNum}`;

      roleExists = await User.exists({ roleNumber });
    }

    const newUser = new User({
      name: name.trim(),
      email: cleanEmail,
      password,
      roleNumber,
      city: city || '',
      selectedField: selectedField || '',
      hasCompletedTest: false,
    });

    // User model password ko automatically hash karta hai
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'Account successfully registered!',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        roleNumber: newUser.roleNumber,
        city: newUser.city,
        selectedField: newUser.selectedField,
        hasCompletedTest: newUser.hasCompletedTest,
        riasecScores: newUser.riasecScores,
      },
    });

  } catch (error) {
    console.error('Signup Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error during signup.',
    });
  }
});


// ==================================
// LOGIN
// ==================================
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/role number and password.',
      });
    }

    const cleanInput = identifier.trim().toLowerCase();

    const user = await User.findOne({
      $or: [
        { email: cleanInput },
        {
          roleNumber: {
            $regex: `^${escapeRegex(cleanInput)}$`,
            $options: 'i',
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Is email par koi account registered nahi hai. Please Sign Up.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please try again.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        roleNumber: user.roleNumber,
        city: user.city,
        selectedField: user.selectedField,
        hasCompletedTest: user.hasCompletedTest,
        riasecScores: user.riasecScores,
      },
    });

  } catch (error) {
    console.error('Login Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error during login.',
    });
  }
});


// ==================================
// UPDATE USER PROFILE
// ==================================
router.patch('/update-profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { city, selectedField, hasCompletedTest } = req.body;

    const updateData = {};

    if (city !== undefined) {
      updateData.city = city;
    }

    if (selectedField !== undefined) {
      updateData.selectedField = selectedField;
    }

    if (hasCompletedTest !== undefined) {
      updateData.hasCompletedTest = hasCompletedTest;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No profile information provided.',
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user,
    });

  } catch (error) {
    console.error('Profile Update Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to update profile.',
    });
  }
});

module.exports = router;
const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    console.log({ hashedPwd })

    //create and store the new user
    const result = await User.create({
      username: name,
      password: hashedPwd,
      email: email
    });

    console.log(result);

    res.status(201).json({ message: `New user ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

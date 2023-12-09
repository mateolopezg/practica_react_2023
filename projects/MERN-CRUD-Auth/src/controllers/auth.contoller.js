import User from '../models/user.model.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const newUser = new User({
      username,
      password,
      email
    })

    const userSaved = await newUser.save()
    console.log(email, password, username)
    res.json(userSaved)
  } catch (error) {
    console.error(error)
  }
}
export const login = (req, res) => {
  res.send('login')
}

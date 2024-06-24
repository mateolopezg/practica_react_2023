import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const hash = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      password: hash,
      email
    })

    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id })

    res.cookie('token', token)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    })
  } catch (error) {
    console.error(error)
  }
}
export const login = (req, res) => {
  res.send('login')
}

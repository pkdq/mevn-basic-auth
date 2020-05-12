const getUser = (req, res) => {
    let user = req.user

    delete user.password

    return res.status(200).json(user)
}

export default {
    getUser
}
import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { User, Post } = prisma

export default {
    getAll(req, res) {
        User.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Some error occurred while retrieving users',
                })
            })
    },
    get(req, res) {
        const { id } = req.params

        User.findUnique({ where: { id: parseInt(id) } })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Cannot find user with id=${id}`,
                      })
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occurred while retrieving the user with id=${id}`,
                })
            })
    },
    create(req, res) {
        const { name } = req.body

        User.create({
            data: {
                name: name,
            },
        })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Some error occurred while creating the user',
                })
            })
    },
    update(req, res) {
        const { id } = req.params
        const { name } = req.body

        User.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name,
            },
        })
            .then(() => {
                res.status(200).send({
                    message: 'User was updated successfully',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occurred while updating the user with id=${id}`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params

        const deletePosts = Post.deleteMany({
            where: {
                userId: parseInt(id),
            },
        })
        const deleteUser = User.delete({
            where: {
                id: parseInt(id),
            },
        })

        prisma
            .$transaction([deletePosts, deleteUser])
            .then(() => {
                res.status(200).send({
                    message: 'User was deleted successfully',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occurred while deleting the user with id=${id}`,
                })
            })
    },
}

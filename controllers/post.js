import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { Post } = prisma

export default {
    getAll(req, res) {
        Post.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Some error occurred while retrieving posts',
                })
            })
    },
    get(req, res) {
        const { id } = req.params

        Post.findUnique({ where: { id: parseInt(id) } })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Cannot find post with id=${id}`,
                      })
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occurred while retrieving the post with id=${id}`,
                })
            })
    },
    create(req, res) {
        const { userId, title, content, description } = req.body

        Post.create({
            data: {
                userId: parseInt(userId),
                title: title,
                content: content,
                description: description,
            },
        })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Some error occurred while creating the post',
                })
            })
    },
    update(req, res) {
        const { id } = req.params
        const { title, content, description } = req.body

        Post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: title,
                content: content,
                description: description,
            },
        })
            .then(() => {
                res.status(200).send({
                    message: 'Post was updated successfully',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occurred while updating the post with id=${id}`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params

        Post.delete({
            where: {
                id: parseInt(id),
            },
        })
            .then(() => {
                res.status(200).send({
                    message: 'Post was deleted successfully',
                })
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occurred while deleting the post with id=${id}`,
                })
            })
    },
}

import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const {admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        const { name } = request.body

        const { fileName: path } = request.file

        const categoryExistis = await Category.findOne({
            where: { name },
        })

        if (categoryExistis) {
            return response.status(400).json({ error: 'Category name already exists' })
        }

        const { id } = await Category.create({ name, path })

        return response.json({ name, id })
    }

    async index(requet, response) {
        const category = await Category.findAll()

        return response.json(category)
    }

    async update(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string(),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const {admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        const { name } = request.body


        const { id } = request.params

        const category = await Category.findByPk(id)

        if (!category) {
            return response.status(401).json( { error: "Make sure your categroy id is correct" } )
        }

        let path;
        if(request.file){
            path = request.file.fileName
        }

        await Category.update({ name, path }, { where: { id } })

        return response.status(200).json()
    }

}

export default new CategoryController()

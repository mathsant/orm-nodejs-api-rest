const database = require('../models');

class PessoaController{

    static async pegaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error){
            return res.status(500).json(error.message)
        } 
    }

    static async pegaUmaPessoa(req, res){
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne( { where: { id: Number(id) }})
            return res.status(200).json(umaPessoa)
        } 
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res){
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res){
        const { id } = req.params
        const novaInfo = req.body
        try {
            await database.Pessoas.update(novaInfo, { where: { id: Number(id) }})
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) }})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaPessoa(req, res){
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id)}})
            return res.status(200).json({ mensagem: `Id ${id} deletado!`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne( {where: {id: Number(matriculaId), estudante_Id: Number(estudanteId) }})
            return res.status(200).json(umaMatricula)
        } 
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res){
        const { estudanteId } = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCrida = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCrida)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        const novaInfo = req.body
        try {
            await database.Matriculas.update(novaInfo, { where: { id: Number(matriculaId), estudante_id: Number(estudanteId)}})
            const matriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) }})
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    
    static async deletaMatricula(req, res){
        const { matriculaId } = req.params
        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId)}})
            return res.status(200).json({ mensagem: `Id ${matriculaId} deletado!`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
}


module.exports = PessoaController
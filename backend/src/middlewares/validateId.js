// validaçao de id
const validateId = (req, res, next) => {
    const id = req.params.id;
    
    // Verifica se o ID existe e tem 24 caracteres
    if (!id || id.length !== 24) {
        return res.status(400).json({ error: 'ID inválido: deve ter 24 caracteres' });
    }
    
    // Verifica se todos os caracteres são hexadecimais válidos
    const hexRegex = /^[0-9a-fA-F]{24}$/;
    if (!hexRegex.test(id)) {
        return res.status(400).json({ error: 'ID inválido: deve conter apenas caracteres hexadecimais' });
    }
    
    next();
};

export default validateId;


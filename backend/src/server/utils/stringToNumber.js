// funçao de conversao para usar o tempo da musica em segundos para ordenar uma lista por ex
function durationStringToSeconds(durationString) {
    if (!durationString) return 0; // Lida com valores nulos ou undefined

    const parts = durationString.split(':');
    if (parts.length !== 2) return 0; // Validação básica do formato "minutos:segundos"

    const minutes = parseInt(parts[0], 10) || 0; // Converte minutos para número, padrão para 0 se falhar
    const seconds = parseInt(parts[1], 10) || 0; // Converte segundos para número, padrão para 0 se falhar

    return minutes * 60 + seconds; // Retorna total de segundos
}

export { durationStringToSeconds }; 
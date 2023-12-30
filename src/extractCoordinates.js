/**
 * Extrae los numeros de la coordenada de la string dada
 * @param {string} string coordenadas
 * @returns
 */
function extractCoordinates(string) {
  const result = string.replace(/[^0-9||,]*/g, "");
  const array = result.split(",");
  return [Number(array[0]), Number(array[1])];
}

export default extractCoordinates;

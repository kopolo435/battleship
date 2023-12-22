function extractCoordinates(string) {
  const result = string.replace(/[^0-9||,]*/g, "");
  return result.split(",");
}

export default extractCoordinates;

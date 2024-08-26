export default async function fetchContrastScore(onFetch, colora) {
  try {
    const responseData = await onFetch({
      contrastText: colora.contrastText,
      hex: colora.hex,
    });
    setOverallContrastScore(responseData.overall); // Setzt den Overall-Wert
    console.log("log responseData in colorcomponent:", responseData);
  } catch (error) {
    console.error("Error fetching contrast score:", error);
  }
}

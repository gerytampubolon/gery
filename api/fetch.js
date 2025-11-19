export default async function handler(req, res) {
  const { app, device, key } = req.query;

  const url = `https://platform.antares.id:8443/~/antares-cse/antares-id/${app}/${device}/la`;

  try {
    const antares = await fetch(url, {
      method: "GET",
      headers: {
        "X-M2M-Origin": key,
        "Content-Type": "application/json;ty=4",
        "Accept": "application/json"
      }
    });

    const data = await antares.text(); // ambil RAW
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

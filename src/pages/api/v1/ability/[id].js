import fetch from 'node-fetch'

export default async (req, res) => {
  const baseUrl = process.env.BASE_API_URL_EXTERNAL;
  const { method, query: { id } } = req;
  let data = {};

  switch (method) {
    case "GET":
        const url = `${baseUrl}/ability/${id}`;
        const response = await fetch(url);
        try {
          data = await response.json();
        } catch (error) {
          // console.log("##error fetch: ", error.message)
        }

        if (data.id && data.pokemon && data.pokemon.length > 0) {
          let results = []
          data.pokemon.map(({ pokemon }) => {
            const { name, url } = pokemon;
            const lengthUrl = url.length;
            const id = url.slice(34, lengthUrl-1);
            results.push({ id, name, text: `${id}. ${name}`, url, icon: `https://pokeres.bastionbot.org/images/pokemon/${id}.png` })
          })
          res.status(200).json(results);
        } else {
          res.status(404).json("Data not found");
        }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

}
import fetch from "node-fetch";

export default async (req, res) => {
  const baseUrl = process.env.BASE_API_URL_EXTERNAL;
  const { method, query: { page } } = req;
  const paging = (page)? page:1;
  const limit = 21;
  const offset = (paging * limit) -limit;
  let data = {};

  switch (method) {
    case "GET":
        const url = `${baseUrl}/pokemon?offset=${offset}&limit=${limit}`;
        const response = await fetch(url);
        try {
          data = await response.json();
        } catch (error) {
          // console.log("##error fetch: ", error.message)
        }

        if (data.results && data.results.length > 0) {
          let results = []
          data.results.map(({ name, url }, index) => {
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
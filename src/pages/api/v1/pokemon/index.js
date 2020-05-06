import fetch from "node-fetch";

export default async (req, res) => {
  const baseUrl = process.env.BASE_API_URL_EXTERNAL;
  const { method, query: { page } } = req;
  const paging = (page)? page:1;
  const limit = 20;
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
          res.status(200).json(data);
        } else {
          res.status(404).json("Data not found");
        }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

}
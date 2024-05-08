const fetchBlogs = async () => {
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_JWT}`,
    },
  };
  const request = await fetch(
    "http://localhost:1337/api/blogs?populate=*",
    reqOptions
  );

  const response = await request.json();
  return response;
};

export default fetchBlogs;

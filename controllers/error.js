const error404 = (req, res) => {
  res.status(404).render("error", {
    title: "Error 404 not found",
    message: "El recurso que estas buscando no existe.",
  });
};

export default {
  error404,
};

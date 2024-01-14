app.get("/api/", (req, res) => {
  db.query(
    "SELECT STAR, IMAGEURL, TITLE FROM LECTURE ORDER BY VIEW_CNT DESC, TITLE ASC;",
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      var Lectures = rows.map((row) => ({
        title: row.TITLE,
        imageUrl: row.IMAGEURL,
        star: row.STAR,
      }));
      console.log(Lectures);
    }
  );
  db.query(
    "SELECT CATEGORY_NAME, PARENT_CATEGORY FROM CATEGORY ORDER BY CATEGORY_NAME ASC;",
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      var category = rows.map((row) => ({
        category_name: row.CATEGORY_NAME,
        parent_category: row.PARENT_CATEGORY,
      }));
      console.log(category);
    }
  );
  const resResult = {
    lecturesList: Lectures,
    categoryList: category,
  };
  res.json(resResult);
});

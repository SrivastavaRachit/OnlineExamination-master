import { Button, Card, CardContent, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app_config from "../config";

const ManagePaper = () => {
  const [paperList, setPaperList] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = app_config.api_url;

  const fetchPapers = () => {
    fetch(url + "/paper/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPaperList(data);
        setLoading(false);
      });
  };

  const displayPapers = () => {
    if (!loading) {
      return paperList.map((paper) => (
        <Card>
          <CardContent>
            <p>Course : {paper.course}</p>
            <p>Max Marks : {paper.max}</p>
            <Button
              variant="contained"
              onClick={() =>
                copyClip("http://localhost:3000/solve/" + paper._id)
              }
            >
              Copy Link
            </Button>
            <Link
              variant="contained"
              component={Button}
              to={"/solve/" + paper._id}
            >
              View
            </Link>
          </CardContent>
        </Card>
      ));
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const copyClip = (text) => {
    navigator.clipboard.writeText(text).then(function () {});
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <div>{displayPapers()}</div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ManagePaper;

import React, { useCallback, useState } from "react";
import { Container, Card, Alert, Badge, Row, Col } from "react-bootstrap";
import { getImageColors } from "./imaggaApi";

const ImageDropzone = () => {
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(async (event) => {
    event.preventDefault();
    setError(null);

    if (event.dataTransfer.files.length !== 1) {
      setError("Please drop only one image at a time.");
      return;
    }

    const file = event.dataTransfer.files[0];
    if (!file.type.startsWith("image/")) {
      setError("Please drop an image file.");
      return;
    }

    setPreview(URL.createObjectURL(file));

    try {
      const imageColors = await getImageColors(file);
      setColors(imageColors);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <Container>
      <Card className="mt-5 p-5" onDrop={onDrop} onDragOver={onDragOver}>
        <Card.Body>
          <Card.Title>Drop an image to get its colors</Card.Title>
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Uploaded"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            </div>
          )}
          {colors.length > 0 && (
            <div className="mt-3">
              {colors.map((color, index) => (
                <Row key={index} className="align-items-center mb-2">
                  <Col xs="auto">
                    <div
                      style={{
                        backgroundColor: color.color,
                        width: "30px",
                        height: "30px",
                        border: "1px solid #ccc"
                      }}
                    ></div>
                  </Col>
                  <Col>
                    <Badge pill>
                      {color.closest_palette_color} (
                      {color.closest_palette_color_parent}) -{" "}
                      {color.percent.toFixed(2)}%
                    </Badge>
                  </Col>
                </Row>
              ))}
            </div>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ImageDropzone;

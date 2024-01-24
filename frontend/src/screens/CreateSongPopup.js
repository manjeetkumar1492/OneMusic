import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import getError from "../utils";
import { Store } from "../Store";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false, error: action.payload };
    default:
      return state;
  }
};

const CreateSongPopup = ({ closePopup }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loadingCreate, error }, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    error: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    artist: "",
    audio: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "CREATE_REQUEST" });
    
      const { data } = await axios.post(
        // "http://localhost:5000/api/songs",
        "https://one-music-7snl.onrender.com/api/songs",
        {
          name: formData.name,
          slug: formData.slug,
          image: formData.image, 
          artist: formData.artist,
          audio: formData.audio,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      toast.success("Song created successfully");
      dispatch({ type: "CREATE_SUCCESS" });
    //   console.log(data);
      // navigate(`/admin/product/${data.product._id}`)
      // console.log("product created");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "CREATE_FAIL" });
    }
    // Handle form submission and data saving here
    // ...
    // Reset form data and close the popup
    setFormData({
      name: "",
      slug: "",
      image: "",
      artist: "",
      audio: ""
    });
    closePopup();
  };

  return (
    <>
      {loadingCreate ? (
        <div>
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Modal show={true} onHide={closePopup} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Create Song</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {/* Form fields */}
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Song name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="Song slug"
                />
              </Form.Group>
              {/* Add other form fields */}
              {/* Image upload */}
              <Form.Group>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Song image"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  placeholder="Song artist"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="audio"
                  value={formData.audio}
                  onChange={handleInputChange}
                  placeholder="Song audio"
                />
              </Form.Group>
             
             
              {/* Submit button */}
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default CreateSongPopup;

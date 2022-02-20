import React, { Component } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default class Languages extends Component {
  constructor() {
    super();
    this.state = {
      languages: [],
      selectedLanguage: [],
      isOpen: false,
    };
  }
  async componentDidMount() {
    const data = await axios(`https://www.dnd5eapi.co/api/languages/`);
    this.setState({ languages: data.data.results });
  }

  handleSelectedLanguage = async (e) => {
    const resp = await axios(
      `https://www.dnd5eapi.co/api/languages/${e.target.value}`
    );
    this.setState({ selectedLanguage: resp.data });
    this.openModal();
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="info">
        <h1>Languages</h1>
        {this.state.languages.map((item, i) => {
          return (
            <button
              key={i}
              className="btn3"
              value={item.index}
              style={{
                fontSize: "20px",
                cursor: "pointer",
                margin: "10px",
              }}
              onClick={this.handleSelectedLanguage}
            >
              {item.name}
            </button>
          );
        })}
        {
          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedLanguage.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{this.state.selectedLanguage.desc}</p>
              <p>Type: {this.state.selectedLanguage.type}</p>
              <p>Script: {this.state.selectedLanguage.script}</p>
              <p>
                Typical speakers: {this.state.selectedLanguage.typical_speakers}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        }
      </div>
    );
  }
}

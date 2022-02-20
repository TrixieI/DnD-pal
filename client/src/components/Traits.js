import React, { Component } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default class Traits extends Component {
  constructor() {
    super();
    this.state = {
      traitsList: [],
      selectedTrait: [],
      isOpen: false,
    };
  }
  async componentDidMount() {
    const data = await axios(`https://www.dnd5eapi.co/api/traits/`);
    this.setState({ traitsList: data.data.results });
  }

  handleSelectedTrait = async (e) => {
    const trait = await axios(
      `https://www.dnd5eapi.co/api/traits/${e.target.value}`
    );
    this.setState({ selectedTrait: trait.data });
    this.openModal();
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="info">
        <h1>Traits</h1>
        {this.state.traitsList.map((item, i) => {
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
              onClick={this.handleSelectedTrait}
            >
              {item.name}
            </button>
          );
        })}
        {
          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedTrait.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.selectedTrait.desc}</Modal.Body>
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

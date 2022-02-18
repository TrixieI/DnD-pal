import React, { Component } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default class Equipment extends Component {
  constructor() {
    super();
    this.state = {
      equipmentList: [],
      equipment: ``,
      text: "",
      selectedEquipment: [],
      isOpen: false,
    };
  }
  async componentDidMount() {
    const data = await axios(`https://www.dnd5eapi.co/api/equipment/`);
    this.setState({ equipmentList: data.data.results });
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSelectedEquipment = async (e) => {
    const equipment = await axios(
      `https://www.dnd5eapi.co/api/equipment/${e.target.value}`
    );
    this.setState({ selectedEquipment: equipment.data });
    this.openModal();
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="info">
        <div>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Search equipment"
          />
        </div>
        {this.state.equipmentList
          // eslint-disable-next-line array-callback-return
          .filter((val) => {
            if (this.state.text === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(this.state.text.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item, i) => {
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
                onClick={this.handleSelectedEquipment}
              >
                {item.name}
              </button>
            );
          })}
        {
          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedEquipment.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{this.state.selectedEquipment.desc}</p>
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

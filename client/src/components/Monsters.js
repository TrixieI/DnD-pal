import React, { Component } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default class Monsters extends Component {
  constructor() {
    super();
    this.state = {
      monstersList: [],
      selectedMonster: [],
      isOpen: false,
      text: "",
    };
  }
  async componentDidMount() {
    const data = await axios(`https://www.dnd5eapi.co/api/monsters/`);
    this.setState({ monstersList: data.data.results });
  }

  handleSelectedMonster = async (e) => {
    const data = await axios(
      `https://www.dnd5eapi.co/api/monsters/${e.target.value}`
    );
    this.setState({ selectedMonster: data.data });
    this.openModal();
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="info">
        <h1>Monsters</h1>
        <div>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Search monsters"
          />
        </div>
        {this.state.monstersList
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
                onClick={this.handleSelectedMonster}
              >
                {item.name}
              </button>
            );
          })}
        {
          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedMonster.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Hit points: {this.state.selectedMonster.hit_points}</p>
              <p>Alignment: {this.state.selectedMonster.alignment}</p>
              <p>Armor class: {this.state.selectedMonster.armor_class}</p>
              <p>Size: {this.state.selectedMonster.size}</p>
              <p>
                Challenge rating: {this.state.selectedMonster.challenge_rating}
              </p>
              <p>Hit dice: {this.state.selectedMonster.hit_dice}</p>
              <p>Type: {this.state.selectedMonster.type}</p>
              <p>Experience points: {this.state.selectedMonster.xp}</p>
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

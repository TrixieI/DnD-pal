import React, { Component } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default class Features extends Component {
  constructor() {
    super();
    this.state = {
      spellsList: [],
      spell: ``,
      selectedSpell: [],
      text: "",
      isOpen: false,
    };
  }
  async componentDidMount() {
    const data = await axios(`https://www.dnd5eapi.co/api/features`);
    this.setState({ spellsList: data.data.results });
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSelectedSpell = async (e) => {
    const spell = await axios(
      `https://www.dnd5eapi.co/api/features/${e.target.value}`
    );
    this.setState({ selectedSpell: spell.data });
    this.openModal();
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="info">
        <h1>Spells</h1>
        <div>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Search spells"
          />
        </div>
        {this.state.spellsList
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
                onClick={this.handleSelectedSpell}
              >
                {item.name}
              </button>
            );
          })}
        {
          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedSpell.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Casting time: {this.state.selectedSpell.casting_time}</p>
              <h4>Spell description:</h4>
              <p>{this.state.selectedSpell.desc}</p>
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

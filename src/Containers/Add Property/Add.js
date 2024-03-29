import React, { Component } from 'react'
import NavBar from '../../Components/Navbar';
import firebase from '../../Config/Fire'
import './Add.css'
import swal from 'sweetalert';

class Add extends Component {
    constructor() {
        super()
        this.state = {
            address: '',
            purpose: 'For Sale',
            detail: '',
            demand: '',
            title: '',
            arr: [1],
            images: [],
        }
    }

    add() {
        const { address, purpose, detail, demand, title, images } = this.state
        if (demand !== '') {
            let push = firebase.database().ref("allProperties/" + purpose).push().key
            let obj = {
                address,
                purpose,
                detail,
                demand,
                title,
                push,
                images
            }
            firebase.database().ref("allProperties/" + purpose + "/" + push).set(obj).then(()=>{
                swal({
                    title: "Good",
                    text: "Property Added Successfully",
                    icon: "success"
                }).then(() => window.location.reload())
            })
        }
    }

    more() {
        let arr = this.state.arr
        arr.push(Math.random(36))
        this.setState({ arr })
    }

    change(e) {
        let images = this.state.images
        let files = e.target.files[0]
        let storageRef = firebase.storage().ref().child(`userimages/${files.name}`)
        storageRef.put(files)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((snapUrl) => {
                    images.push(snapUrl)
                    this.setState({ images })
                })
            })
    }

    render() {
        return (
            <div>
                <NavBar func="Log Out" hidden={true} active1="" active="active" />
                <div className="lates">
                    <h1>Add Property</h1>
                    <div className="options-menu">
                        <input type="text" placeholder="Address" onChange={(e) => this.setState({ address: e.target.value })} />
                        <label>Enter Address</label>
                        <br />
                        {this.state.arr.map(() => {
                            return <input type="file" style={{ padding: 5 }} onChange={this.change.bind(this)} />
                        })}
                        <label>Input Image</label>
                        <button style={{ marginTop: "3px", float: "right" }} onClick={this.more.bind(this)}>Add more</button>
                        <br />
                        <select onChange={(e) => this.setState({ purpose: e.target.value })} >
                            <option>For Sale</option>
                            <option>Rent</option>
                            <option>Investment</option>
                        </select>
                        <label>Purpose</label>
                        <br />
                        <input type="text" placeholder="Title" onChange={(e) => this.setState({ title: e.target.value })} />
                        <label>Title for the property</label>
                        <br />
                        <textarea type="text" placeholder="Detail" onChange={(e) => this.setState({ detail: e.target.value })} />
                        <label>Detail for the property</label>
                        <br />
                        <input type="number" placeholder="Demand" onChange={(e) => this.setState({ demand: e.target.value })} />
                        <label>Enter Demand</label>
                        <br />
                        <button className="btn-submit" onClick={this.add.bind(this)}>Add</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default Add

import React, { Component } from 'react'
import NavBar from '../../Components/Navbar';
import firebase from '../../Config/Fire'
import swal from 'sweetalert';
import './Delete.css'

class Delete extends Component {
    constructor() {
        super()
        this.state = {
            allData: [],
            condit: false,
            active: "active",
            active1: "",
            selected: "For Sale"
        }
    }

    componentDidMount() {
        this.setState({ allData: [], active: "active", active1: "", condit: true })
        firebase.database().ref("allProperties/For Sale").on("child_added", (data) => {
            let allData = this.state.allData
            let arr = []
            arr.push(data.val())
            allData.push(arr)
            this.setState({ allData, condit: false, selected: "For Sale" })
        })
    }

    sale() {
        this.setState({ allData: [], active: "active", active1: "", active2: "", condit: true })
        setTimeout(() => {
            firebase.database().ref("allProperties/For Sale").on("child_added", (data) => {
                let allData = this.state.allData
                let arr = []
                arr.push(data.val())
                allData.push(arr)
                this.setState({ allData, condit: false, selected: "For Sale" })
            })
        }, 3000);
    }

    rent() {
        this.setState({ allData: [], active: "", active1: "active", active2: "", condit: true })
        setTimeout(() => {
            firebase.database().ref("allProperties/Rent").on("child_added", (data) => {
                let allData = this.state.allData
                let arr = []
                arr.push(data.val())
                allData.push(arr)
                this.setState({ allData, condit: false, selected: "Rent" })
            })
        }, 3000);
    }

    investment() {
        this.setState({ allData: [], active: "", active1: "", active2: "active", condit: true })
        setTimeout(() => {
            firebase.database().ref("allProperties/Investment").on("child_added", (data) => {
                let allData = this.state.allData
                let arr = []
                arr.push(data.val())
                allData.push(arr)
                this.setState({ allData, condit: false, selected: "Investment" })
            })
        }, 3000);
    }

    delete(e) {
        firebase.database().ref("allProperties/" + this.state.selected + "/" + e).remove().then(() => {
            swal({
                title: "Good",
                text: "Property Deleted Successfully",
                icon: "warning"
            }).then(() => window.location.reload())
        })
    }

    render() {
        return (
            <div>
                <NavBar func="Log Out" hidden={true} active1="active" active="" />
                <div className="delete">
                    <h1>Delete Property</h1>
                    <ul className="nav nav-tabs">
                        <li className={this.state.active} onClick={this.sale.bind(this)}><a href="Javascript:void(0)">Sale</a></li>
                        <li className={this.state.active1} onClick={this.rent.bind(this)}><a href="Javascript:void(0)">Rent</a></li>
                        <li className={this.state.active2} onClick={this.investment.bind(this)}><a href="Javascript:void(0)">Investment</a></li>
                    </ul>
                    {!!this.state.condit && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                    <div className="main" >
                        {!!this.state.allData.length && this.state.allData.map((e) => {
                            return e.map((f) => {
                                return <div className="card" key={Math.random()}>
                                    <h3><b>{f.title}</b></h3>
                                    <p style={{ marginLeft: "10px" }}>{f.address}</p>
                                    <div id={f.push} className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="item active">
                                                <img src={f.images[0]} alt="Images" style={{ width: "100%" }} />
                                            </div>
                                            {f.images.map((e, i) => {
                                                return i !== 0 && <div className="item" key={Math.random(36)}>
                                                    <img src={e} alt="Images" style={{ width: "100%" }} />
                                                </div>
                                            })}
                                        </div>
                                        {f.images.length > 1 && <>
                                            <a className="left carousel-control" href={"#" + f.push} data-slide="prev">
                                                <span className="glyphicon glyphicon-chevron-left"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="right carousel-control" href={"#" + f.push} data-slide="next">
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </>}
                                    </div>
                                    <p className="price">PKR <b style={{ fontSize: "25px" }}>{f.demand}</b></p>
                                    <hr />
                                    <h4>Details & Description</h4>
                                    <p style={{ whiteSpace: "pre-line", marginLeft: "10px" }}>{f.detail}</p>
                                    <p><button onClick={this.delete.bind(this, f.push)}>Delete</button></p>
                                </div>
                            })
                        })}
                    </div>
                </div>
            </div >
        )
    }
}

export default Delete

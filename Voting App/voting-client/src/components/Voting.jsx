/**
 * Created by Owner on 1/13/2017.
 */
import React from "react";
import Winner from "./Winner";
import Vote from "./Vote";

export default class Voting extends React.Component {

    render(){
        return (
            <div>
                {this.props.winner ? <Winner winner={this.props.winner} ref="winner"/> : <Vote {...this.props}/>}
            </div>
        )
    }
}

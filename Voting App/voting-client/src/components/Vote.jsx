import React from "react";

export default class Vote extends React.Component{

    getPair(){
        return this.props.pair || [];
    }

    isDisabled(){
        return !!this.props.hasVoted;
    }

    hasVotedFor(entry){
        return entry === this.props.hasVoted;
    }

    render(){
        return (
            <div className="voting">
                {this.getPair().map((entry)=>{
                    return (
                        <button key={entry}
                                disabled={this.isDisabled()}
                                onClick={()=>this.props.vote(entry)}>
                            <h1>{entry}</h1>
                            {this.hasVotedFor ? <div className="label"> Voted</div>:null}
                        </button>
                    )
                })}
            </div>
        )
    }
}

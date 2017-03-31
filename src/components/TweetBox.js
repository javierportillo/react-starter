import React from 'react';

export default class TweetBox extends React.Component {
    constructor() {
        super();

        this.state = {
            MAX_TWEET_LEN: 140,
            COST_OF_PHOTO: 23,
            tweetText: '',
            disableBtn: true,
            remainingChars: 140,
            picAdded: false
        };
    }

    remainingChars(state) {
        const tweetLen = state.tweetText.length;
        const picCost = state.picAdded ? state.COST_OF_PHOTO : 0;
        return {
            ...state,
            remainingChars: state.MAX_TWEET_LEN - picCost - tweetLen
        };
    }

    disableBtn(state) {
        return {
            ...state,
            disableBtn: state.remainingChars < 0 ||
            state.remainingChars >= state.MAX_TWEET_LEN
        };
    }

    newState(withNewData = {}) {
        return this.disableBtn(this.remainingChars({
            ...this.state,
            ...withNewData
        }));
    }

    onTweetBoxChange(event) {
        const tweetText = event.target.value;
        this.setState(this.newState({tweetText}));
    }

    togglePhoto() {
        const picAdded = !this.state.picAdded;
        this.setState(this.newState({picAdded}));
    }

    overflowAlert() {
        if (this.state.remainingChars >= 0) return '';

        const tweetText = this.state.tweetText;
        const MAX_LEN = this.state.MAX_TWEET_LEN;
        const picCost = this.state.picAdded ? this.state.COST_OF_PHOTO : 0;

        const beforeOverflow =
            tweetText.substring(MAX_LEN - 10 - picCost, MAX_LEN - picCost);
        const overflowText =
            tweetText.substring(MAX_LEN - picCost);

        return (
            <div className="alert alert-warning">
                <strong>Oops! Too Long:</strong>
                <span> ...{beforeOverflow}</span>
                <strong className="bg-danger">{overflowText}</strong>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-2">
                        <div className="well clearfix">
                            {this.overflowAlert()}
                            <textarea
                                className="form-control"
                                onChange={this.onTweetBoxChange.bind(this)}>
                            </textarea>
                            <br/>
                            <span>{this.state.remainingChars}</span>
                            <button
                                className="btn btn-primary pull-right"
                                disabled={this.state.disableBtn}>
                                Tweet
                            </button>
                            <button
                                style={{marginRight: '10px'}}
                                className="btn btn-default pull-right"
                                onClick={this.togglePhoto.bind(this)}>
                                {this.state.picAdded ? '✓ Photo Added' : 'Add Photo'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

const MAX_TWEET_LEN = 140;
const COST_OF_PHOTO = 23;

class TweetBox extends React.Component {
    constructor() {
        super();

        this.state = {
            tweetText: '',
            disableBtn: true,
            remainingChars: MAX_TWEET_LEN,
            picAdded: false
        };
    }

    remainingChars(isPicAdded, tweetLen) {
        if (!isPicAdded) return MAX_TWEET_LEN - tweetLen;

        return MAX_TWEET_LEN - COST_OF_PHOTO - tweetLen;
    }

    disableBtn(remainingChars) {
        return remainingChars < 1 || remainingChars >= MAX_TWEET_LEN;
    }

    onTweetBoxChange(event) {
        const tweetText = event.target.value;
        const remainingChars = this.remainingChars(
            this.state.picAdded,
            tweetText.length
        );

        this.setState({
            tweetText: tweetText,
            disableBtn: this.disableBtn(remainingChars),
            remainingChars: remainingChars
        });
    }

    togglePhoto() {
        const picAdded = !this.state.picAdded
        const remainingChars = this.remainingChars(
            picAdded,
            this.state.tweetText.length
        )

        this.setState({
            picAdded: picAdded,
            disableBtn: this.disableBtn(remainingChars),
            remainingChars: remainingChars
        });
    }

    overflowAlert() {
        const isPicAdded = this.state.picAdded;
        const tweetText = this.state.tweetText
        const tweetLength = tweetText.length;

        if (this.remainingChars(isPicAdded, tweetLength) >= 0)
            return '';

        let beforeOverflow = tweetText.substring(
            MAX_TWEET_LEN - 10,
            MAX_TWEET_LEN
        );

        let overflowText = tweetText.substring(MAX_TWEET_LEN);

        if (isPicAdded) {
            beforeOverflow = tweetText.substring(
                MAX_TWEET_LEN - 10 - COST_OF_PHOTO,
                MAX_TWEET_LEN - COST_OF_PHOTO
            );
            overflowText = tweetText.substring(MAX_TWEET_LEN - COST_OF_PHOTO);
        }

        return (
            <div className="alert alert-warning">
                <strong>Oops!  Too Long:</strong>
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
                                onChange={this.onTweetBoxChange.bind(this)}/>
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
                                {
                                    this.state.picAdded ?
                                        '✓ Photo Added' :
                                        'Add Photo'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<TweetBox />, document.getElementById('app'));

import React from 'react';
import "./ProgressBar.css";

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({progress: this.props.progress});
    };

    componentDidMount() {
        this.setState({progress: this.props.progress});
    }

    render() {
        let topProgressLine = parseInt(this.state.progress / 10 , 10);
        if (topProgressLine >= 10) topProgressLine = 10;
        for (let i = 0; i < topProgressLine; i++) {
            document.getElementById('line' + i).style.backgroundColor = '#4847F1';
        }
        return (
            <div className='progress-bar-container'>
                <div className='line9 progress-bar-line' id='line9'/>
                <div className='line8 progress-bar-line' id='line8'/>
                <div className='line7 progress-bar-line' id='line7'/>
                <div className='line6 progress-bar-line' id='line6'/>
                <div className='line5 progress-bar-line' id='line5'/>
                <div className='line4 progress-bar-line' id='line4'/>
                <div className='line3 progress-bar-line' id='line3'/>
                <div className='line2 progress-bar-line' id='line2'/>
                <div className='line1 progress-bar-line' id='line1'/>
                <div className='line0 progress-bar-line' id='line0'/>
            </div>
        );
    };
}


export default ProgressBar;

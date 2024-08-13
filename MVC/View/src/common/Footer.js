import { Component } from "react";
import './Footer.css';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footerText: ''
        };
    }

    componentDidMount() {
        const isLoggedIn = 0; 

        fetch('http://localhost:3001/getHeaderFooter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isLoggedIn })
        })
            .then(response => response.json())
            .then(data => {
                const parsedContent = JSON.parse(data.content);
                this.setState({ footerText: parsedContent.footer.text });
            })
            .catch(error => console.error('Error fetching footer data:', error));
    }

    render() {
        return (
            <p id="footerText">{this.state.footerText}</p>
        );
    }
}

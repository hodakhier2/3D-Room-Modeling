import { Component } from "react";
import '../style/ContactUs.css';

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      inputs: [],
      error: null
    };
  }

  componentDidMount() {
    const formId = 3; 
    console.log('Fetching form data...');

    fetch(`http://localhost:3001/forms/${formId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for inputs');
        }
        return response.json();
      })
      .then(data => {
        data.formContent = JSON.parse(data.formContent);
        this.setState({ page: data, inputs: data.inputs });
      })
      .catch(error => {
        this.setState({ error });
        console.error('There was a problem with the fetch operations:', error);
      });
  }

  render() { 
    const { page, inputs, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!page || inputs.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div id="contentCU">
        <p className="titleCU">{page.formContent.titleCU}</p>
        <div id="containerCU">
          <form id="formCU">
            {inputs.map((item) => (
              <input key={item.inputId} className={item.className} type={item.type} name={item.name} placeholder={item.placeholder} value={item.value} />
            ))}
            <p id="text2CU">{page.formContent.text2CU}</p>
            <textarea id="descriptionCU"></textarea>          
          </form>
        </div>
        <button id="sendButton">{page.formContent.sendText}</button>
      </div>
    );
  }
}
